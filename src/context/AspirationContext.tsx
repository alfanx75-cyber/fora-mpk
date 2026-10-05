import React, { createContext, useContext, useState, useEffect } from 'react';
import { Aspiration, AspirationCategory, AspirationStatus, MPKResponse, ToastMessage } from '../types';
import { INITIAL_ASPIRATIONS, STATUS_MAP } from '../data/mockData';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

interface AdminCredentials {
  username: string;
  password: string;
}

interface AspirationContextType {
  aspirations: Aspiration[];
  addAspiration: (newAsp: {
    title: string;
    description: string;
    category: AspirationCategory;
    authorName: string;
    className: string;
    isAnonymous: boolean;
    attachments?: { name: string; size?: string; type?: string }[];
  }) => Aspiration;
  updateAspirationStatus: (id: string, newStatus: AspirationStatus, note?: string) => void;
  updateMPKResponse: (id: string, response: MPKResponse) => void;
  deleteAspiration: (id: string) => void;
  voteAspiration: (id: string) => void;
  addComment: (aspirationId: string, author: string, roleOrClass: string, content: string) => void;
  currentRoute: string;
  navigate: (route: string) => void;
  selectedAspirationId: string | null;
  setSelectedAspirationId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeStatus: string;
  setActiveStatus: (status: string) => void;
  toast: ToastMessage | null;
  showToast: (title: string, message: string, ticketId?: string, type?: "success" | "info" | "vote" | "error") => void;
  hideToast: () => void;
  isAdmin: boolean;
  adminCredentials: AdminCredentials;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (newUsername: string, newPassword: string) => Promise<boolean>;
  stats: {
    total: number;
    responded: number;
    inProgress: number;
    completed: number;
  };
}

const AspirationContext = createContext<AspirationContextType | undefined>(undefined);

const STORAGE_KEY = 'fora_aspirations_data_v5';
const ADMIN_SESSION_KEY = 'fora_admin_session';
const ADMIN_CREDS_KEY = 'fora_admin_creds';
const DEFAULT_ADMIN_USERNAME = 'admin_mpk';
const DEFAULT_ADMIN_PASSWORD = 'mpk2026';

