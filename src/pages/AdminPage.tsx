import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { CATEGORIES, STATUS_MAP } from '../data/mockData';
import { AspirationCategory, AspirationStatus, MPKResponse } from '../types';
import { CategoryIcon } from '../components/CategoryIcon';
import { Lock, LogOut, CheckCircle2, MessageSquare, Clock, Inbox, Trash2, Edit3, Search, Filter, KeyRound, Database, UserCheck, Shield } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    aspirations,
    updateAspirationStatus,
    updateMPKResponse,
    deleteAspiration,
    isAdmin,
    adminCredentials,
    loginAdmin,
    logoutAdmin,
    updateAdminCredentials,
    navigate,
    showToast,
  } = useAspirations();

  // Login Form States
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Custom Credential Form States (Inside Dashboard)
  const [showCredForm, setShowCredForm] = useState(false);
  const [newUsername, setNewUsername] = useState(adminCredentials.username);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingCreds, setIsUpdatingCreds] = useState(false);

  // Filters
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal response state
  const [selectedAspId, setSelectedAspId] = useState<string | null>(null);
  const [responderName, setResponderName] = useState('Aura Pinasti');
  const [responderRole, setResponderRole] = useState('Ketua MPK');
  const [statement, setStatement] = useState('');
  const [actionTaken, setActionTaken] = useState('');
  const [statusNote, setStatusNote] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(usernameInput, passwordInput);
    setPasswordInput('');
  };

  const handleUpdateCreds = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      showToast('Perhatian', 'Username dan password baru wajib diisi!', undefined, 'error');
      return;
    }
    setIsUpdatingCreds(true);
    const success = await updateAdminCredentials(newUsername.trim(), newPassword.trim());
    setIsUpdatingCreds(false);
    if (success) {
      setNewPassword('');
      setShowCredForm(false);
    }
  };

  const openResponseModal = (aspId: string) => {
    const asp = aspirations.find(a => a.id === aspId);
    if (!asp) return;
    setSelectedAspId(aspId);
    setResponderName(asp.mpkResponse?.responderName || 'Aura Pinasti');
    setResponderRole(asp.mpkResponse?.responderRole || 'Ketua MPK');
    setStatement(asp.mpkResponse?.statement || '');
    setActionTaken(asp.mpkResponse?.actionTaken || '');
    setStatusNote('');
  };

  const handleSaveResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAspId) return;

    if (statement.trim() || actionTaken.trim()) {
      const now = new Date();
      const dateStr = `${now.getDate()} Okt ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const responseData: MPKResponse = {
        responderName: responderName.trim() || 'Pengurus MPK',
        responderRole: responderRole.trim() || 'Perwakilan MPK',
        date: dateStr,
        statement: statement.trim() || 'Aspirasi telah diterima dan ditinjau oleh pimpinan MPK.',
        actionTaken: actionTaken.trim() || 'Sedang dikoordinasikan dalam rapat komisi.',
        verifiedOfficial: true,
      };
      updateMPKResponse(selectedAspId, responseData);
    }

    if (statusNote.trim()) {
      const currentAsp = aspirations.find(a => a.id === selectedAspId);
      if (currentAsp) {
        updateAspirationStatus(selectedAspId, currentAsp.status, statusNote.trim());
      }
    }

    setSelectedAspId(null);
  };

  const filteredAspirations = aspirations.filter(a => {
    if (filterCategory !== 'all' && a.category !== filterCategory) return false;
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.id.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q) ||
        a.authorName.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // If not logged in as admin
  if (!isAdmin) {
    return (
      <div className="w-full max-w-[1360px] mx-auto px-4 py-16 sm:py-24 flex items-center justify-center min-h-[60vh]">
        <div className="bg-[#FFFFFF] border-[3px] border-[#111111] rounded-3xl p-6 sm:p-10 max-w-md w-full shadow-[6px_6px_0px_#111111] text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#ffd9e1] border-[2px] border-[#111111] flex items-center justify-center mx-auto mb-4 text-[#111111] shadow-[2px_2px_0px_#111111]">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight mb-2">
            LOGIN ADMIN MPK
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium mb-6">
            Khusus Badan Pengurus Harian & Komisi MPK SMAN 1 Kebumen untuk mengelola status aspirasi.
          </p>

          <form onSubmit={handleLogin} className="space-y-3.5 text-left">
            <div>
              <label className="block font-['Space_Grotesk'] text-[11px] font-black uppercase text-[#111111] mb-1">
                Username Admin
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="Masukkan username..."
                className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-4 py-2.5 font-['Space_Grotesk'] text-sm font-bold placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111]"
                autoFocus
                required
              />
            </div>

            <div>
              <label className="block font-['Space_Grotesk'] text-[11px] font-black uppercase text-[#111111] mb-1">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Masukkan password..."
                className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-4 py-2.5 font-mono text-sm font-bold placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111]"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-brutal w-full py-3 bg-[#fde029] text-[#111111] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] cursor-pointer mt-2"
            >
              Masuk Dashboard Admin →
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-dashed border-[#111111]">
            <button
              onClick={() => navigate('/')}
              className="text-xs font-['Space_Grotesk'] font-bold text-[#5a3f47] hover:text-[#111111] hover:underline"
            >
              ← Kembali ke Beranda Siswa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Admin Header */}
      <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 shadow-[5px_5px_0px_#111111] mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-[2px] border-dashed border-[#111111]">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#21D99A] border-[1.5px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[1.5px_1.5px_0px_#111111]">
                <span className="w-2 h-2 rounded-full bg-[#111111]" />
                <span>ADMIN AKTIF: {adminCredentials.username}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dbe1ff] border-[1.5px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[1.5px_1.5px_0px_#111111]">
                <Database className="w-3 h-3 text-[#111111]" />
                <span>FIREBASE FIRESTORE SYNC AKTIF</span>
              </div>
            </div>
            <h1 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
              PANEL PENGELOLAAN STATUS ASPIRASI
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium mt-1">
              Atur tahapan status, unggah respon resmi audiensi, dan sinkronkan data aspirasi real-time ke seluruh siswa.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setShowCredForm(prev => !prev)}
              className="btn-brutal inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111]"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{showCredForm ? 'Tutup Kredensial' : 'Ubah Username & Password'}</span>
            </button>

            <button
              onClick={() => navigate('/status')}
              className="btn-brutal px-3.5 py-2.5 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111]"
            >
              Lihat Tampilan Siswa
            </button>

            <button
              onClick={logoutAdmin}
              className="btn-brutal inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-[#ffd9e1] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase text-[#ba1a1a] shadow-[2px_2px_0px_#111111]"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Custom Username & Password Configuration Drawer */}
        {showCredForm && (
          <div className="mt-5 p-5 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] animate-[popModal_0.25s_ease-out_forwards]">
            <div className="flex items-center gap-2 mb-3">
              <UserCheck className="w-5 h-5 text-[#0051d5]" />
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-black uppercase text-[#111111]">
                Kustomisasi Akun Admin MPK (Tersimpan di Cloud Firebase)
              </h3>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5a3f47] mb-4 font-medium">
              Anda dapat mengganti username dan password admin sesuai kesepakatan pengurus MPK. Kredensial ini otomatis tersinkronisasi ke seluruh pengurus.
            </p>

            <form onSubmit={handleUpdateCreds} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block font-['Space_Grotesk'] text-[10px] font-black uppercase mb-1">
                  Username Admin Baru
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                  placeholder="Contoh: mpk_smansa"
                  className="w-full bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-['Space_Grotesk'] text-[10px] font-black uppercase mb-1">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Masukkan password baru..."
                  className="w-full bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isUpdatingCreds}
                  className="btn-brutal w-full py-2.5 bg-[#21D99A] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer disabled:opacity-50"
                >
                  {isUpdatingCreds ? 'Menyimpan...' : 'Simpan Kredensial Baru'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Quick KPI Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
          <div className="p-3.5 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-2xl">
            <span className="font-['Space_Grotesk'] text-[10px] uppercase font-bold text-[#5a3f47] block">
              Total Masuk (Cloud)
            </span>
            <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-[#111111]">
              {aspirations.length}
            </span>
          </div>
          <div className="p-3.5 bg-[#fde029] border-[2px] border-[#111111] rounded-2xl">
            <span className="font-['Space_Grotesk'] text-[10px] uppercase font-bold text-[#111111] block">
              Menunggu Telaah
            </span>
            <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-[#111111]">
              {aspirations.filter(a => a.status === 'submitted').length}
            </span>
          </div>
          <div className="p-3.5 bg-[#dbe1ff] border-[2px] border-[#111111] rounded-2xl">
            <span className="font-['Space_Grotesk'] text-[10px] uppercase font-bold text-[#111111] block">
              Sidang & Tindak Lanjut
            </span>
            <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-[#111111]">
              {aspirations.filter(a => a.status === 'discussed' || a.status === 'follow_up').length}
            </span>
          </div>
          <div className="p-3.5 bg-[#21D99A] border-[2px] border-[#111111] rounded-2xl">
            <span className="font-['Space_Grotesk'] text-[10px] uppercase font-bold text-[#111111] block">
              Tuntas Tereksekusi
            </span>
            <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-[#111111]">
              {aspirations.filter(a => a.status === 'completed').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#FFFFFF] border-[2.5px] border-[#111111] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#111111] mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5a3f47]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari ID Tiket (2026-0001), judul, nama siswa..."
            className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-2.5 py-2 text-xs font-bold uppercase focus:outline-none"
          >
            <option value="all">Semua Kategori</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-2.5 py-2 text-xs font-bold uppercase focus:outline-none"
          >
            <option value="all">Semua Status</option>
            {Object.values(STATUS_MAP).map(st => (
              <option key={st.id} value={st.id}>
                {st.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table / List of Aspirations */}
      {filteredAspirations.length > 0 ? (
        <div className="space-y-4">
          {filteredAspirations.map(asp => {
            const stInfo = STATUS_MAP[asp.status] || STATUS_MAP.submitted;
            return (
              <div
                key={asp.id}
                className="bg-[#FFFFFF] border-[2.5px] border-[#111111] rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_#111111] flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Left Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-mono text-xs font-black bg-[#fde029] border border-[#111111] px-2.5 py-0.5 rounded-lg shadow-[1px_1px_0px_#111111]">
                      {asp.id}
                    </span>
                    <span className="inline-flex items-center gap-1 font-['Space_Grotesk'] text-[10px] font-bold uppercase bg-[#dbe1ff] border border-[#111111] px-2 py-0.5 rounded-md">
                      <CategoryIcon category={asp.category} className="w-3 h-3" />
                      <span>{asp.category}</span>
                    </span>
                    <span className="text-[10px] text-[#5a3f47] font-semibold">
                      {asp.createdAt} • Oleh: {asp.isAnonymous ? 'Anonim' : `${asp.authorName} (${asp.className})`}
                    </span>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-black text-[#111111] mb-1">
                    {asp.title}
                  </h3>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111]/80 font-medium line-clamp-2 mb-2">
                    {asp.description}
                  </p>

                  {asp.mpkResponse && (
                    <div className="bg-[#ffd9e1]/50 border border-[#111111] rounded-xl p-2.5 text-xs text-[#111111] mt-2">
                      <span className="font-['Space_Grotesk'] font-black uppercase text-[10px] text-[#e01376] block">
                        Respons Resmi ({asp.mpkResponse.responderName} - {asp.mpkResponse.responderRole}):
                      </span>
                      <p className="italic">“{asp.mpkResponse.statement}”</p>
                    </div>
                  )}
                </div>

                {/* Right Status Control & Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 lg:w-64 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#111111]/20">
                  <div>
                    <label className="block font-['Space_Grotesk'] text-[10px] font-black uppercase text-[#5a3f47] mb-1">
                      Ubah Status Tahapan:
                    </label>
                    <select
                      value={asp.status}
                      onChange={e => updateAspirationStatus(asp.id, e.target.value as AspirationStatus)}
                      className={`w-full border-[2px] border-[#111111] rounded-xl px-3 py-2 font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] focus:outline-none ${stInfo.badgeBg} ${stInfo.textColor}`}
                    >
                      <option value="submitted">01. DIKIRIM (Masuk Antrean)</option>
                      <option value="received">02. DITERIMA (Diverifikasi)</option>
                      <option value="discussed">03. DIBAHAS (Sidang Komisi)</option>
                      <option value="follow_up">04. DITINDAKLANJUTI (Audiensi)</option>
                      <option value="completed">05. SELESAI (Tereksekusi)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => openResponseModal(asp.id)}
                      className="btn-brutal flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#fde029] border-[1.5px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-[11px] font-black uppercase shadow-[1.5px_1.5px_0px_#111111]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{asp.mpkResponse ? 'Edit Respons' : '+ Beri Respons'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Yakin ingin menghapus aspirasi tiket ${asp.id}? Tindakan ini akan menghapus data di cloud database.`)) {
                          deleteAspiration(asp.id);
                        }
                      }}
                      title="Hapus Aspirasi"
                      className="btn-brutal p-2 bg-[#ffdad6] text-[#ba1a1a] border-[1.5px] border-[#111111] rounded-xl shadow-[1.5px_1.5px_0px_#111111] hover:bg-[#ba1a1a] hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border-[2.5px] border-[#111111] rounded-3xl p-10 text-center shadow-[5px_5px_0px_#111111]">
          <h3 className="font-['Space_Grotesk'] text-xl font-black uppercase text-[#111111] mb-1">
            TIDAK ADA ASPIRASI YANG COCOK
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111]/75">
            Belum ada aspirasi di cloud database dengan filter atau pencarian saat ini.
          </p>
        </div>
      )}

      {/* Official Response Modal */}
      {selectedAspId && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-[8px_8px_0px_#111111] relative mx-auto my-auto max-h-[92vh] overflow-y-auto">
            <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black text-[#111111] uppercase tracking-tight mb-1">
              RESPONS RESMI MPK
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5a3f47] font-semibold mb-4">
              Tiket: <span className="font-mono text-black font-bold">{selectedAspId}</span>
            </p>

            <form onSubmit={handleSaveResponse} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-['Space_Grotesk'] text-[10px] font-black uppercase mb-1">
                    Nama Penanggap
                  </label>
                  <input
                    type="text"
                    value={responderName}
                    onChange={e => setResponderName(e.target.value)}
                    placeholder="Contoh: Aura Pinasti"
                    className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-['Space_Grotesk'] text-[10px] font-black uppercase mb-1">
                    Jabatan / Komisi
                  </label>
                  <input
                    type="text"
                    value={responderRole}
                    onChange={e => setResponderRole(e.target.value)}
                    placeholder="Contoh: Ketua MPK / Komisi 3"
                    className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-['Space_Grotesk'] text-[10px] font-black uppercase mb-1">
                  Pernyataan Resmi MPK
                </label>
                <textarea
                  rows={3}
                  value={statement}
                  onChange={e => setStatement(e.target.value)}
                  placeholder="Tuliskan tanggapan resmi hasil kajian atau dengar pendapat..."
                  className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl p-3 text-xs font-medium resize-none"
                  required
                />
              </div>

              <div>
                <label className="block font-['Space_Grotesk'] text-[10px] font-black uppercase mb-1">
                  Tindak Lanjut Nyata (Action Taken)
                </label>
                <input
                  type="text"
                  value={actionTaken}
                  onChange={e => setActionTaken(e.target.value)}
                  placeholder="Contoh: Penyerahan nota rekomendasi ke Wakasek Sarpras..."
                  className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block font-['Space_Grotesk'] text-[10px] font-black uppercase mb-1">
                  Catatan Progres ke Notulen Timeline (Opsional)
                </label>
                <input
                  type="text"
                  value={statusNote}
                  onChange={e => setStatusNote(e.target.value)}
                  placeholder="Catatan tambahan untuk pelacakan publik siswa..."
                  className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-dashed border-[#111111]">
                <button
                  type="button"
                  onClick={() => setSelectedAspId(null)}
                  className="btn-brutal px-4 py-2 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-brutal px-5 py-2 bg-[#21D99A] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111]"
                >
                  Simpan Respons ke Cloud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
