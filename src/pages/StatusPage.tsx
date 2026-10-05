import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { STATUS_MAP } from '../data/mockData';
import { AspirationStatus } from '../types';
import { Search, Compass, Clock, CheckCircle } from 'lucide-react';

export const StatusPage: React.FC = () => {
  const { aspirations, navigate, showToast } = useAspirations();
  const [searchTicket, setSearchTicket] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    aspirations[0]?.id || ''
  );

  const currentAspiration =
    aspirations.find(a => a.id.toLowerCase() === selectedTicketId.toLowerCase()) ||
    aspirations[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTicket.trim()) return;
    const found = aspirations.find(
      a => a.id.toLowerCase() === searchTicket.trim().toLowerCase()
    );
    if (found) {
      setSelectedTicketId(found.id);
      showToast('Tiket Ditemukan', `Memuat perjalanan aspirasi ${found.id}`);
    } else {
      showToast('Tiket Tidak Ditemukan', 'Periksa kembali nomor tiket Anda.');
    }
  };

  const stagesOrder: AspirationStatus[] = [
    'submitted',
    'received',
    'discussed',
    'follow_up',
    'completed',
  ];

  const currentStatusIndex = currentAspiration
    ? stagesOrder.indexOf(currentAspiration.status)
    : 0;

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 pb-20 sm:pb-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 bg-[#fde029] border-[2px] border-[#111111] rounded-full font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-2 sm:mb-3">
          <Search className="w-3.5 h-3.5 text-[#111111]" />
          <span>PELACAKAN TRANSPARAN</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl font-black text-[#111111] uppercase tracking-tight">
          STATUS & PROGRES<br />
          ASPIRASI SISWA
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base md:text-lg text-[#111111] font-semibold mt-2 sm:mt-3">
          Masukkan ID Tiket aspirasi untuk melihat rekam jejak, tindak lanjut komisi, dan progres advokasi.
        </p>

        {/* Ticket Search Form */}
        <form onSubmit={handleSearch} className="mt-6 sm:mt-8 flex flex-col xs:flex-row sm:flex-row gap-2 max-w-lg mx-auto">
          <input
            type="text"
            value={searchTicket}
            onChange={e => setSearchTicket(e.target.value)}
            placeholder="Masukkan ID Tiket (misal: 2026-0001)..."
            className="flex-1 bg-[#FFFFFF] border-[2px] sm:border-[3px] border-[#111111] rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 font-mono text-xs sm:text-sm md:text-base font-bold placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111]"
          />
          <button
            type="submit"
            className="btn-brutal px-5 sm:px-6 py-3 sm:py-3.5 bg-[#e01376] text-white border-[2px] sm:border-[3px] border-[#111111] rounded-xl sm:rounded-2xl font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase tracking-wider shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] cursor-pointer min-h-[44px]"
          >
            Lacak Sekarang
          </button>
        </form>
      </div>

      {/* Main Status Journey Board */}
      {currentAspiration ? (
        <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[6px_6px_0px_#111111] sm:shadow-[10px_10px_0px_#111111] mb-8 sm:mb-12">
          {/* Ticket Summary Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 sm:pb-8 border-b-[2px] sm:border-b-[3px] border-[#111111] mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="font-mono text-xs sm:text-sm font-black bg-[#fde029] border-[1.5px] sm:border-[2px] border-[#111111] px-2.5 sm:px-3 py-1 rounded-xl shadow-[1.5px_1.5px_0px_#111111]">
                  {currentAspiration.id}
                </span>
                <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-extrabold bg-[#ffd9e1] border-[1.5px] border-[#111111] px-2.5 py-1 rounded-lg">
                  {currentAspiration.category.toUpperCase()}
                </span>
              </div>
              <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl md:text-3xl font-black text-[#111111] leading-snug">
                {currentAspiration.title}
              </h2>
            </div>

            <button
              onClick={() => navigate(`/aspirasi/${currentAspiration.id}`)}
              className="btn-brutal self-start md:self-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] cursor-pointer"
            >
              Lihat Detail & Respon →
            </button>
          </div>

          {/* 5-Step Visual Journey Stepper */}
          <div className="relative mb-8 sm:mb-12">
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-2 bg-[#f0edec] border-y border-[#111111] -z-0" />
            <div
              className="hidden lg:block absolute top-7 left-12 h-2 bg-[#21D99A] border-y border-[#111111] -z-0 transition-all duration-700"
              style={{ width: `${(currentStatusIndex / 4) * 80}%` }}
            />

            <div className="relative pl-6 lg:pl-0 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-5 z-10 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-[3px] before:bg-[#111111] lg:before:hidden">
              {stagesOrder.map((stageKey, idx) => {
                const info = STATUS_MAP[stageKey];
                const isPast = idx < currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;

                return (
                  <div
                    key={stageKey}
                    className={`card-brutal-hover p-4 sm:p-5 rounded-2xl border-[2px] sm:border-[3px] border-[#111111] flex flex-col justify-between transition-all relative ${
                      isCurrent
                        ? 'bg-[#fde029] shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] scale-101 sm:scale-103'
                        : isPast
                        ? 'bg-[#21D99A]/30 shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111]'
                        : 'bg-[#FCFBF5] opacity-75 shadow-[2px_2px_0px_#111111]'
                    }`}
                  >
                    <div
                      className={`lg:hidden absolute -left-[30px] top-4 w-5 h-5 rounded-full border-[2px] border-[#111111] flex items-center justify-center text-[9px] font-black ${
                        isCurrent
                          ? 'bg-[#e01376] text-white ring-4 ring-[#e01376]/30'
                          : isPast
                          ? 'bg-[#21D99A] text-black'
                          : 'bg-white text-[#5a3f47]'
                      }`}
                    >
                      {isPast ? '✓' : idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs font-black bg-white border border-[#111111] px-2 py-0.5 rounded shadow-[1px_1px_0px_#111111]">
                          STEP {info.number}
                        </span>
                        {isCurrent && (
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e01376] opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e01376]" />
                          </span>
                        )}
                        {isPast && <span className="font-bold text-[11px] text-[#111111]">✓ SELESAI</span>}
                      </div>

                      <h4 className="font-['Space_Grotesk'] text-sm sm:text-base font-black uppercase text-[#111111] mb-1 sm:mb-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base sm:text-lg leading-none">
                          {info.icon}
                        </span>
                        <span>{info.label}</span>
                      </h4>

                      <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111]/80 font-medium leading-relaxed">
                        {info.description}
                      </p>
                    </div>

                    <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t-[1.5px] border-dashed border-[#111111] text-[10px] font-['Space_Grotesk'] font-bold text-[#5a3f47]">
                      {isCurrent ? 'SEDANG AKTIF' : isPast ? 'Tuntas Diverifikasi' : 'Menunggu Antrean'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Timeline Events for Current Ticket */}
          <div className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-2xl p-4 sm:p-6 md:p-8">
            <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-black uppercase text-[#111111] mb-4 sm:mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg sm:text-xl">history_edu</span>
              Notulen Perjalanan Aspirasi ({currentAspiration.timeline.length} Entri)
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {currentAspiration.timeline.map((evt, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 bg-white border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="w-5 h-5 rounded-full bg-[#fde029] border border-[#111111] flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-[#111111]">
                        {evt.label}
                      </span>
                      <span className="text-[9px] sm:text-[10px] bg-[#dbe1ff] border border-[#111111] px-1.5 py-0.5 rounded font-bold">
                        {evt.actor}
                      </span>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111]/80 mt-1 pl-7 font-medium">
                      {evt.note}
                    </p>
                  </div>
                  <span className="font-['Space_Grotesk'] text-[11px] font-bold text-[#5a3f47] shrink-0 sm:text-right pl-7 sm:pl-0">
                    {evt.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-8 sm:p-12 text-center shadow-[6px_6px_0px_#111111] max-w-xl mx-auto my-8">
          <div className="w-14 h-14 rounded-2xl bg-[#ffd9e1] border-[2px] border-[#111111] flex items-center justify-center mx-auto mb-4 text-[#111111] shadow-[2px_2px_0px_#111111]">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black text-[#111111] uppercase mb-2">
            BELUM ADA ASPIRASI YANG DILACAK
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium mb-6">
            Kirimkan aspirasi perdanamu untuk mendapatkan nomor ID Tiket pelacakan resmi dari MPK SMANSA!
          </p>
          <button
            onClick={() => navigate('/kirim')}
            className="btn-brutal px-6 py-3.5 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[3px_3px_0px_#111111]"
          >
            + KIRIM ASPIRASI PERDANA
          </button>
        </div>
      )}

      {/* Quick Select Other Active Tickets */}
      {aspirations.length > 0 && (
        <div>
          <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black uppercase text-[#111111] mb-3 sm:mb-4">
            Pilih Tiket Lain untuk Dilacak:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {aspirations.slice(0, 4).map(asp => (
              <div
                key={asp.id}
                onClick={() => setSelectedTicketId(asp.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border-[2px] border-[#111111] cursor-pointer transition-all ${
                  selectedTicketId === asp.id
                    ? 'bg-[#fde029] shadow-[3px_3px_0px_#111111] scale-101'
                    : 'bg-white hover:bg-[#FCFBF5] shadow-[2px_2px_0px_#111111]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-black">{asp.id}</span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-white border border-[#111111] rounded">
                    {STATUS_MAP[asp.status]?.label}
                  </span>
                </div>
                <p className="font-['Space_Grotesk'] text-xs font-bold text-[#111111] line-clamp-2">
                  {asp.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
