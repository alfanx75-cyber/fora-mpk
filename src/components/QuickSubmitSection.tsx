import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { CATEGORIES } from '../data/mockData';
import { AspirationCategory } from '../types';
import { Send, CheckCircle2 } from 'lucide-react';

export const QuickSubmitSection: React.FC = () => {
  const { addAspiration, navigate } = useAspirations();
  const [category, setCategory] = useState<AspirationCategory>('fasilitas');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('Judul aspirasi wajib diisi');
      return;
    }
    if (!description.trim()) {
      setValidationError('Ceritakan detail aspirasimu secara jelas');
      return;
    }

    setValidationError('');
    const newAsp = addAspiration({
      title: title.trim(),
      description: description.trim(),
      category,
      authorName: isAnonymous ? 'Anonim' : (name.trim() || 'Siswa'),
      className: isAnonymous ? 'Rahasia' : (className.trim() || 'Umum'),
      isAnonymous,
    });

    setSubmittedTicketId(newAsp.id);
    setTitle('');
    setDescription('');
    setName('');
    setClassName('');
  };

  return (
    <section id="kirim-aspirasi-box" className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
      <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl shadow-[5px_5px_0px_#111111] sm:shadow-[10px_10px_0px_#111111] p-5 sm:p-10 md:p-14 relative overflow-hidden">
        <div className="hidden sm:block absolute -right-8 -bottom-10 select-none pointer-events-none opacity-5 font-['Space_Grotesk'] text-[160px] md:text-[240px] font-black text-[#111111] leading-none">
          VOICE
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center relative z-10">
          {/* Left: Headline & Pitch */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div
              className="animate-float-slow inline-block px-3 sm:px-3.5 py-1 sm:py-1.5 bg-[#e01376] text-white border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-3 sm:mb-4"
              style={{ '--rot': '-2deg' } as React.CSSProperties}
            >
              SUARAKAN PERUBAHAN
            </div>

            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight mb-3 sm:mb-4">
              ADA YANG MAU<br />
              KAMU UBAH?
            </h2>

            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base md:text-lg text-[#111111] font-medium mb-4 sm:mb-6 leading-relaxed">
              Jangan cuma dibicarakan di grup kelas. Kritik fasilitas, usulan menu kantin, keluhan tugas, atau apresiasi guru—tulis sekarang, boleh sebut nama atau anonim sepenuhnya.
            </p>

            <div className="flex flex-col gap-2.5 sm:gap-3 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold text-[#111111]">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="w-5 h-5 rounded-md bg-[#21D99A] border-[1.5px] border-[#111111] flex items-center justify-center font-black text-xs shrink-0">
                  ✓
                </span>
                <span>Identitas NISN dan nama terlindungi sistem enkripsi</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="w-5 h-5 rounded-md bg-[#21D99A] border-[1.5px] border-[#111111] flex items-center justify-center font-black text-xs shrink-0">
                  ✓
                </span>
                <span>Akses notifikasi status langsung via ID Tiket publik</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="w-5 h-5 rounded-md bg-[#21D99A] border-[1.5px] border-[#111111] flex items-center justify-center font-black text-xs shrink-0">
                  ✓
                </span>
                <span>Bebas intimidasi sesuai pakta integritas MPK</span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/kirim')}
                className="btn-brutal text-xs sm:text-sm font-['Space_Grotesk'] font-black uppercase underline decoration-[3px] decoration-[#e01376] hover:text-[#e01376] transition-colors py-1 cursor-pointer"
              >
                Buka Form Lengkap dengan Lampiran File →
              </button>
            </div>
          </div>

          {/* Right: Quick Neo-Brutalist Form Card */}
          <div className="lg:col-span-6 bg-[#FCFBF5] border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
              <div>
                <label className="block font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-extrabold tracking-wider text-[#111111] mb-1.5 sm:mb-2">
                  Kategori Aspirasi
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as AspirationCategory)}
                  className="w-full bg-[#FFFFFF] border-[2px] sm:border-[3px] border-[#111111] rounded-xl px-3.5 py-2.5 sm:py-3 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111]"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-extrabold tracking-wider text-[#111111] mb-1.5 sm:mb-2">
                  Judul Singkat Suaramu
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Contoh: Lampu toilet lantai 2 gedung barat mati"
                  className="w-full bg-[#FFFFFF] border-[2px] sm:border-[3px] border-[#111111] rounded-xl px-3.5 py-2.5 sm:py-3 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-medium text-[#111111] placeholder:text-[#5a3f47]/60 focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111]"
                />
              </div>

              <div>
                <label className="block font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-extrabold tracking-wider text-[#111111] mb-1.5 sm:mb-2">
                  Isi Aspirasi & Solusi yang Diusulkan
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Ceritakan detail lokasi, kendala, atau ide solusimu selengkap mungkin..."
                  className="w-full bg-[#FFFFFF] border-[2px] sm:border-[3px] border-[#111111] rounded-xl p-3 sm:p-3.5 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-medium text-[#111111] placeholder:text-[#5a3f47]/60 focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111] resize-none"
                />
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center gap-2 sm:gap-2.5 pt-0.5">
                <input
                  type="checkbox"
                  id="quick-anon-check"
                  checked={isAnonymous}
                  onChange={e => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded border-[2px] border-[#111111] text-[#e01376] focus:ring-0 cursor-pointer accent-[#e01376]"
                />
                <label
                  htmlFor="quick-anon-check"
                  className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-bold text-[#111111] cursor-pointer select-none"
                >
                  Kirim sebagai Anonim (Nama dan kelas disembunyikan dari publik)
                </label>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Kelas (cth: XI MIPA 1)"
                      value={className}
                      onChange={e => setClassName(e.target.value)}
                      className="w-full bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                  </div>
                </div>
              )}

              {validationError && (
                <div className="bg-[#ffdad6] border-[2px] border-[#111111] text-[#ba1a1a] px-3 py-2 rounded-xl text-xs font-bold">
                  {validationError}
                </div>
              )}

              <button
                type="submit"
                className="btn-brutal mt-1.5 w-full flex items-center justify-center gap-2 bg-[#e01376] hover:bg-[#b5005d] text-white border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl py-3.5 sm:py-4 font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] cursor-pointer min-h-[46px]"
              >
                <Send className="w-4 h-4" />
                <span>+ KIRIM ASPIRASI SEKARANG</span>
              </button>
            </form>

            {/* Success Notification Alert */}
            {submittedTicketId && (
              <div className="mt-4 bg-[#21D99A] border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl p-3.5 sm:p-4 text-center shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] animate-[popStamp_0.3s_ease_forwards]">
                <div className="flex items-center justify-center gap-1.5 font-['Space_Grotesk'] text-base sm:text-lg font-black text-[#111111]">
                  <CheckCircle2 className="w-5 h-5 text-[#111111]" />
                  <span>ASPIRASI BERHASIL DIKIRIM</span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111] font-bold mt-1">
                  Nomor Tiketmu:{' '}
                  <span className="font-mono underline font-extrabold text-[#111111]">
                    {submittedTicketId}
                  </span>
                  . Komisi terkait akan meninjau dalam 1x24 jam.
                </p>
                <div className="mt-3 flex flex-col xs:flex-row justify-center gap-2">
                  <button
                    onClick={() => navigate(`/aspirasi/${submittedTicketId}`)}
                    className="btn-brutal px-3.5 py-2 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-extrabold uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
                  >
                    Lihat Status Tiket →
                  </button>
                  <button
                    onClick={() => setSubmittedTicketId(null)}
                    className="btn-brutal px-3 py-2 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-extrabold uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
