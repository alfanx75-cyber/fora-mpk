import React, { useState, useEffect } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { STATUS_MAP, SCHOOL_NAME } from '../data/mockData';
import { Aspiration, AspirationStatus } from '../types';
import {
  Search,
  Lock,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  KeyRound,
  FileCheck
} from 'lucide-react';

export const StatusPage: React.FC = () => {
  const { lookupAspiration, navigate } = useAspirations();

  // Search Form Inputs
  const [ticketInput, setTicketInput] = useState('');
  const [secretKeyInput, setSecretKeyInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Verified Tracking Data (Single Private Ticket)
  const [trackedAspiration, setTrackedAspiration] = useState<Aspiration | null>(null);

  // Check if sender just arrived from successful submission
  useEffect(() => {
    const savedId = sessionStorage.getItem('fora_last_ticket_id');
    const savedKey = sessionStorage.getItem('fora_last_access_key');
    if (savedId && savedKey) {
      setTicketInput(savedId);
      setSecretKeyInput(savedKey);
      performLookup(savedId, savedKey);
    }
  }, []);

  const performLookup = async (id: string, key: string) => {
    setErrorMessage(null);
    setIsVerifying(true);

    const res = await lookupAspiration(id, key);
    setIsVerifying(false);

    if (res.success && res.data) {
      setTrackedAspiration(res.data);
      setErrorMessage(null);
    } else {
      setTrackedAspiration(null);
      setErrorMessage(res.error || 'Akses ditolak. Nomor tiket atau kode akses rahasia tidak sesuai.');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim() || !secretKeyInput.trim()) {
      setErrorMessage('Wajib memasukkan Nomor Referensi DAN Kode Akses Rahasia.');
      return;
    }
    performLookup(ticketInput, secretKeyInput);
  };

  const handleReset = () => {
    setTrackedAspiration(null);
    setTicketInput('');
    setSecretKeyInput('');
    setErrorMessage(null);
    sessionStorage.removeItem('fora_last_ticket_id');
    sessionStorage.removeItem('fora_last_access_key');
  };

  const stagesOrder: AspirationStatus[] = [
    'submitted',
    'received',
    'discussed',
    'follow_up',
    'completed',
  ];

  const currentStatusIndex = trackedAspiration
    ? stagesOrder.indexOf(trackedAspiration.status)
    : 0;

  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 pb-20 sm:pb-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fde029] border-[2px] border-[#111111] rounded-full font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-2 sm:mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" />
          <span>PELACAKAN PRIVAT TERENKRIPSI</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl font-black text-[#111111] uppercase tracking-tight">
          LACAK STATUS ASPIRASI
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base text-[#111111] font-semibold mt-2 sm:mt-3">
          Untuk menjaga privasi seluruh siswa, pelacakan mewajibkan verifikasi ganda: Nomor Referensi Tiket dan Kode Akses Rahasia.
        </p>
      </div>

      {/* When NO ticket is loaded: Search / Login Form */}
      {!trackedAspiration ? (
        <div className="max-w-lg mx-auto bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111]">
          <form onSubmit={handleSearch} className="space-y-4 sm:space-y-5">
            {/* 1. Reference Ticket ID */}
            <div>
              <label className="block font-['Space_Grotesk'] text-xs uppercase font-black text-[#111111] mb-1.5">
                Nomor Referensi (ID Tiket) <span className="text-[#e01376]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={ticketInput}
                  onChange={e => setTicketInput(e.target.value)}
                  placeholder="Contoh: 2026-0001"
                  className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3.5 py-3 font-mono text-sm sm:text-base font-bold text-[#111111] placeholder:font-sans placeholder:text-[#5a3f47]/50 focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111]"
                />
              </div>
            </div>

            {/* 2. Secret Access Key */}
            <div>
              <label className="block font-['Space_Grotesk'] text-xs uppercase font-black text-[#111111] mb-1.5">
                Kode Akses Rahasia <span className="text-[#e01376]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={secretKeyInput}
                  onChange={e => setSecretKeyInput(e.target.value)}
                  placeholder="Contoh: FORA-XXXX-XXXX"
                  className="w-full bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-3.5 py-3 font-mono text-sm sm:text-base font-bold text-[#111111] placeholder:font-sans placeholder:text-[#5a3f47]/50 focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111]"
                />
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#5a3f47] mt-1.5">
                Kode yang didapatkan pada bukti penerimaan saat aspirasi selesai dikirim.
              </p>
            </div>

            {/* Error Notice */}
            {errorMessage && (
              <div className="p-3 bg-[#ffdad6] border-[2px] border-[#ba1a1a] rounded-xl flex items-start gap-2 text-xs font-bold text-[#ba1a1a] animate-[popModal_0.2s_ease-out_forwards]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Verification Button */}
            <button
              type="submit"
              disabled={isVerifying}
              className="btn-brutal w-full py-3.5 bg-[#e01376] hover:bg-[#b5005d] text-white border-[2.5px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 min-h-[48px]"
            >
              {isVerifying ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>MEMVERIFIKASI AKSES ENKRIPSI...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>VERIFIKASI & BUKA STATUS</span>
                </>
              )}
            </button>
          </form>

          {/* Prompt to Submit if don't have code */}
          <div className="mt-6 pt-4 border-t border-[#111111]/20 text-center">
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#5a3f47] block mb-2">
              Belum pernah mengirim aspirasi ke MPK {SCHOOL_NAME}?
            </span>
            <button
              onClick={() => navigate('/kirim')}
              className="btn-brutal px-4 py-2 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
            >
              + Kirim Aspirasi Sekarang
            </button>
          </div>
        </div>
      ) : (
        /* Verified Private Journey Board */
        <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 md:p-10 shadow-[6px_6px_0px_#111111] sm:shadow-[10px_10px_0px_#111111] animate-[popModal_0.3s_ease-out_forwards]">
          {/* Header Strip: Reference ID, Status, and Reset Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b-[2.5px] border-[#111111] mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="font-mono text-xs sm:text-sm font-black bg-[#fde029] border-[2px] border-[#111111] px-3 py-1 rounded-xl shadow-[1.5px_1.5px_0px_#111111]">
                  TIKET: {trackedAspiration.id}
                </span>
                <span
                  className="font-['Space_Grotesk'] text-xs font-black uppercase px-3 py-1 border-[2px] border-[#111111] rounded-xl"
                  style={{ backgroundColor: STATUS_MAP[trackedAspiration.status]?.color || '#fde029' }}
                >
                  {STATUS_MAP[trackedAspiration.status]?.label}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-['Space_Grotesk'] text-[#5a3f47]">
                <Clock className="w-3.5 h-3.5" />
                <span>Pembaruan Terakhir: {trackedAspiration.updatedAt}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="btn-brutal self-start sm:self-auto px-4 py-2 bg-[#FCFBF5] hover:bg-[#f0edec] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
            >
              Lacak Tiket Lain
            </button>
          </div>

          {/* Safe Process Note for Sender (Requirement 5) */}
          <div className="p-4 sm:p-5 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-2xl mb-8 shadow-[2px_2px_0px_#111111]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e01376]" />
              <span className="font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111]">
                KETERANGAN PROSES DARI KOMISI MPK:
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] font-semibold leading-relaxed">
              {trackedAspiration.senderProcessNote ||
                'Aspirasimu sedang dalam antrean verifikasi Komisi 3 (KOASITER) MPK.'}
            </p>
          </div>

          {/* 5-Step Visual Stepper: DIKIRIM -> DITERIMA -> DIBAHAS -> DITINDAKLANJUTI -> SELESAI */}
          <div className="mb-8 sm:mb-10">
            <h3 className="font-['Space_Grotesk'] text-xs sm:text-sm uppercase font-black tracking-wider text-[#5a3f47] mb-4">
              TAHAPAN PERJALANAN ADVOKASI:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4">
              {stagesOrder.map((stageKey, idx) => {
                const info = STATUS_MAP[stageKey];
                const isPast = idx < currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;

                return (
                  <div
                    key={stageKey}
                    className={`p-3.5 sm:p-4 rounded-2xl border-[2px] sm:border-[2.5px] border-[#111111] flex flex-col justify-between transition-all relative ${
                      isCurrent
                        ? 'bg-[#fde029] shadow-[4px_4px_0px_#111111] scale-102'
                        : isPast
                        ? 'bg-[#21D99A]/30 shadow-[2px_2px_0px_#111111]'
                        : 'bg-[#FCFBF5] opacity-70 shadow-[1px_1px_0px_#111111]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-['Space_Grotesk'] text-[10px] font-black bg-white border border-[#111111] px-1.5 py-0.5 rounded shadow-[1px_1px_0px_#111111]">
                          0{idx + 1}
                        </span>
                        {isCurrent && (
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e01376] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#e01376]" />
                          </span>
                        )}
                        {isPast && <span className="text-[10px] font-black text-[#00875a]">✓ SELESAI</span>}
                      </div>

                      <h4 className="font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase text-[#111111]">
                        {info.label}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#111111]/20 text-[10px] font-['Space_Grotesk'] font-bold text-[#5a3f47]">
                      {isCurrent ? 'STATUS SAAT INI' : isPast ? 'Tuntas Dilewati' : 'Menunggu Giliran'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Events Notulen */}
          <div>
            <h3 className="font-['Space_Grotesk'] text-xs sm:text-sm uppercase font-black tracking-wider text-[#5a3f47] mb-3">
              LOG PERJALANAN RESMI:
            </h3>

            <div className="space-y-2.5">
              {trackedAspiration.timeline.map((evt, idx) => (
                <div
                  key={idx}
                  className={`p-3 sm:p-3.5 rounded-xl border-[2px] border-[#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    evt.current
                      ? 'bg-[#ffd9e1] shadow-[3px_3px_0px_#111111]'
                      : evt.completed
                      ? 'bg-white shadow-[2px_2px_0px_#111111]'
                      : 'bg-[#FCFBF5]/60 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white border border-[#111111] flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-[#111111] block">
                        {evt.label}
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111]/80 font-medium block">
                        {evt.note}
                      </span>
                    </div>
                  </div>
                  <span className="font-['Space_Grotesk'] text-[11px] font-bold text-[#5a3f47] shrink-0 pl-7 sm:pl-0">
                    {evt.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Official MPK Response Statement (If verified) */}
          {trackedAspiration.mpkResponse && trackedAspiration.mpkResponse.statement && (
            <div className="mt-8 p-5 bg-[#fde029]/20 border-[2.5px] border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111]">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="w-4 h-4 text-[#e01376]" />
                <span className="font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111]">
                  TANGGAPAN RESMI MPK:
                </span>
                <span className="text-[10px] bg-[#21D99A] border border-[#111111] px-1.5 py-0.2 rounded font-bold">
                  VERIFIKASI RESMI
                </span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] font-medium leading-relaxed mb-3">
                “{trackedAspiration.mpkResponse.statement}”
              </p>
              <div className="text-[11px] font-['Space_Grotesk'] font-bold text-[#5a3f47]">
                Oleh: {trackedAspiration.mpkResponse.responderName} ({trackedAspiration.mpkResponse.responderRole}) • {trackedAspiration.mpkResponse.date}
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div className="mt-8 pt-4 border-t border-[#111111]/20 flex items-center justify-between text-[11px] font-['Space_Grotesk'] text-[#5a3f47]">
            <span>Privasi Terjaga: Identitas dan isi kiriman tidak dipublikasikan ke publik.</span>
            <button
              onClick={handleReset}
              className="text-[#0051d5] font-bold hover:underline cursor-pointer"
            >
              Selesai Melacak
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
