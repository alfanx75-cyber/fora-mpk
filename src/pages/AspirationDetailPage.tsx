import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { CATEGORIES, STATUS_MAP } from '../data/mockData';
import { CategoryIcon } from '../components/CategoryIcon';
import { FileText, Share2, User, EyeOff, Shield } from 'lucide-react';
import { AspirationStatus } from '../types';

export const AspirationDetailPage: React.FC = () => {
  const {
    aspirations,
    selectedAspirationId,
    voteAspiration,
    addComment,
    navigate,
    showToast,
    isAdmin,
    updateAspirationStatus,
  } = useAspirations();

  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentRole, setCommentRole] = useState('');

  // Find aspiration
  const aspiration = aspirations.find(a => a.id === selectedAspirationId) || aspirations[0];

  if (!aspiration) {
    return (
      <div className="w-full max-w-[1360px] mx-auto px-4 py-16 text-center">
        <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black mb-4">Aspirasi Tidak Ditemukan</h2>
        <button
          onClick={() => navigate('/aspirasi')}
          className="btn-brutal px-6 py-3 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase"
        >
          Kembali ke Daftar Aspirasi
        </button>
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === aspiration.category) || {
    id: aspiration.category,
    name: aspiration.category,
    icon: 'fasilitas',
    bgColor: '#ffd9e1',
  };

  const status = STATUS_MAP[aspiration.status] || STATUS_MAP.submitted;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(
      aspiration.id,
      commentAuthor.trim() || 'Siswa',
      commentRole.trim() || 'Siswa Aktif',
      commentText.trim()
    );
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan Disalin', `Tautan tiket ${aspiration.id} siap dibagikan.`);
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-16 pb-20 sm:pb-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2 font-['Space_Grotesk'] text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#5a3f47] mb-4 sm:mb-6 flex-wrap">
        <button onClick={() => navigate('/')} className="hover:underline hover:text-[#111111] cursor-pointer">
          Beranda
        </button>
        <span>/</span>
        <button onClick={() => navigate('/aspirasi')} className="hover:underline hover:text-[#111111] cursor-pointer">
          Aspirasi
        </button>
        <span>/</span>
        <span className="text-[#111111] font-mono font-bold truncate max-w-[180px] sm:max-w-none">
          {aspiration.id}
        </span>
      </div>

      {/* Admin Quick Action Banner (Visible when logged in) */}
      {isAdmin && (
        <div className="mb-6 bg-[#fde029] border-[2.5px] border-[#111111] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#111111] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#FFFFFF] border-[1.5px] border-[#111111] flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-[#ba1a1a]" />
            </span>
            <div>
              <span className="font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111] block">
                MODE ADMIN MPK AKTIF
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#111111]/80 font-semibold">
                Ubah status tahapan tiket ini secara langsung:
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={aspiration.status}
              onChange={e => {
                updateAspirationStatus(aspiration.id, e.target.value as AspirationStatus);
                showToast('Status Diperbarui', `Status tiket ${aspiration.id} kini: ${e.target.value.toUpperCase()}`);
              }}
              className="bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl px-3 py-1.5 font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer focus:outline-none"
            >
              <option value="submitted">01. DIKIRIM</option>
              <option value="received">02. DITERIMA</option>
              <option value="discussed">03. DIBAHAS</option>
              <option value="follow_up">04. DITINDAKLANJUTI</option>
              <option value="completed">05. SELESAI</option>
            </select>

            <button
              onClick={() => navigate('/admin')}
              className="btn-brutal px-3 py-1.5 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-bold uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
            >
              Buka Panel Admin →
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
        {/* Main Left Column: Content, Attachments, Comments */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Header Card */}
          <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111]">
            {/* Meta Category & ID Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 sm:mb-6">
              <span
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 border-[1.5px] sm:border-[2px] border-[#111111] rounded-full font-['Space_Grotesk'] text-[11px] sm:text-xs font-bold text-[#111111] shadow-[1.5px_1.5px_0px_#111111]"
                style={{ backgroundColor: category.bgColor }}
              >
                <CategoryIcon category={category.id} className="w-4 h-4" />
                <span className="uppercase">{category.name}</span>
              </span>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] sm:text-xs font-black bg-[#FCFBF5] px-2.5 sm:px-3 py-1 border-[1.5px] sm:border-[2px] border-[#111111] rounded-lg shadow-[1.5px_1.5px_0px_#111111]">
                  {aspiration.id}
                </span>
                <button
                  onClick={handleShare}
                  title="Bagikan Tautan Aspirasi"
                  className="btn-brutal p-1.5 bg-[#FFFFFF] border-[1.5px] sm:border-[2px] border-[#111111] rounded-lg shadow-[1.5px_1.5px_0px_#111111] hover:bg-[#fde029] cursor-pointer flex items-center justify-center"
                >
                  <Share2 className="w-4 h-4 text-[#111111]" />
                </button>
              </div>
            </div>

            {/* Giant Title */}
            <h1 className="font-['Space_Grotesk'] text-xl sm:text-3xl md:text-4xl font-black text-[#111111] leading-snug mb-3 sm:mb-4">
              {aspiration.title}
            </h1>

            {/* Author Strip */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 text-xs font-semibold py-2.5 sm:py-3 border-y-[2px] border-dashed border-[#111111] mb-5 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#fde029] border border-[#111111] flex items-center justify-center shrink-0 text-[#111111]">
                  {aspiration.isAnonymous ? <EyeOff className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <span className="font-['Space_Grotesk'] font-bold text-[#111111] block">
                    {aspiration.isAnonymous ? 'Anonim Terlindungi' : aspiration.authorName}
                  </span>
                  <span className="text-[#5a3f47] text-[10px] sm:text-[11px]">
                    {aspiration.isAnonymous ? 'Identitas Pelapor Dirahasiakan' : aspiration.className}
                  </span>
                </div>
              </div>
              <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] text-[#5a3f47] shrink-0">
                Diajukan: {aspiration.createdAt}
              </span>
            </div>

            {/* Full Body Description */}
            <div className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base md:text-lg text-[#111111] leading-relaxed whitespace-pre-line mb-6 sm:mb-8 font-medium">
              {aspiration.description}
            </div>

            {/* Attachments Section if present */}
            {aspiration.attachments && aspiration.attachments.length > 0 && (
              <div className="mb-6 sm:mb-8 pt-4 border-t-[2px] border-[#111111]">
                <h4 className="font-['Space_Grotesk'] text-xs uppercase font-black tracking-wider text-[#111111] mb-3 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#111111]" />
                  Lampiran & Bukti Pendukung ({aspiration.attachments.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {aspiration.attachments.map(att => (
                    <div
                      key={att.name}
                      onClick={() => showToast('Membuka Lampiran', `Melihat berkas: ${att.name}`)}
                      className="card-brutal-hover flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] cursor-pointer"
                    >
                      <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#dbe1ff] border border-[#111111] flex items-center justify-center text-[#111111] shrink-0">
                        <FileText className="w-4 h-4" />
                      </span>
                      <div className="flex flex-col overflow-hidden min-w-0">
                        <span className="font-['Space_Grotesk'] text-xs font-bold truncate text-[#111111]">
                          {att.name}
                        </span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#5a3f47]">
                          {att.size || 'Lampiran Terverifikasi'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vote Action Box */}
            <div className="p-3.5 sm:p-4 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-black text-[#111111] block">
                  Beri Dukungan untuk Aspirasi ini!
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs text-[#5a3f47]">
                  Semakin banyak dukungan siswa, semakin kuat dorongan MPK ke pihak sekolah.
                </span>
              </div>
              <button
                type="button"
                onClick={() => voteAspiration(aspiration.id)}
                className={`btn-brutal px-5 sm:px-6 py-2.5 sm:py-3 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase flex items-center justify-center gap-2 shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] cursor-pointer min-h-[42px] ${
                  aspiration.hasVoted
                    ? 'bg-[#ffd9e1] text-[#e01376]'
                    : 'bg-[#fde029] text-[#111111]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-base sm:text-lg"
                  style={{ fontVariationSettings: aspiration.hasVoted ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
                <span>{aspiration.supportCount} Dukungan</span>
              </button>
            </div>
          </div>

          {/* Student Discussion & Comments */}
          <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111]">
            <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black text-[#111111] uppercase tracking-tight mb-4 flex items-center justify-between">
              <span>Ruang Diskusi Siswa ({aspiration.comments.length})</span>
              <span className="text-[10px] sm:text-xs font-bold text-[#5a3f47]">Tertib & Sopan</span>
            </h3>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-5 sm:mb-6 space-y-2.5 sm:space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <input
                  type="text"
                  placeholder="Namamu (cth: Rara atau Siswa X)"
                  value={commentAuthor}
                  onChange={e => setCommentAuthor(e.target.value)}
                  className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0051d5]"
                />
                <input
                  type="text"
                  placeholder="Kelas / Peran (cth: XI MIPA 3)"
                  value={commentRole}
                  onChange={e => setCommentRole(e.target.value)}
                  className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0051d5]"
                />
              </div>
              <textarea
                rows={2}
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Tulis tanggapan atau masukan tambahan untuk aspirasi ini..."
                className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl p-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0051d5] resize-none"
              />
              <button
                type="submit"
                className="btn-brutal px-4 sm:px-5 py-2 sm:py-2.5 bg-[#111111] text-white border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#fde029] sm:shadow-[3px_3px_0px_#fde029] cursor-pointer min-h-[38px]"
              >
                + Kirim Komentar
              </button>
            </form>

            {/* Comments Thread */}
            {aspiration.comments.length > 0 ? (
              <div className="space-y-2.5 sm:space-y-3">
                {aspiration.comments.map(c => (
                  <div
                    key={c.id}
                    className="p-3.5 sm:p-4 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-2xl shadow-[2px_2px_0px_#111111]"
                  >
                    <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="font-['Space_Grotesk'] text-xs font-black text-[#111111]">
                          {c.author}
                        </span>
                        <span className="text-[9px] sm:text-[10px] bg-[#FFFFFF] border border-[#111111] px-1.5 py-0.5 rounded font-bold">
                          {c.roleOrClass}
                        </span>
                      </div>
                      <span className="font-['Space_Grotesk'] text-[10px] text-[#5a3f47]">
                        {c.timestamp}
                      </span>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] font-medium leading-relaxed">
                      {c.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-[#5a3f47] font-semibold border-[2px] border-dashed border-[#111111] rounded-2xl bg-[#FCFBF5]">
                Belum ada komentar. Jadilah yang pertama memberikan respon!
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Right Column: Status Journey & Official MPK Response */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Current Status Box */}
          <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-7 shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111]">
            <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#5a3f47] block mb-2">
              STATUS TERAKHIR
            </span>
            <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
              <span
                className={`border-[2px] border-[#111111] px-3 py-1 rounded-xl font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] ${status.badgeBg} ${status.textColor}`}
              >
                <span className="material-symbols-outlined text-base">{status.icon}</span>
                <span>{status.label}</span>
              </span>
              <span className="font-['Space_Grotesk'] text-xs font-bold text-[#5a3f47]">
                Tahap {status.number} / 05
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] font-semibold mb-4 leading-relaxed">
              {status.description}
            </p>

            {/* Quick Action to Status Page */}
            <button
              onClick={() => navigate('/status')}
              className="btn-brutal w-full py-2.5 sm:py-3 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] cursor-pointer min-h-[40px]"
            >
              Cek Peta Jalan Transparansi →
            </button>
          </div>

          {/* Official MPK Response Box */}
          {aspiration.mpkResponse && (
            <div className="bg-[#ffd9e1] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-7 shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="inline-flex items-center gap-1.5 bg-[#111111] text-white px-2.5 sm:px-3 py-1 rounded-lg font-['Space_Grotesk'] text-[11px] sm:text-xs font-black uppercase tracking-wider">
                  <span className="text-[#21D99A]">✓</span> RESPONS RESMI MPK
                </span>
                <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-bold text-[#111111]">
                  {aspiration.mpkResponse.date}
                </span>
              </div>

              {/* Responder Info */}
              <div className="mb-3">
                <div className="font-['Space_Grotesk'] text-sm font-black text-[#111111]">
                  {aspiration.mpkResponse.responderName}
                </div>
                <div className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-bold text-[#5a3f47]">
                  {aspiration.mpkResponse.responderRole}
                </div>
              </div>

              {/* Statement */}
              <div className="bg-[#FFFFFF] border-[2px] border-[#111111] rounded-2xl p-3.5 sm:p-4 shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] mb-3 sm:mb-4">
                <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] font-semibold italic leading-relaxed">
                  “{aspiration.mpkResponse.statement}”
                </p>
              </div>

              {/* Action Taken */}
              <div className="pt-1 sm:pt-2">
                <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-black uppercase text-[#111111] block mb-1">
                  TINDAK LANJUT NYATA:
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111] font-bold bg-[#FFFFFF]/80 p-2.5 rounded-xl border border-[#111111]">
                  {aspiration.mpkResponse.actionTaken}
                </p>
              </div>
            </div>
          )}

          {/* Timeline Visual Journey */}
          <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-7 shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111]">
            <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-black uppercase tracking-wide text-[#111111] mb-5 sm:mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-base sm:text-lg">timeline</span>
              Rekam Jejak Penanganan
            </h3>

            <div className="relative pl-6 space-y-5 sm:space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[3px] before:bg-[#111111]">
              {aspiration.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[30px] top-0 w-5 h-5 rounded-full border-[2px] border-[#111111] flex items-center justify-center text-[10px] font-bold ${
                      step.completed
                        ? 'bg-[#21D99A] text-[#111111]'
                        : step.current
                        ? 'bg-[#fde029] text-[#111111] ring-4 ring-[#fde029]/40'
                        : 'bg-[#FCFBF5] text-[#5a3f47]'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111]">
                        {step.label}
                      </span>
                      <span className="font-['Space_Grotesk'] text-[10px] text-[#5a3f47] font-bold">
                        {step.date}
                      </span>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111]/80 mt-1 font-medium">
                      {step.note}
                    </p>
                    <span className="inline-block mt-1 font-['Space_Grotesk'] text-[9px] sm:text-[10px] bg-[#FCFBF5] border border-[#111111] px-1.5 py-0.5 rounded font-extrabold text-[#5a3f47]">
                      Aktor: {step.actor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
