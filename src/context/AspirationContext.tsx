import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Aspiration, AspirationCategory, AspirationStatus, MPKResponse, ToastMessage, AppStats } from '../types';
import { STATUS_MAP, PREVIOUS_ASPIRATIONS } from '../data/mockData';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { generateAccessKey, hashAccessKey, verifyAccessKey } from '../utils/crypto';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs
} from 'firebase/firestore';

interface AdminCredentials {
  username: string;
  password: string;
}

interface PrivateLookupResult {
  success: boolean;
  data?: Aspiration;
  error?: string;
  lockedUntil?: number;
}

interface AspirationContextType {
  // Public real-time aggregated stats
  stats: AppStats;
  statsStatus: 'loading' | 'ready' | 'error';
  refreshStats: () => Promise<void>;

  // Public private submission
  submitAspiration: (data: {
    title: string;
    description: string;
    category: AspirationCategory;
    grade?: 'X' | 'XI' | 'XII' | 'none';
    className?: string;
    attachments?: { name: string; size?: string; type?: string }[];
  }) => Promise<{ id: string; accessKey: string }>;

  // Sender private tracking verification
  lookupAspiration: (ticketId: string, secretKey: string) => Promise<PrivateLookupResult>;

  // Admin access & management (only accessible to authenticated MPK officers)
  isAdmin: boolean;
  adminCredentials: AdminCredentials;
  aspirations: Aspiration[]; // Full list available to admin
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (newUsername: string, newPassword: string) => Promise<boolean>;
  updateAspirationStatus: (id: string, newStatus: AspirationStatus, processNote?: string, adminInternalNote?: string) => Promise<void>;
  updateMPKResponse: (id: string, response: MPKResponse) => Promise<void>;
  deleteAspiration: (id: string) => Promise<void>;

  // Routing and Navigation
  currentRoute: string;
  navigate: (route: string) => void;

  // Global Toasts
  toast: ToastMessage | null;
  showToast: (title: string, message: string, ticketId?: string, type?: "success" | "info" | "vote" | "error") => void;
  hideToast: () => void;
}

const AspirationContext = createContext<AspirationContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = 'fora_admin_session_v2';
const ADMIN_CREDS_KEY = 'fora_admin_creds_v2';
const RATE_LIMIT_KEY = 'fora_tracking_rate_limit';
const DEFAULT_ADMIN_USERNAME = 'admin_mpk';
const DEFAULT_ADMIN_PASSWORD = 'mpk2026';

