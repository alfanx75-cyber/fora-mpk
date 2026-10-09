import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { CATEGORIES, STATUS_MAP, SCHOOL_CLASSES, SCHOOL_NAME } from '../data/mockData';
import { AspirationCategory, AspirationStatus, MPKResponse } from '../types';
import { CategoryIcon } from '../components/CategoryIcon';
import {
  Lock,
  LogOut,
  CheckCircle2,
  MessageSquare,
  Clock,
  Inbox,
  Trash2,
  Edit3,
  Search,
  Filter,
  KeyRound,
  Shield,
  FileText,
  UserCheck,
  ChevronDown
} from 'lucide-react';

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
  const [filterClass, setFilterClass] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal response state
  const [selectedAspId, setSelectedAspId] = useState<string | null>(null);
  const [responderName, setResponderName] = useState('Aura Pinasti');
  const [responderRole, setResponderRole] = useState('Ketua MPK');
  const [statement, setStatement] = useState('');
  const [actionTaken, setActionTaken] = useState('');

  // Modal status change state
  const [statusModalAspId, setStatusModalAspId] = useState<string | null>(null);
  const [targetStatus, setTargetStatus] = useState<AspirationStatus>('discussed');
  const [processNoteInput, setProcessNoteInput] = useState('');
  const [internalNoteInput, setInternalNoteInput] = useState('');

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
  };

  const handleSaveResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAspId) return;

    if (statement.trim()) {
      const now = new Date();
      const dateStr = `${now.getDate()} Okt ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const responseData: MPKResponse = {
        responderName: responderName.trim() || 'Pengurus MPK',
        responderRole: responderRole.trim() || 'Perwakilan MPK',
        date: dateStr,
        statement: statement.trim(),
        actionTaken: actionTaken.trim() || 'Dikoordinasikan dalam audiensi sekolah.',
        verifiedOfficial: true,
      };
      await updateMPKResponse(selectedAspId, responseData);
    }
    setSelectedAspId(null);
  };

  const openStatusModal = (aspId: string) => {
    const asp = aspirations.find(a => a.id === aspId);
    if (!asp) return;
    setStatusModalAspId(aspId);
    setTargetStatus(asp.status);
    setProcessNoteInput(asp.senderProcessNote || '');
    setInternalNoteInput(asp.adminInternalNotes || '');
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusModalAspId) return;
    await updateAspirationStatus(
      statusModalAspId,
      targetStatus,
      processNoteInput.trim(),
      internalNoteInput.trim()
    );
    setStatusModalAspId(null);
  };

  const filteredAspirations = aspirations.filter(a => {
    if (filterCategory !== 'all' && a.category !== filterCategory) return false;
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    if (filterClass !== 'all') {
      if (filterClass === 'none' && a.className !== 'Tidak ingin menyebutkan kelas') return false;
      if (filterClass.startsWith('grade_')) {
        const targetGrade = filterClass.replace('grade_', '');
        if (a.grade !== targetGrade) return false;
      } else if (filterClass !== 'none' && a.className !== filterClass) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.id.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.className.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate live stats
  const total = aspirations.length;
  const responded = aspirations.filter(a => !!(a.mpkResponse && a.mpkResponse.statement && a.mpkResponse.statement.trim())).length;
  const inProgress = aspirations.filter(a => a.status === 'discussed' || a.status === 'follow_up').length;
  const completed = aspirations.filter(a => a.status === 'completed').length;

  // Login view if not authenticated
  if (!isAdmin) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-16 sm:py-24">
        <div className="bg-[#FFFFFF] border-[3px] border-[#111111] rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#111111] text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#ffd9e1] border-[2px] border-[#111111] flex items-center justify-center mx-auto mb-4 text-[#111111] shadow-[2px_2px_0px_#111111]">
            <Lock className="w-8 h-8" />
          </div>

          <span className="font-['Space_Grotesk'] text-[11px] font-black uppercase px-2.5 py-0.5 bg-[#fde029] border border-[#111111] rounded shadow-[1px_1px_0px_#111111] inline-block mb-2">
            KHUSUS PENGURUS MPK
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl font-black text-[#111111] uppercase tracking-tight mb-2">
            LOGIN ADMIN MPK
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5a3f47] font-semibold mb-6">
            Masuk dengan username dan password resmi MPK {SCHOOL_NAME} untuk mengelola data aspirasi privat.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111] mb-1">
                Username Admin
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="Masukkan username..."
                className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3.5 py-2.5 font-['Space_Grotesk'] text-sm font-bold text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111]"
              />
            </div>

            <div>
              <label className="block font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111] mb-1">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Masukkan password..."
                className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3.5 py-2.5 font-['Space_Grotesk'] text-sm font-bold text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111]"
              />
            </div>

            <button
              type="submit"
              className="btn-brutal w-full py-3 bg-[#e01376] hover:bg-[#b5005d] text-white border-[2.5px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] cursor-pointer min-h-[46px]"
            >
              Masuk Dashboard Admin →
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#111111]/20">
            <button
              onClick={() => navigate('/')}
              className="text-xs font-['Space_Grotesk'] font-bold text-[#5a3f47] hover:underline cursor-pointer"
            >
              ← Kembali ke Beranda Siswa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 pb-24">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-[3px] border-[#111111] mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#21D99A] border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-2">
            <Shield className="w-3.5 h-3.5 text-[#111111]" />
            <span>SESI ADMIN AKTIF: {adminCredentials.username}</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
            PANEL ADMINISTRATOR MPK
          </h1>
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#5a3f47] font-semibold mt-1">
            Pengelolaan & tindak lanjut aspirasi siswa {SCHOOL_NAME}.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowCredForm(prev => !prev)}
            className="btn-brutal flex items-center gap-1.5 px-3.5 py-2 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-bold uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Kredensial Admin</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="btn-brutal flex items-center gap-1.5 px-3.5 py-2 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-bold uppercase text-[#ba1a1a] shadow-[2px_2px_0px_#111111] cursor-pointer hover:bg-[#ffdad6]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Credential Setting Dropdown */}
      {showCredForm && (
        <div className="bg-[#FFFFFF] border-[2.5px] border-[#111111] rounded-2xl p-5 mb-8 shadow-[4px_4px_0px_#111111] animate-[popModal_0.2s_ease-out_forwards]">
          <h3 className="font-['Space_Grotesk'] text-sm font-black uppercase text-[#111111] mb-3 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#e01376]" />
            Kustomisasi Akun Admin (Tersimpan ke Database Cloud)
          </h3>
          <form onSubmit={handleUpdateCreds} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              placeholder="Username Baru"
              className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-bold font-['Space_Grotesk']"
            />
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Password Baru"
              className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-bold font-['Space_Grotesk']"
            />
            <button
              type="submit"
              disabled={isUpdatingCreds}
              className="btn-brutal px-4 py-2 bg-[#21D99A] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
            >
              {isUpdatingCreds ? 'Menyimpan...' : 'Simpan Kredensial Baru'}
            </button>
          </form>
        </div>
      )}

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
        <div className="bg-[#ffd9e1] border-[2px] border-[#111111] p-4 rounded-2xl shadow-[3px_3px_0px_#111111]">
          <span className="font-['Space_Grotesk'] text-[10px] uppercase font-bold text-[#5a3f47]">Aspirasi Masuk</span>
          <div className="font-['Space_Grotesk'] text-3xl font-black text-[#111111]">{total}</div>
        </div>
        <div className="bg-[#fde029] border-[2px] border-[#111111] p-4 rounded-2xl shadow-[3px_3px_0px_#111111]">
          <span className="font-['Space_Grotesk'] text-[10px] uppercase font-bold text-[#5a3f47]">Sudah Ditanggapi</span>
          <div className="font-['Space_Grotesk'] text-3xl font-black text-[#111111]">{responded}</div>
        </div>
        <div className="bg-[#dbe1ff] border-[2px] border-[#111111] p-4 rounded-2xl shadow-[3px_3px_0px_#111111]">
          <span className="font-['Space_Grotesk'] text-[10px] uppercase font-bold text-[#5a3f47]">Sedang Diproses</span>
          <div className="font-['Space_Grotesk'] text-3xl font-black text-[#111111]">{inProgress}</div>
        </div>
        <div className="bg-[#21D99A]/40 border-[2px] border-[#111111] p-4 rounded-2xl shadow-[3px_3px_0px_#111111]">
          <span className="font-['Space_Grotesk'] text-[10px] uppercase font-bold text-[#5a3f47]">Selesai</span>
          <div className="font-['Space_Grotesk'] text-3xl font-black text-[#111111]">{completed}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFFFF] border-[2px] sm:border-[2.5px] border-[#111111] rounded-2xl p-4 sm:p-5 mb-6 shadow-[3px_3px_0px_#111111] space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5a3f47]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari ID tiket, judul, isi, atau kelas..."
              className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl pl-9 pr-3.5 py-2 font-['Space_Grotesk'] text-xs font-bold"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter Category */}
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-2.5 py-2 font-['Space_Grotesk'] text-xs font-bold"
            >
              <option value="all">Semua Kategori</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-2.5 py-2 font-['Space_Grotesk'] text-xs font-bold"
            >
              <option value="all">Semua Status</option>
              <option value="submitted">DIKIRIM (01)</option>
              <option value="received">DITERIMA (02)</option>
              <option value="discussed">DIBAHAS (03)</option>
              <option value="follow_up">DITINDAKLANJUTI (04)</option>
              <option value="completed">SELESAI (05)</option>
            </select>

            {/* Filter Class (Requirement 6: Internal Class Filter) */}
            <select
              value={filterClass}
              onChange={e => setFilterClass(e.target.value)}
              className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-2.5 py-2 font-['Space_Grotesk'] text-xs font-bold"
            >
              <option value="all">Semua Kelas</option>
              <option value="none">Tanpa Keterangan Kelas</option>
              <optgroup label="Berdasarkan Tingkat">
                <option value="grade_X">Semua Tingkat X</option>
                <option value="grade_XI">Semua Tingkat XI</option>
                <option value="grade_XII">Semua Tingkat XII</option>
              </optgroup>
              <optgroup label="Tingkat X">
                {SCHOOL_CLASSES.X.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tingkat XI">
                {SCHOOL_CLASSES.XI.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Tingkat XII">
                {SCHOOL_CLASSES.XII.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* Aspirations Management Table / Cards */}
      <div className="space-y-4">
        {filteredAspirations.length > 0 ? (
          filteredAspirations.map(asp => (
            <div
              key={asp.id}
              className="bg-[#FFFFFF] border-[2.5px] border-[#111111] rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_#111111] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#111111]/20">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-black bg-[#fde029] border border-[#111111] px-2.5 py-0.5 rounded-lg shadow-[1px_1px_0px_#111111]">
                    {asp.id}
                  </span>
                  <span className="text-[10px] font-black uppercase bg-[#ffd9e1] border border-[#111111] px-2 py-0.5 rounded">
                    {asp.category.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-bold bg-[#dbe1ff] border border-[#111111] px-2 py-0.5 rounded">
                    Kelas: {asp.className}
                  </span>
                  <span className="text-[10px] text-[#5a3f47] font-semibold">
                    {asp.createdAt}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <span
                    className="text-[10px] font-black uppercase px-2.5 py-1 border border-[#111111] rounded-lg"
                    style={{ backgroundColor: STATUS_MAP[asp.status]?.color || '#fde029' }}
                  >
                    {STATUS_MAP[asp.status]?.label}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-black text-[#111111]">
                  {asp.title}
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/90 font-medium mt-1 leading-relaxed whitespace-pre-line">
                  {asp.description}
                </p>
              </div>

              {/* Attachments preview if any */}
              {asp.attachments && asp.attachments.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-[11px] font-bold text-[#5a3f47]">Lampiran:</span>
                  {asp.attachments.map((att, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FCFBF5] border border-[#111111] rounded text-[10px] font-bold"
                    >
                      <FileText className="w-3 h-3" />
                      {att.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Sender Process Note / Internal Notes summary */}
              <div className="bg-[#FCFBF5] p-2.5 sm:p-3 rounded-xl border border-[#111111] text-xs space-y-1">
                <div>
                  <span className="font-bold text-[#5a3f47]">Keterangan Proses Pengirim: </span>
                  <span className="font-medium text-[#111111]">
                    {asp.senderProcessNote || 'Belum ada catatan proses khusus.'}
                  </span>
                </div>
                {asp.adminInternalNotes && (
                  <div>
                    <span className="font-bold text-[#ba1a1a]">Catatan Internal Admin (Rahasia): </span>
                    <span className="font-medium text-[#111111]">{asp.adminInternalNotes}</span>
                  </div>
                )}
                {asp.mpkResponse?.statement && (
                  <div>
                    <span className="font-bold text-[#00875a]">Tanggapan Resmi MPK: </span>
                    <span className="font-medium text-[#111111]">“{asp.mpkResponse.statement}”</span>
                  </div>
                )}
              </div>

              {/* Admin Actions: Update Status, Give Response, Delete */}
              <div className="flex items-center justify-between pt-2 border-t border-[#111111]/15 gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openStatusModal(asp.id)}
                    className="btn-brutal px-3 py-1.5 bg-[#fde029] border border-[#111111] rounded-lg font-['Space_Grotesk'] text-xs font-black uppercase shadow-[1.5px_1.5px_0px_#111111] cursor-pointer flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Ubah Status</span>
                  </button>
                  <button
                    onClick={() => openResponseModal(asp.id)}
                    className="btn-brutal px-3 py-1.5 bg-[#21D99A] border border-[#111111] rounded-lg font-['Space_Grotesk'] text-xs font-black uppercase shadow-[1.5px_1.5px_0px_#111111] cursor-pointer flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{asp.mpkResponse?.statement ? 'Edit Respon' : 'Beri Respon'}</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`Hapus tiket ${asp.id}?`)) {
                      deleteAspiration(asp.id);
                    }
                  }}
                  className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-lg transition-colors cursor-pointer"
                  title="Hapus kiriman"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#FFFFFF] border-[2px] border-[#111111] rounded-2xl p-10 text-center shadow-[3px_3px_0px_#111111]">
            <p className="font-['Space_Grotesk'] text-sm font-bold text-[#5a3f47]">
              Tidak ada data aspirasi yang cocok dengan filter.
            </p>
          </div>
        )}
      </div>

      {/* Modal: Ubah Status & Keterangan Proses */}
      {statusModalAspId && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] border-[3px] border-[#111111] rounded-3xl p-6 max-w-md w-full shadow-[8px_8px_0px_#111111] animate-[popModal_0.2s_ease-out_forwards]">
            <h3 className="font-['Space_Grotesk'] text-lg font-black uppercase text-[#111111] mb-4">
              Ubah Status Tiket {statusModalAspId}
            </h3>
            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block font-['Space_Grotesk'] text-xs font-bold uppercase mb-1">
                  Pilih Tahapan Baru:
                </label>
                <select
                  value={targetStatus}
                  onChange={e => setTargetStatus(e.target.value as AspirationStatus)}
                  className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="submitted">DIKIRIM (01)</option>
                  <option value="received">DITERIMA (02)</option>
                  <option value="discussed">DIBAHAS (03)</option>
                  <option value="follow_up">DITINDAKLANJUTI (04)</option>
                  <option value="completed">SELESAI (05)</option>
                </select>
              </div>

              <div>
                <label className="block font-['Space_Grotesk'] text-xs font-bold uppercase mb-1">
                  Keterangan Proses Singkat (Dapat Dibaca Pengirim):
                </label>
                <textarea
                  rows={2}
                  value={processNoteInput}
                  onChange={e => setProcessNoteInput(e.target.value)}
                  placeholder="Misal: Sudah dibahas bersama Komisi 3 dan diserahkan ke pihak sarpras."
                  className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl p-2.5 text-xs font-semibold resize-none"
                />
              </div>

              <div>
                <label className="block font-['Space_Grotesk'] text-xs font-bold uppercase mb-1">
                  Catatan Internal Admin MPK (Privat Khusus Pengurus):
                </label>
                <textarea
                  rows={2}
                  value={internalNoteInput}
                  onChange={e => setInternalNoteInput(e.target.value)}
                  placeholder="Catatan rahasia pengurus..."
                  className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl p-2.5 text-xs font-semibold resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#111111]/20">
                <button
                  type="button"
                  onClick={() => setStatusModalAspId(null)}
                  className="btn-brutal px-4 py-2 bg-white border border-[#111111] rounded-xl text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-brutal px-5 py-2 bg-[#fde029] border-[2px] border-[#111111] rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
                >
                  Simpan Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Tanggapan Resmi MPK */}
      {selectedAspId && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] border-[3px] border-[#111111] rounded-3xl p-6 max-w-lg w-full shadow-[8px_8px_0px_#111111] animate-[popModal_0.2s_ease-out_forwards]">
            <h3 className="font-['Space_Grotesk'] text-lg font-black uppercase text-[#111111] mb-4">
              Beri Tanggapan Resmi MPK: Tiket {selectedAspId}
            </h3>
            <form onSubmit={handleSaveResponse} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-['Space_Grotesk'] text-xs font-bold uppercase mb-1">
                    Nama Penjawab:
                  </label>
                  <input
                    type="text"
                    value={responderName}
                    onChange={e => setResponderName(e.target.value)}
                    className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block font-['Space_Grotesk'] text-xs font-bold uppercase mb-1">
                    Jabatan:
                  </label>
                  <input
                    type="text"
                    value={responderRole}
                    onChange={e => setResponderRole(e.target.value)}
                    className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-['Space_Grotesk'] text-xs font-bold uppercase mb-1">
                  Pernyataan Resmi: <span className="text-[#e01376]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={statement}
                  onChange={e => setStatement(e.target.value)}
                  placeholder="Tuliskan respon resmi MPK..."
                  className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl p-2.5 text-xs font-semibold resize-none"
                />
              </div>

              <div>
                <label className="block font-['Space_Grotesk'] text-xs font-bold uppercase mb-1">
                  Langkah Konkret yang Diambil:
                </label>
                <input
                  type="text"
                  value={actionTaken}
                  onChange={e => setActionTaken(e.target.value)}
                  placeholder="Misal: Nota dinas nomor 04 diserahkan ke kepala sekolah."
                  className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#111111]/20">
                <button
                  type="button"
                  onClick={() => setSelectedAspId(null)}
                  className="btn-brutal px-4 py-2 bg-white border border-[#111111] rounded-xl text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-brutal px-5 py-2 bg-[#21D99A] border-[2px] border-[#111111] rounded-xl text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
                >
                  Simpan Tanggapan Resmi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
