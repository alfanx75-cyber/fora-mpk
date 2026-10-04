import React, { useState, useRef } from 'react';
import { useAspirations } from '../context/AspirationContext';

export const HeroSection: React.FC = () => {
  const { navigate, showToast } = useAspirations();
  const [heroLikes, setHeroLikes] = useState(142);
  const [heroLiked, setHeroLiked] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 8;
    const rotY = (x / rect.width) * 8;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(4px)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    });
  };

  const toggleHeroLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!heroLiked) {
      setHeroLikes(prev => prev + 1);
      setHeroLiked(true);
      showToast('Dukungan Dicatat! ❤️', 'Kamu mendukung aspirasi bangku halte & koridor.');
    } else {
      setHeroLikes(prev => prev - 1);
      setHeroLiked(false);
    }
  };

  return (
    <section className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 md:pt-14 pb-12 sm:pb-16 md:pb-24 overflow-hidden">
      {/* Decorative Floating Geometry & Stickers (Carefully gated for mobile) */}
      <div
        className="animate-float-slow absolute -top-4 right-8 md:right-32 w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#316bf3] border-[3px] border-[#111111] -z-10 shadow-[4px_4px_0px_#111111] hidden md:block"
        style={{ '--rot': '0deg' } as React.CSSProperties}
      />

      <div
        onClick={() => showToast('Keamanan Terjamin 🛡️', 'Fitur anonimitas FORA 100% terjaga dengan enkripsi internal.')}
        className="animate-float-mid hidden md:flex absolute top-40 left-2 bg-[#fde029] border-[3px] border-[#111111] px-3.5 py-1.5 rounded-xl shadow-[4px_4px_0px_#111111] items-center gap-2 z-20 select-none cursor-pointer hover:rotate-3 transition-transform"
        style={{ '--rot': '-10deg' } as React.CSSProperties}
      >
        <span className="text-lg">⭐</span>
        <span className="font-['Space_Grotesk'] text-xs font-extrabold uppercase text-[#111111] tracking-wider">
          100% ANONIM AMAN
        </span>
      </div>

      <div
        className="animate-float-slow hidden xl:block absolute bottom-12 left-1/3 bg-[#ffd9e1] border-[3px] border-[#111111] px-5 py-1.5 rounded-full shadow-[4px_4px_0px_#111111] font-['Space_Grotesk'] text-xs font-black text-[#111111] z-10 select-none"
        style={{ '--rot': '4deg' } as React.CSSProperties}
      >
        ⚡ NO SENSOR • LANGSUNG KE WAKASEK & KEPSEK
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Bold Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Identity Pill */}
          <div className="inline-flex items-center gap-2 bg-[#FFFFFF] px-3 sm:px-4 py-1.5 border-[2px] sm:border-[3px] border-[#111111] rounded-full shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] mb-4 sm:mb-6 max-w-full">
            <div className="relative flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#21D99A]" />
              <span className="absolute w-3 h-3 rounded-full bg-[#21D99A] animate-ping" />
            </div>
            <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs font-black text-[#111111] uppercase tracking-wider truncate">
              ⚡ FORUM ASPIRASI MPK 2026 • RESMI & INDEPENDEN
            </span>
          </div>

          {/* Giant Bold Typography Headline - Scaled specifically for 320px–768px screens */}
          <h1 className="font-['Space_Grotesk'] text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] text-[#111111] font-black tracking-tighter uppercase mb-4 sm:mb-6">
            SUARAMU.<br />
            DIDENGAR.<br />
            <span className="relative inline-block mt-1 sm:mt-2 px-3 sm:px-4 py-1 bg-[#e01376] text-[#FFFFFF] border-[2px] sm:border-[3px] border-[#111111] rounded-xl shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] -rotate-1 hover:rotate-0 transition-transform">
              BERGERAK.
            </span>
          </h1>

          {/* Supporting Pitch */}
          <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base md:text-lg text-[#111111] font-medium max-w-xl mb-6 sm:mb-8 leading-relaxed">
            Punya ide, kritik, fasilitas rusak, atau sesuatu yang perlu dibenahi? Kirim langsung ke MPK. Pantau real-time, lihat prosesnya sampai dieksekusi sekolah.
          </p>

          {/* CTA Cluster */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/kirim')}
              className="btn-brutal w-full sm:w-auto flex items-center justify-center gap-2 bg-[#fde029] hover:bg-[#ffe340] text-[#111111] px-6 sm:px-8 py-3.5 sm:py-4 border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl font-['Space_Grotesk'] text-xs sm:text-sm md:text-base font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] sm:shadow-[5px_5px_0px_#111111] cursor-pointer min-h-[48px]"
            >
              <span>+ KIRIM ASPIRASI SEKARANG</span>
              <span className="material-symbols-outlined text-lg sm:text-xl">arrow_forward</span>
            </button>

            <button
              onClick={() => navigate('/aspirasi')}
              className="btn-brutal w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#f0edec] text-[#111111] px-5 sm:px-6 py-3.5 sm:py-4 border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl font-['Space_Grotesk'] text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider shadow-[3px_3px_0px_#111111] sm:shadow-[5px_5px_0px_#111111] cursor-pointer min-h-[48px]"
            >
              <span>JELAJAHI ASPIRASI</span>
              <span className="material-symbols-outlined text-lg sm:text-xl">explore</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3">
            <div className="flex -space-x-2 shrink-0">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#fde029] border-[2px] border-[#111111] flex items-center justify-center text-xs font-black font-['Space_Grotesk'] shadow-[1px_1px_0px_#111111]">
                X
              </span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ffd9e1] border-[2px] border-[#111111] flex items-center justify-center text-xs font-black font-['Space_Grotesk'] shadow-[1px_1px_0px_#111111]">
                XI
              </span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#21D99A] border-[2px] border-[#111111] flex items-center justify-center text-xs font-black font-['Space_Grotesk'] shadow-[1px_1px_0px_#111111]">
                XII
              </span>
            </div>
            <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs text-[#111111] font-extrabold uppercase tracking-wider">
              Didukung oleh 1,280+ Siswa Aktif di 36 Kelas
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Browser Window Card */}
        <div
          ref={cardContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-5 relative mt-4 lg:mt-0 w-full"
        >
          {/* Trending Ribbon Tag */}
          <div
            onClick={() => showToast('Trending Pekan Ini 🔥', 'Topik fasilitas halte & wifi paling banyak didukung!')}
            className="animate-float-mid absolute -top-3.5 right-2 sm:-right-2 bg-[#FF7A30] text-white border-[2px] sm:border-[3px] border-[#111111] px-2.5 sm:px-3.5 py-1 rounded-xl font-['Space_Grotesk'] text-[10px] sm:text-xs font-black uppercase shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] z-20 select-none cursor-pointer"
            style={{ '--rot': '6deg' } as React.CSSProperties}
          >
            🔥 TOP DISKUSI
          </div>

          <div
            style={tiltStyle}
            className="w-full bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] overflow-hidden transition-transform duration-150 ease-out"
          >
            {/* Browser Header Bar */}
            <div className="bg-[#f0edec] border-b-[2px] sm:border-b-[3px] border-[#111111] px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#111111] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#111111] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#111111] inline-block" />
                <span className="ml-1 sm:ml-2 font-['Space_Grotesk'] text-[11px] sm:text-xs text-[#111111] uppercase font-black">
                  NOW LISTENING
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#21D99A]/30 px-2 py-0.5 border border-[#111111] rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#21D99A] animate-ping" />
                <span className="font-['Space_Grotesk'] text-[9px] sm:text-[10px] font-black uppercase text-[#111111]">
                  LIVE FORUM
                </span>
              </div>
            </div>

            {/* Inner Window Content */}
            <div className="p-4 sm:p-6 md:p-7 flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#ffd9e1] px-2.5 py-1 border-[1.5px] sm:border-[2px] border-[#111111] rounded-full font-['Space_Grotesk'] text-[11px] sm:text-xs text-[#111111] font-bold">
                  <span>🏫</span> FASILITAS SEKOLAH
                </span>
                <span className="bg-[#fde029] text-[#111111] border-[1.5px] sm:border-[2px] border-[#111111] px-2 py-0.5 rounded-md font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-black uppercase tracking-wide">
                  [ DIBAHAS OLEH MPK ]
                </span>
              </div>

              {/* Headline Quote */}
              <p
                onClick={() => navigate('/aspirasi/MPK-2026-8849')}
                className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#111111] leading-snug tracking-tight hover:text-[#e01376] cursor-pointer transition-colors"
              >
                “Bisa nggak halte sekolah dan koridor lab ditambah tempat duduk?”
              </p>

              <div className="flex items-center justify-between text-[#111111] border-b-[2px] border-dashed border-[#111111] pb-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">person</span>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold">
                    Siswa Kelas XI MIPA
                  </span>
                </div>
                <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] text-[#5a3f47] font-bold">
                  18 MENIT LALU
                </span>
              </div>

              {/* Progress Meter */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-['Space_Grotesk'] text-[11px] sm:text-xs font-extrabold uppercase">
                  <span>Tahap Kawalan</span>
                  <span className="text-[#0051d5]">65% (Draf Disiapkan)</span>
                </div>
                <div className="w-full h-3 bg-[#f0edec] border-[2px] border-[#111111] rounded-full overflow-hidden p-[1px]">
                  <div className="h-full bg-[#fde029] border-r-[2px] border-[#111111] rounded-full w-[65%]" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={toggleHeroLike}
                  className={`btn-brutal flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs uppercase font-extrabold shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] cursor-pointer transition-colors min-h-[44px] ${
                    heroLiked ? 'bg-[#ffd9e1] text-[#e01376]' : 'bg-[#FFFFFF] text-[#111111]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: heroLiked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                  <span>{heroLikes}</span>
                  <span>Dukungan</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/status')}
                  className="btn-brutal flex-1 flex items-center justify-center gap-1.5 bg-[#316bf3] text-white px-3 sm:px-4 py-2.5 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs uppercase font-extrabold shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] cursor-pointer min-h-[44px]"
                >
                  <span className="material-symbols-outlined text-base">route</span>
                  <span>Lacak Proses</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
