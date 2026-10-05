import React, { useState, useEffect, useRef } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { Inbox, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const { stats } = useAspirations();
  const [counts, setCounts] = useState({
    total: 0,
    responded: 0,
    inProgress: 0,
    completed: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          if (stats.total === 0) {
            setCounts({
              total: 0,
              responded: 0,
              inProgress: 0,
              completed: 0,
            });
            return;
          }

          const duration = 1200;
          const startTimestamp = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCounts({
              total: Math.floor(eased * stats.total),
              responded: Math.floor(eased * stats.responded),
              inProgress: Math.floor(eased * stats.inProgress),
              completed: Math.floor(eased * stats.completed),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                total: stats.total,
                responded: stats.responded,
                inProgress: stats.inProgress,
                completed: stats.completed,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, stats]);

  // Keep counts in sync if stats change after animation
  useEffect(() => {
    if (hasAnimated) {
      setCounts({
        total: stats.total,
        responded: stats.responded,
        inProgress: stats.inProgress,
        completed: stats.completed,
      });
    }
  }, [stats, hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="statistik"
      className="w-full bg-[#FCFBF5] border-b-[3px] border-[#111111] py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-block px-3 py-1 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-extrabold tracking-widest mb-2 sm:mb-3 shadow-[2px_2px_0px_#111111]">
              DATA REAL-TIME SMANSA
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-5xl font-black text-[#111111] uppercase tracking-tight">
              SEJAUH INI, KITA SUDAH DENGAR…
            </h2>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base text-[#111111] max-w-sm font-medium">
            Setiap angka adalah suara riil teman-teman yang diproses secara akuntabel dan transparan oleh MPK.
          </p>
        </div>

        {/* 4 Brutalist Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Total Masuk */}
          <div className="card-brutal-hover bg-[#ffd9e1] border-[2.5px] sm:border-[3px] border-[#111111] p-4 sm:p-5 md:p-6 rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="w-10 h-10 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <Inbox className="w-5 h-5" />
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase font-black bg-[#FFFFFF] px-2 py-0.5 border border-[#111111] rounded-md shadow-[1px_1px_0px_#111111]">
                TOTAL INBOX
              </span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight tabular-nums">
                {counts.total}
              </div>
              <div className="font-['Space_Grotesk'] text-base sm:text-lg font-black uppercase text-[#111111] tracking-tight mt-1">
                ASPIRASI MASUK
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs text-[#111111]/80 mt-1.5 sm:mt-2 font-medium">
                Dari 30 perwakilan kelas X, XI, dan XII SMANSA aktif.
              </p>
            </div>
          </div>

          {/* Card 2: Sudah Ditanggapi */}
          <div className="card-brutal-hover bg-[#fde029] border-[2.5px] sm:border-[3px] border-[#111111] p-4 sm:p-5 md:p-6 rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="w-10 h-10 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <MessageSquare className="w-5 h-5" />
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase font-black bg-[#FFFFFF] px-2 py-0.5 border border-[#111111] rounded-md shadow-[1px_1px_0px_#111111]">
                RESPON MPK
              </span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight tabular-nums">
                {counts.responded}
              </div>
              <div className="font-['Space_Grotesk'] text-base sm:text-lg font-black uppercase text-[#111111] tracking-tight mt-1">
                SUDAH DITANGGAPI
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs text-[#111111]/80 mt-1.5 sm:mt-2 font-medium">
                Verifikasi & respon awal oleh tim MPK.
              </p>
            </div>
          </div>

          {/* Card 3: Sedang Diproses */}
          <div className="card-brutal-hover bg-[#dbe1ff] border-[2.5px] sm:border-[3px] border-[#111111] p-4 sm:p-5 md:p-6 rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="w-10 h-10 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <Clock className="w-5 h-5" />
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase font-black bg-[#FFFFFF] px-2 py-0.5 border border-[#111111] rounded-md shadow-[1px_1px_0px_#111111]">
                ON GOING
              </span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight tabular-nums">
                {counts.inProgress}
              </div>
              <div className="font-['Space_Grotesk'] text-base sm:text-lg font-black uppercase text-[#111111] tracking-tight mt-1">
                SEDANG DIPROSES
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs text-[#111111]/80 mt-1.5 sm:mt-2 font-medium">
                Sedang dibahas dalam sidang atau nota dinas.
              </p>
            </div>
          </div>

          {/* Card 4: Selesai */}
          <div className="card-brutal-hover bg-[#21D99A]/40 border-[2.5px] sm:border-[3px] border-[#111111] p-4 sm:p-5 md:p-6 rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="w-10 h-10 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase font-black bg-[#FFFFFF] px-2 py-0.5 border border-[#111111] rounded-md shadow-[1px_1px_0px_#111111]">
                TEREKSEKUSI
              </span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight tabular-nums">
                {counts.completed}
              </div>
              <div className="font-['Space_Grotesk'] text-base sm:text-lg font-black uppercase text-[#111111] tracking-tight mt-1">
                SELESAI
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs text-[#111111]/80 mt-1.5 sm:mt-2 font-medium">
                Terealisasi nyata menjadi kebijakan/fasilitas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