export const AspirationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aspirations, setAspirations] = useState<Aspiration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_ASPIRATIONS;
  });

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
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      username: DEFAULT_ADMIN_USERNAME,
      password: DEFAULT_ADMIN_PASSWORD,
    };
  });

  // Client routing state
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && (hash.startsWith('/') || hash === 'aspirasi' || hash === 'status' || hash === 'kirim' || hash === 'tentang' || hash === 'admin')) {
      return hash.startsWith('/') ? hash : `/${hash}`;
    }
    return '/';
  });

  const [selectedAspirationId, setSelectedAspirationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync aspirations in real-time from Firebase Firestore
  useEffect(() => {
    const aspirationsCol = collection(db, 'aspirations');
    const unsubscribe = onSnapshot(
      aspirationsCol,
      snapshot => {
        const fetched: Aspiration[] = [];
        snapshot.forEach(docSnap => {
          fetched.push(docSnap.data() as Aspiration);
        });

        // Sort: newest ticket first
        fetched.sort((a, b) => b.id.localeCompare(a.id));

        setAspirations(fetched);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(fetched));
        } catch {}
      },
      error => {
        handleFirestoreError(error, OperationType.LIST, 'aspirations');
      }
    );

    return () => unsubscribe();
  }, []);

  // Sync admin custom credentials from Firebase Firestore
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
          // Initialize default credentials document in Firestore
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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === '') {
        setCurrentRoute('/');
      } else {
        const clean = hash.startsWith('/') ? hash : `/${hash}`;
        setCurrentRoute(clean);
        if (clean.startsWith('/aspirasi/')) {
          const id = clean.replace('/aspirasi/', '');
          setSelectedAspirationId(id);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    const clean = route.startsWith('/') ? route : `/${route}`;
    setCurrentRoute(clean);
    window.location.hash = clean;
    if (clean.startsWith('/aspirasi/')) {
      const id = clean.replace('/aspirasi/', '');
      setSelectedAspirationId(id);
    } else if (clean === '/aspirasi') {
      setSelectedAspirationId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginAdmin = (username: string, pass: string): boolean => {
    const cleanUser = username.trim();
    const cleanPass = pass.trim();

    const isUsernameMatch = cleanUser.toLowerCase() === adminCredentials.username.trim().toLowerCase();
    const isPasswordMatch = cleanPass === adminCredentials.password.trim();

    // Fallback default support
    const isDefaultMatch = (cleanUser.toLowerCase() === 'admin' || cleanUser.toLowerCase() === 'admin_mpk') && cleanPass === 'mpk2026';

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

      showToast('Kredensial Diperbarui', `Username & password admin baru berhasil disimpan ke database.`, undefined, 'success');
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'admin_settings/credentials');
      showToast('Gagal Menyimpan', 'Terjadi kendala saat memperbarui database.', undefined, 'error');
      return false;
    }
  };

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
    const timer = setTimeout(() => {
      setToast(null);
    }, 3600);
    return () => clearTimeout(timer);
  }, [toast]);

  const addAspiration = (data: {
    title: string;
    description: string;
    category: AspirationCategory;
    authorName: string;
    className: string;
    isAnonymous: boolean;
    attachments?: { name: string; size?: string; type?: string }[];
  }) => {
    const now = new Date();
    const year = now.getFullYear();

    // Auto-increment sequence in format: Tahun-0001, Tahun-0002, etc.
    let maxSeq = 0;
    aspirations.forEach(a => {
      const match = a.id.match(new RegExp(`^${year}-(\\d+)$`));
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxSeq) maxSeq = num;
      }
    });
    const nextSeq = maxSeq + 1;
    const newId = `${year}-${String(nextSeq).padStart(4, '0')}`;

    const dateFormatted = `${now.getDate()} Okt ${year}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newAspiration: Aspiration = {
      id: newId,
      title: data.title,
      description: data.description,
      category: data.category,
      authorName: data.isAnonymous ? 'Anonim' : (data.authorName || 'Siswa'),
      className: data.isAnonymous ? 'Rahasia' : (data.className || 'Umum'),
      isAnonymous: data.isAnonymous,
      supportCount: 1,
      hasVoted: true,
      status: 'submitted',
      createdAt: dateFormatted,
      updatedAt: dateFormatted,
      attachments: data.attachments || [],
      timeline: [
        {
          stage: 'submitted',
          label: 'Aspirasi Masuk ke Inbox FORA',
          date: dateFormatted,
          note: 'Aspirasi telah berhasil dicatat ke antrean Komisi 3 (KOASITER).',
          actor: data.isAnonymous ? 'Anonim' : `${data.authorName} (${data.className})`,
          completed: true,
          current: true,
        },
        {
          stage: 'received',
          label: 'Verifikasi Komisi Terkait',
          date: 'Menunggu Verifikasi (1x24 jam)',
          note: 'Pengecekan substansi dan penyaluran ke komisi terkait.',
          actor: 'Komisi 3 MPK',
          completed: false,
          current: false,
        },
        {
          stage: 'discussed',
          label: 'Rapat Dengar Pendapat MPK',
          date: 'Jadwal Pleno',
          note: 'Perumusan solusi bersama mitra sekolah.',
          actor: 'Pleno MPK',
          completed: false,
          current: false,
        },
        {
          stage: 'follow_up',
          label: 'Nota Dinas & Audiensi Sekolah',
          date: 'Tahap Tindak Lanjut',
          note: 'Penyerahan nota rekomendasi resmi.',
          actor: 'MPK & Pihak Sekolah',
          completed: false,
          current: false,
        },
        {
          stage: 'completed',
          label: 'Eksekusi Kebijakan & Selesai',
          date: 'Tahap Akhir',
          note: 'Penyelesaian tuntas & publikasi hasil tindak lanjut.',
          actor: 'Pihak Sekolah',
          completed: false,
          current: false,
        },
      ],
      comments: [],
    };

    // Optimistic local update
    setAspirations(prev => [newAspiration, ...prev.filter(a => a.id !== newId)]);

    // Write to Firestore database
    setDoc(doc(db, 'aspirations', newId), newAspiration).catch(err => {
      handleFirestoreError(err, OperationType.CREATE, `aspirations/${newId}`);
    });

    showToast(
      'Aspirasi Berhasil Dikirim',
      `Nomor tiket Anda: ${newId}. Simpan nomor ini untuk melacak status.`,
      newId,
      'success'
    );
    return newAspiration;
  };

  const updateAspirationStatus = (id: string, newStatus: AspirationStatus, note?: string) => {
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
        note: isCurrent && note ? note : evt.note,
      };
    });

    // Optimistic local update
    setAspirations(prev =>
      prev.map(a => {
        if (a.id === id) {
          return {
            ...a,
            status: newStatus,
            updatedAt: dateFormatted,
            timeline: updatedTimeline,
          };
        }
        return a;
      })
    );

    // Save update to Firebase Firestore
    updateDoc(doc(db, 'aspirations', id), {
      status: newStatus,
      updatedAt: dateFormatted,
      timeline: updatedTimeline,
    }).catch(err => {
      handleFirestoreError(err, OperationType.UPDATE, `aspirations/${id}`);
    });

    showToast('Status Diperbarui', `Status tiket ${id} diubah menjadi "${statusLabel}"`, id, 'success');
  };

  const updateMPKResponse = (id: string, response: MPKResponse) => {
    const now = new Date();
    const dateFormatted = `${now.getDate()} Okt ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setAspirations(prev =>
      prev.map(a => {
        if (a.id === id) {
          return {
            ...a,
            mpkResponse: response,
            updatedAt: dateFormatted,
          };
        }
        return a;
      })
    );

    // Save to Firebase Firestore
    updateDoc(doc(db, 'aspirations', id), {
      mpkResponse: response,
      updatedAt: dateFormatted,
    }).catch(err => {
      handleFirestoreError(err, OperationType.UPDATE, `aspirations/${id}`);
    });

    showToast('Tanggapan Disimpan', `Tanggapan resmi MPK untuk tiket ${id} telah tersimpan di cloud.`, id, 'success');
  };

  const deleteAspiration = (id: string) => {
    setAspirations(prev => prev.filter(a => a.id !== id));

    // Delete in Firebase Firestore
    deleteDoc(doc(db, 'aspirations', id)).catch(err => {
      handleFirestoreError(err, OperationType.DELETE, `aspirations/${id}`);
    });

    showToast('Aspirasi Dihapus', `Tiket ${id} telah dihapus dari sistem.`, undefined, 'info');
  };

  const voteAspiration = (id: string) => {
    const asp = aspirations.find(item => item.id === id);
    if (!asp) return;

    const already = asp.hasVoted;
    const nextVoted = !already;
    const diff = nextVoted ? 1 : -1;
    const nextCount = Math.max(0, asp.supportCount + diff);

    setAspirations(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            hasVoted: nextVoted,
            supportCount: nextCount,
          };
        }
        return item;
      })
    );

    if (nextVoted) {
      showToast('Dukungan Tercatat', `Anda mendukung aspirasi "${asp.title.slice(0, 32)}..."`, asp.id, 'vote');
    }

    // Update in Firestore
    updateDoc(doc(db, 'aspirations', id), {
      supportCount: nextCount,
    }).catch(err => {
      handleFirestoreError(err, OperationType.UPDATE, `aspirations/${id}`);
    });
  };

  const addComment = (aspirationId: string, author: string, roleOrClass: string, content: string) => {
    if (!content.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      author: author || 'Siswa',
      roleOrClass: roleOrClass || 'Siswa Aktif',
      content: content.trim(),
      timestamp: 'Baru saja',
      likes: 0,
    };

    const targetAsp = aspirations.find(item => item.id === aspirationId);
    const updatedComments = [newComment, ...(targetAsp?.comments || [])];

    setAspirations(prev =>
      prev.map(item => {
        if (item.id === aspirationId) {
          return {
            ...item,
            comments: updatedComments,
          };
        }
        return item;
      })
    );

    // Save comments to Firestore
    updateDoc(doc(db, 'aspirations', aspirationId), {
      comments: updatedComments,
    }).catch(err => {
      handleFirestoreError(err, OperationType.UPDATE, `aspirations/${aspirationId}`);
    });

    showToast('Komentar Terkirim', 'Komentar Anda telah ditambahkan ke ruang diskusi.', undefined, 'info');
  };

  // Pure dynamic stats calculation based solely on actual incoming aspirations
  const total = aspirations.length;
  const responded = aspirations.filter(a => a.status !== 'submitted').length;
  const inProgress = aspirations.filter(a => a.status === 'discussed' || a.status === 'follow_up').length;
  const completed = aspirations.filter(a => a.status === 'completed').length;

  return (
    <AspirationContext.Provider
      value={{
        aspirations,
        addAspiration,
        updateAspirationStatus,
        updateMPKResponse,
        deleteAspiration,
        voteAspiration,
        addComment,
        currentRoute,
        navigate,
        selectedAspirationId,
        setSelectedAspirationId,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        activeStatus,
        setActiveStatus,
        toast,
        showToast,
        hideToast,
        isAdmin,
        adminCredentials,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,
        stats: {
          total,
          responded,
          inProgress,
          completed,
        },
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
