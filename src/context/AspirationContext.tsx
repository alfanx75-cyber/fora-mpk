import React, { createContext, useContext, useState, useEffect } from 'react';
import { Aspiration, AspirationCategory, AspirationStatus, ToastMessage } from '../types';
import { INITIAL_ASPIRATIONS } from '../data/mockData';

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
  stats: {
    total: number;
    responded: number;
    inProgress: number;
    completed: number;
  };
}

const AspirationContext = createContext<AspirationContextType | undefined>(undefined);

const STORAGE_KEY = 'fora_aspirations_data_v1';

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

  // Simple client routing state: '/', '/aspirasi', '/aspirasi/:id', '/status', '/kirim', '/tentang'
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && (hash.startsWith('/') || hash === 'aspirasi' || hash === 'status' || hash === 'kirim' || hash === 'tentang')) {
      return hash.startsWith('/') ? hash : `/${hash}`;
    }
    return '/';
  });

  const [selectedAspirationId, setSelectedAspirationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync route with window hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === '') {
        setCurrentRoute('/');
      } else {
        const clean = hash.startsWith('/') ? hash : `/${hash}`;
        setCurrentRoute(clean);
        // Check if detail route
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

  // Persist aspirations
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(aspirations));
    } catch (e) {
      console.error(e);
    }
  }, [aspirations]);

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

  // Auto hide toast after 3.6s
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
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `MPK-2026-${randomNum}`;
    const now = new Date();
    const dateFormatted = `${now.getDate()} Okt 2026, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

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
          note: 'Aspirasi telah berhasil dicatat ke antrean Komisi I MPK.',
          actor: data.isAnonymous ? 'Anonim (Terenkripsi)' : `${data.authorName} (${data.className})`,
          completed: true,
          current: true,
        },
        {
          stage: 'received',
          label: 'Verifikasi Komisi Terkait',
          date: 'Menunggu Antrean (1x24 jam)',
          note: 'Pengecekan substansi & pengelompokan ke bidang komisi.',
          actor: 'Komisi I MPK',
          completed: false,
          current: false,
        },
        {
          stage: 'discussed',
          label: 'Rapat Dengar Pendapat MPK',
          date: 'Jadwal Reguler',
          note: 'Perumusan solusi bersama mitra sekolah.',
          actor: 'Pleno MPK',
          completed: false,
          current: false,
        },
        {
          stage: 'follow_up',
          label: 'Nota Dinas & Audiensi Kepala Sekolah',
          date: 'Tahap Tindak Lanjut',
          note: 'Penyerahan nota rekomendasi resmi.',
          actor: 'MPK & Pihak Sekolah',
          completed: false,
          current: false,
        },
        {
          stage: 'completed',
          label: 'Eksekusi Kebijakan & Publikasi',
          date: 'Tahap Akhir',
          note: 'Penyelesaian tuntas & laporan pertanggungjawaban.',
          actor: 'Pihak Sekolah',
          completed: false,
          current: false,
        },
      ],
      comments: [],
    };

    setAspirations(prev => [newAspiration, ...prev]);
    showToast(
      'SUDAH MENDARAT! 🚀',
      'Aspirasimu masuk antrean telaah MPK.',
      newId,
      'success'
    );
    return newAspiration;
  };

  const voteAspiration = (id: string) => {
    setAspirations(prev =>
      prev.map(item => {
        if (item.id === id) {
          const already = item.hasVoted;
          const nextVoted = !already;
          const diff = nextVoted ? 1 : -1;
          
          if (nextVoted) {
            showToast('Dukunganmu Tercatat! ❤️', `Kamu mendukung "${item.title.slice(0, 32)}..."`, item.id, 'vote');
          }
          
          return {
            ...item,
            hasVoted: nextVoted,
            supportCount: Math.max(0, item.supportCount + diff),
          };
        }
        return item;
      })
    );
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

    setAspirations(prev =>
      prev.map(item => {
        if (item.id === aspirationId) {
          return {
            ...item,
            comments: [newComment, ...item.comments],
          };
        }
        return item;
      })
    );

    showToast('Komentar Terkirim! 💬', 'Komentarmu telah ditambahkan ke ruang diskusi.', undefined, 'info');
  };

  // Stats calculation
  const total = aspirations.length + 240; // realistic aggregate offset to match ~247+
  const responded = aspirations.filter(a => a.status !== 'submitted').length + 180;
  const inProgress = aspirations.filter(a => a.status === 'discussed' || a.status === 'follow_up').length + 38;
  const completed = aspirations.filter(a => a.status === 'completed').length + 22;

  return (
    <AspirationContext.Provider
      value={{
        aspirations,
        addAspiration,
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
