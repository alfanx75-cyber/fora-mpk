import React from 'react';
import { useAspirations } from '../context/AspirationContext';
import { Inbox, MessageSquare, Clock, CheckCircle2, RotateCw, AlertTriangle } from 'lucide-react';

export const StatisticsSection: React.FC = () => {
  const { stats, statsStatus, refreshStats } = useAspirations();

  const isError = statsStatus === 'error';
  const isLoading = statsStatus === 'loading';

  return (
    <section
      id="statistik"
      className="w-full bg-[#FCFBF5] border-y-[3px] border-[#111111] py-10 sm:py-14 md:py-16"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header: Ringkas judul bagian menjadi "SUARA DALAM ANGKA" */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b-[2px] border-[#111111]/20">
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-md font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-extrabold tracking-wider mb-1.5 shadow-[1.5px_1.5px_0px_#111111]">
              DATA REALTIME TINGKAT SEKOLAH
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tight">
              SUARA DALAM ANGKA
            </h2>
          </div>

          {/* Status Indicator & Retry Action */}
          <div className="flex items-center gap-2">
            {isError ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-1 border border-[#ba1a1a] rounded-lg">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Gagal Memuat
                </span>
                <button
                  onClick={refreshStats}
                  className="btn-brutal inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 bg-white border border-[#111111] rounded-lg hover:bg-[#fde029] cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  Coba Lagi
                </button>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFFFF] border border-[#111111] rounded-full text-[11px] font-['Space_Grotesk'] font-bold shadow-[1px_1px_0px_#111111]">
                <span className="w-2 h-2 rounded-full bg-[#21D99A] animate-pulse" />
                <span className="text-[#111111]">Sinkron Realtime</span>
              </div>
            )}
          </div>
        </div>

        {/* 4 Cards Bento Grid: Warna-warni, border hitam, ikon, angka besar, hard shadow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Aspirasi Masuk */}
          <div className="card-brutal-hover bg-[#ffd9e1] border-[2.5px] sm:border-[3px] border-[#111111] p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[5px_5px_0px_#111111] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="w-11 h-11 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <Inbox className="w-5 h-5" />
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] font-black uppercase bg-[#FFFFFF] px-2 py-0.5 border border-[#111111] rounded shadow-[1px_1px_0px_#111111]">
                TOTAL
              </span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight tabular-nums">
                {isError ? '—' : isLoading ? '...' : stats.total}
              </div>
              <div className="font-['Space_Grotesk'] text-sm sm:text-base font-black uppercase text-[#111111] tracking-tight mt-1">
                Aspirasi Masuk
              </div>
            </div>
          </div>

          {/* Card 2: Sudah Ditanggapi */}
          <div className="card-brutal-hover bg-[#fde029] border-[2.5px] sm:border-[3px] border-[#111111] p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[5px_5px_0px_#111111] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="w-11 h-11 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <MessageSquare className="w-5 h-5" />
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] font-black uppercase bg-[#FFFFFF] px-2 py-0.5 border border-[#111111] rounded shadow-[1px_1px_0px_#111111]">
                RESPON RESMI
              </span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight tabular-nums">
                {isError ? '—' : isLoading ? '...' : stats.responded}
              </div>
              <div className="font-['Space_Grotesk'] text-sm sm:text-base font-black uppercase text-[#111111] tracking-tight mt-1">
                Sudah Ditanggapi
              </div>
            </div>
          </div>

          {/* Card 3: Sedang Diproses */}
          <div className="card-brutal-hover bg-[#dbe1ff] border-[2.5px] sm:border-[3px] border-[#111111] p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[5px_5px_0px_#111111] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="w-11 h-11 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <Clock className="w-5 h-5" />
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] font-black uppercase bg-[#FFFFFF] px-2 py-0.5 border border-[#111111] rounded shadow-[1px_1px_0px_#111111]">
                PROSES
              </span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight tabular-nums">
                {isError ? '—' : isLoading ? '...' : stats.inProgress}
              </div>
              <div className="font-['Space_Grotesk'] text-sm sm:text-base font-black uppercase text-[#111111] tracking-tight mt-1">
                Sedang Diproses
              </div>
            </div>
          </div>

          {/* Card 4: Selesai */}
          <div className="card-brutal-hover bg-[#21D99A]/40 border-[2.5px] sm:border-[3px] border-[#111111] p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[5px_5px_0px_#111111] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="w-11 h-11 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] font-black uppercase bg-[#FFFFFF] px-2 py-0.5 border border-[#111111] rounded shadow-[1px_1px_0px_#111111]">
                TUNTAS
              </span>
            </div>
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight tabular-nums">
                {isError ? '—' : isLoading ? '...' : stats.completed}
              </div>
              <div className="font-['Space_Grotesk'] text-sm sm:text-base font-black uppercase text-[#111111] tracking-tight mt-1">
                Selesai
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