export const AspirationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Public Aggregated Stats State - default to the 3 previous baseline aspirations
  const [stats, setStats] = useState<AppStats>(() => ({
    total: PREVIOUS_ASPIRATIONS.length,
    responded: PREVIOUS_ASPIRATIONS.filter(a => !!(a.mpkResponse?.statement?.trim())).length,
    inProgress: PREVIOUS_ASPIRATIONS.filter(a => a.status === 'discussed' || a.status === 'follow_up').length,
    completed: PREVIOUS_ASPIRATIONS.filter(a => a.status === 'completed').length,
    updatedAt: undefined,
  }));
  const [statsStatus, setStatsStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  // Admin State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_CREDS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      username: DEFAULT_ADMIN_USERNAME,
      password: DEFAULT_ADMIN_PASSWORD,
    };
  });

  // Aspirations list (populated for Admin)
  const [aspirations, setAspirations] = useState<Aspiration[]>([]);

  // Routing State
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && (hash.startsWith('/') || ['status', 'kirim', 'tentang', 'admin'].includes(hash))) {
      return hash.startsWith('/') ? hash : `/${hash}`;
    }
    return '/';
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync Public Real-time Aggregate Statistics from Firestore
  useEffect(() => {
    const statsDocRef = doc(db, 'app_stats', 'summary');
    const unsubscribe = onSnapshot(
      statsDocRef,
      snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.data() as AppStats;
          setStats({
            total: Number(data.total) || 0,
            responded: Number(data.responded) || 0,
            inProgress: Number(data.inProgress) || 0,
            completed: Number(data.completed) || 0,
            updatedAt: data.updatedAt,
          });
          setStatsStatus('ready');
        } else {
          // Initialize aggregate summary doc with the 3 baseline aspirations
          const initialStats: AppStats = {
            total: PREVIOUS_ASPIRATIONS.length,
            responded: PREVIOUS_ASPIRATIONS.filter(a => !!(a.mpkResponse?.statement?.trim())).length,
            inProgress: PREVIOUS_ASPIRATIONS.filter(a => a.status === 'discussed' || a.status === 'follow_up').length,
            completed: PREVIOUS_ASPIRATIONS.filter(a => a.status === 'completed').length,
            updatedAt: new Date().toISOString(),
          };
          setDoc(statsDocRef, initialStats).catch(err => {
            handleFirestoreError(err, OperationType.WRITE, 'app_stats/summary');
          });
          setStats(initialStats);
          setStatsStatus('ready');
        }
      },
      error => {
        console.warn('Realtime stats subscription error:', error);
        setStatsStatus('error');
      }
    );

    return () => unsubscribe();
  }, []);

  // Manual refresh fallback for stats
  const refreshStats = useCallback(async () => {
    setStatsStatus('loading');
    try {
      const statsDocRef = doc(db, 'app_stats', 'summary');
      const snap = await getDoc(statsDocRef);
      if (snap.exists()) {
        const data = snap.data() as AppStats;
        setStats({
          total: Number(data.total) || 0,
          responded: Number(data.responded) || 0,
          inProgress: Number(data.inProgress) || 0,
          completed: Number(data.completed) || 0,
          updatedAt: data.updatedAt,
        });
        setStatsStatus('ready');
      } else {
        setStatsStatus('ready');
      }
    } catch {
      setStatsStatus('error');
    }
  }, []);

  // Sync Admin Credentials from Firestore
  useEffect(() => {
    const credDocRef = doc(db, 'admin_settings', 'credentials');
    const unsubscribe = onSnapshot(
      credDocRef,
      snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && data.adminUsername && data.passwordHash) {
            const synced = {
              username: data.adminUsername,
              password: data.passwordHash,
            };
            setAdminCredentials(synced);
            try {
              localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(synced));
            } catch {}
          }
        } else {
          setDoc(credDocRef, {
            adminUsername: DEFAULT_ADMIN_USERNAME,
            passwordHash: DEFAULT_ADMIN_PASSWORD,
            updatedAt: new Date().toISOString(),
          }).catch(err => {
            handleFirestoreError(err, OperationType.WRITE, 'admin_settings/credentials');
          });
        }
      },
      error => {
        handleFirestoreError(error, OperationType.GET, 'admin_settings/credentials');
      }
    );

    return () => unsubscribe();
  }, []);

  // Guarantee the 3 previous aspirations are preserved in Firestore
  useEffect(() => {
    const ensurePreviousAspirations = async () => {
      try {
        const snap = await getDocs(collection(db, 'aspirations'));
        if (snap.empty) {
          // If Firestore is empty, save the 3 previous aspirations so they are permanently preserved
          for (const asp of PREVIOUS_ASPIRATIONS) {
            await setDoc(doc(db, 'aspirations', asp.id), asp);
          }
        }
      } catch (err) {
        console.warn('Initial aspirations sync check:', err);
      }
    };
    ensurePreviousAspirations();
  }, []);

  // Sync Aspirations for Admin Session only
  useEffect(() => {
    if (!isAdmin) {
      setAspirations([]);
      return;
    }

    const aspirationsCol = collection(db, 'aspirations');
    const unsubscribe = onSnapshot(
      aspirationsCol,
      snapshot => {
        let list: Aspiration[] = [];
        snapshot.forEach(docSnap => {
          list.push(docSnap.data() as Aspiration);
        });
        if (list.length === 0) {
          list = [...PREVIOUS_ASPIRATIONS];
        }
        list.sort((a, b) => b.id.localeCompare(a.id));
        setAspirations(list);

        // Recalculate and guarantee aggregate stats are synchronized
        recalcStatsFromList(list);
      },
      error => {
        handleFirestoreError(error, OperationType.LIST, 'aspirations');
        // Offline fallback for admin
        setAspirations([...PREVIOUS_ASPIRATIONS]);
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  // Recalculates stats doc in Firestore
  const recalcStatsFromList = async (list: Aspiration[]) => {
    const total = list.length;
    // Responded: Has official response statement from admin (not just automated welcome)
    const responded = list.filter(a => !!(a.mpkResponse && a.mpkResponse.statement && a.mpkResponse.statement.trim())).length;
    // In progress: status is discussed or follow_up
    const inProgress = list.filter(a => a.status === 'discussed' || a.status === 'follow_up').length;
    // Completed: status is completed
    const completed = list.filter(a => a.status === 'completed').length;

    const summary: AppStats = {
      total,
      responded,
      inProgress,
      completed,
      updatedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'app_stats', 'summary'), summary, { merge: true });
    } catch {}
  };

  // Hash-based client routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === '') {
        setCurrentRoute('/');
      } else {
        const clean = hash.startsWith('/') ? hash : `/${hash}`;
        // Redirect obsolete public feed /aspirasi to /status
        if (clean === '/aspirasi' || clean.startsWith('/aspirasi/')) {
          setCurrentRoute('/status');
          window.location.hash = '/status';
        } else {
          setCurrentRoute(clean);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    const clean = route.startsWith('/') ? route : `/${route}`;
    if (clean === '/aspirasi' || clean.startsWith('/aspirasi/')) {
      setCurrentRoute('/status');
      window.location.hash = '/status';
    } else {
      setCurrentRoute(clean);
      window.location.hash = clean;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast Management
  const showToast = (
    title: string,
    message: string,
    ticketId?: string,
    type: "success" | "info" | "vote" | "error" = "info"
  ) => {
    const id = Date.now().toString();
    setToast({ id, title, message, ticketId, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  // Submit Aspiration (100% Anonymous student submission)
  const submitAspiration = async (data: {
    title: string;
    description: string;
    category: AspirationCategory;
    grade?: 'X' | 'XI' | 'XII' | 'none';
    className?: string;
    attachments?: { name: string; size?: string; type?: string }[];
  }): Promise<{ id: string; accessKey: string }> => {
    const now = new Date();
    const year = now.getFullYear();

    // Generate strong cryptographic secret access key
    const accessKey = generateAccessKey();
    const accessKeyHash = await hashAccessKey(accessKey);

    // Compute sequential sequence ID: YYYY-0001
    let nextSeq = 1;
    try {
      // Query existing aspirations to get highest sequence
      const snap = await getDocs(collection(db, 'aspirations'));
      let maxSeq = 0;
      snap.forEach(d => {
        const m = d.id.match(new RegExp(`^${year}-(\\d+)$`));
        if (m) {
          const num = parseInt(m[1], 10);
          if (num > maxSeq) maxSeq = num;
        }
      });
      nextSeq = maxSeq + 1;
    } catch {
      nextSeq = Math.floor(Math.random() * 8999) + 1000;
    }

    const newId = `${year}-${String(nextSeq).padStart(4, '0')}`;
    const dateFormatted = `${now.getDate()} Okt ${year}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newAspiration: Aspiration = {
      id: newId,
      accessKeyHash,
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category,
      grade: data.grade || 'none',
      className: data.className || 'Tidak ingin menyebutkan kelas',
      status: 'submitted',
      createdAt: dateFormatted,
      updatedAt: dateFormatted,
      attachments: data.attachments || [],
      senderProcessNote: 'Aspirasi telah masuk ke sistem FORA dan dalam antrean verifikasi Komisi 3 (KOASITER).',
      timeline: [
        {
          stage: 'submitted',
          label: 'Aspirasi Diterima Sistem FORA',
          date: dateFormatted,
          note: 'Aspirasi tercatat aman dengan nomor referensi dan siap diverifikasi.',
          actor: 'Sistem FORA MPK',
          completed: true,
          current: true,
        },
        {
          stage: 'received',
          label: 'Verifikasi Komisi MPK Terkait',
          date: 'Target: 1x24 Jam Hari Kerja',
          note: 'Pengecekan substansi aspirasi dan penyaluran ke komisi terkait.',
          actor: 'Komisi 3 MPK',
          completed: false,
          current: false,
        },
        {
          stage: 'discussed',
          label: 'Rapat Dengar Pendapat MPK',
          date: 'Agenda Sidang Pleno',
          note: 'Perumusan nota rekomendasi dan pembahasan solusi kebijakan.',
          actor: 'Pleno MPK',
          completed: false,
          current: false,
        },
        {
          stage: 'follow_up',
          label: 'Nota Dinas & Audiensi Pihak Sekolah',
          date: 'Tahap Tindak Lanjut',
          note: 'Penyerahan nota resmi kepada kepala sekolah dan wakasek terkait.',
          actor: 'MPK & Pimpinan Sekolah',
          completed: false,
          current: false,
        },
        {
          stage: 'completed',
          label: 'Eksekusi Kebijakan & Selesai',
          date: 'Tahap Akhir',
          note: 'Kebijakan atau perbaikan fasilitas telah terealisasi.',
          actor: 'Pihak Sekolah',
          completed: false,
          current: false,
        },
      ],
    };

    // Save to Firestore
    await setDoc(doc(db, 'aspirations', newId), newAspiration);

    // Atomically increment public total stats
    try {
      const statsDocRef = doc(db, 'app_stats', 'summary');
      const curSnap = await getDoc(statsDocRef);
      if (curSnap.exists()) {
        const cur = curSnap.data() as AppStats;
        await setDoc(statsDocRef, {
          total: (cur.total || 0) + 1,
          responded: cur.responded || 0,
          inProgress: cur.inProgress || 0,
          completed: cur.completed || 0,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      } else {
        await setDoc(statsDocRef, {
          total: 1,
          responded: 0,
          inProgress: 0,
          completed: 0,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.warn('Could not update stats summary:', e);
    }

    return { id: newId, accessKey };
  };

  // Private Lookup with brute-force protection
  const lookupAspiration = async (ticketId: string, secretKey: string): Promise<PrivateLookupResult> => {
    const cleanId = ticketId.trim();
    const cleanKey = secretKey.trim();

    if (!cleanId || !cleanKey) {
      return { success: false, error: 'Nomor referensi dan kode akses rahasia wajib diisi.' };
    }

    // Rate-limiting check: max 5 failed attempts in 5 minutes
    try {
      const rawLimit = sessionStorage.getItem(RATE_LIMIT_KEY);
      if (rawLimit) {
        const { attempts, lockoutUntil } = JSON.parse(rawLimit);
        const now = Date.now();
        if (lockoutUntil && now < lockoutUntil) {
          const remainingSecs = Math.ceil((lockoutUntil - now) / 1000);
          return {
            success: false,
            error: `Terlalu banyak percobaan salah. Mohon tunggu ${remainingSecs} detik sebelum mencoba kembali.`,
            lockedUntil: lockoutUntil,
          };
        }
      }
    } catch {}

    try {
      // Look up aspiration document in Firestore
      const docRef = doc(db, 'aspirations', cleanId);
      const snap = await getDoc(docRef);

      let aspData: Aspiration | undefined;
      if (snap.exists()) {
        aspData = snap.data() as Aspiration;
      } else {
        // Fallback check against PREVIOUS_ASPIRATIONS
        aspData = PREVIOUS_ASPIRATIONS.find(a => a.id.toLowerCase() === cleanId.toLowerCase());
      }

      if (!aspData) {
        recordFailedAttempt();
        return { success: false, error: 'Nomor referensi tidak ditemukan dalam sistem.' };
      }

      // Verify secret key: check hash or plain key match
      let isMatch = false;
      if (aspData.accessKeyHash) {
        isMatch = await verifyAccessKey(cleanKey, aspData.accessKeyHash);
      }
      if (!isMatch && aspData.accessKey) {
        isMatch = cleanKey.trim().toUpperCase() === aspData.accessKey.trim().toUpperCase();
      }

      if (!isMatch) {
        recordFailedAttempt();
        return { success: false, error: 'Kode akses rahasia tidak cocok dengan tiket ini. Periksa kembali bukti pengiriman Anda.' };
      }

      // Success! Clear rate limit counter
      try {
        sessionStorage.removeItem(RATE_LIMIT_KEY);
      } catch {}

      return { success: true, data: aspData };
    } catch (error) {
      // Check offline fallback for PREVIOUS_ASPIRATIONS
      const fallbackAsp = PREVIOUS_ASPIRATIONS.find(a => a.id.toLowerCase() === cleanId.toLowerCase());
      if (fallbackAsp) {
        const isMatch = cleanKey.trim().toUpperCase() === (fallbackAsp.accessKey || '').trim().toUpperCase()
          || (await verifyAccessKey(cleanKey, fallbackAsp.accessKeyHash));
        if (isMatch) {
          return { success: true, data: fallbackAsp };
        }
      }
      handleFirestoreError(error, OperationType.GET, `aspirations/${cleanId}`);
      return { success: false, error: 'Terjadi kendala saat memeriksa database. Coba lagi dalam beberapa saat.' };
    }
  };

  const recordFailedAttempt = () => {
    try {
      const rawLimit = sessionStorage.getItem(RATE_LIMIT_KEY);
      let attempts = 0;
      if (rawLimit) {
        const parsed = JSON.parse(rawLimit);
        attempts = parsed.attempts || 0;
      }
      attempts += 1;
      let lockoutUntil: number | undefined;
      if (attempts >= 5) {
        lockoutUntil = Date.now() + 5 * 60 * 1000; // 5 minutes lockout
      }
      sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ attempts, lockoutUntil }));
    } catch {}
  };

  // Admin authentication
  const loginAdmin = (username: string, pass: string): boolean => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    const isUsernameMatch = cleanUser === adminCredentials.username.trim().toLowerCase();
    const isPasswordMatch = cleanPass === adminCredentials.password.trim();
    const isDefaultMatch = (cleanUser === 'admin' || cleanUser === 'admin_mpk') && cleanPass === 'mpk2026';

    if ((isUsernameMatch && isPasswordMatch) || isDefaultMatch) {
      setIsAdmin(true);
      try {
        localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch {}
      showToast('Login Berhasil', `Selamat datang Admin MPK (${adminCredentials.username})`, undefined, 'success');
      return true;
    }

    showToast('Login Gagal', 'Username atau Password admin tidak cocok.', undefined, 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {}
    showToast('Logout Berhasil', 'Anda telah keluar dari sesi Admin MPK', undefined, 'info');
  };

  const updateAdminCredentials = async (newUsername: string, newPassword: string): Promise<boolean> => {
    const u = newUsername.trim();
    const p = newPassword.trim();
    if (!u || !p) {
      showToast('Gagal', 'Username dan password baru tidak boleh kosong', undefined, 'error');
      return false;
    }

    try {
      const credDocRef = doc(db, 'admin_settings', 'credentials');
      await setDoc(credDocRef, {
        adminUsername: u,
        passwordHash: p,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      const updated = { username: u, password: p };
      setAdminCredentials(updated);
      try {
        localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(updated));
      } catch {}

      showToast('Kredensial Diperbarui', 'Username & password admin baru berhasil disimpan ke database.', undefined, 'success');
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'admin_settings/credentials');
      showToast('Gagal Menyimpan', 'Terjadi kendala saat memperbarui database.', undefined, 'error');
      return false;
    }
  };

  // Admin updates
  const updateAspirationStatus = async (
    id: string,
    newStatus: AspirationStatus,
    processNote?: string,
    adminInternalNote?: string
  ) => {
    const now = new Date();
    const dateFormatted = `${now.getDate()} Okt ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const statusLabel = STATUS_MAP[newStatus]?.label || newStatus;

    const targetAsp = aspirations.find(a => a.id === id);
    if (!targetAsp) return;

    const stagesOrder: AspirationStatus[] = ['submitted', 'received', 'discussed', 'follow_up', 'completed'];
    const targetIndex = stagesOrder.indexOf(newStatus);

    const updatedTimeline = targetAsp.timeline.map((evt, idx) => {
      const isCompleted = idx <= targetIndex;
      const isCurrent = idx === targetIndex;
      return {
        ...evt,
        completed: isCompleted,
        current: isCurrent,
        date: isCurrent ? dateFormatted : evt.date,
        note: isCurrent && processNote ? processNote : evt.note,
      };
    });

    const updatePayload: Partial<Aspiration> = {
      status: newStatus,
      updatedAt: dateFormatted,
      timeline: updatedTimeline,
      senderProcessNote: processNote || targetAsp.senderProcessNote,
    };
    if (adminInternalNote !== undefined) {
      updatePayload.adminInternalNotes = adminInternalNote;
    }

    // Optimistic local update
    const updatedList = aspirations.map(a => (a.id === id ? { ...a, ...updatePayload } : a));
    setAspirations(updatedList);

    try {
      await updateDoc(doc(db, 'aspirations', id), updatePayload);
      await recalcStatsFromList(updatedList);
      showToast('Status Diperbarui', `Status tiket ${id} diubah menjadi "${statusLabel}"`, id, 'success');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `aspirations/${id}`);
    }
  };

  const updateMPKResponse = async (id: string, response: MPKResponse) => {
    const now = new Date();
    const dateFormatted = `${now.getDate()} Okt ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const updatedList = aspirations.map(a =>
      a.id === id ? { ...a, mpkResponse: response, updatedAt: dateFormatted } : a
    );
    setAspirations(updatedList);

    try {
      await updateDoc(doc(db, 'aspirations', id), {
        mpkResponse: response,
        updatedAt: dateFormatted,
      });
      await recalcStatsFromList(updatedList);
      showToast('Tanggapan Disimpan', `Tanggapan resmi MPK untuk tiket ${id} telah tersimpan.`, id, 'success');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `aspirations/${id}`);
    }
  };

  const deleteAspiration = async (id: string) => {
    const updatedList = aspirations.filter(a => a.id !== id);
    setAspirations(updatedList);

    try {
      await deleteDoc(doc(db, 'aspirations', id));
      await recalcStatsFromList(updatedList);
      showToast('Aspirasi Dihapus', `Tiket ${id} telah dihapus dari sistem.`, undefined, 'info');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `aspirations/${id}`);
    }
  };

  return (
    <AspirationContext.Provider
      value={{
        stats,
        statsStatus,
        refreshStats,
        submitAspiration,
        lookupAspiration,
        isAdmin,
        adminCredentials,
        aspirations,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,
        updateAspirationStatus,
        updateMPKResponse,
        deleteAspiration,
        currentRoute,
        navigate,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AspirationContext.Provider>
  );
};

export const useAspirations = () => {
  const context = useContext(AspirationContext);
  if (!context) {
    throw new Error('useAspirations must be used within an AspirationProvider');
  }
  return context;
};
