import React from 'react';
import { Send, KeyRound, CheckCircle2 } from 'lucide-react';
import { useAspirations } from '../context/AspirationContext';

export const ThreeStepsSection: React.FC = () => {
  const { navigate } = useAspirations();

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-block px-3 py-1 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-extrabold tracking-wider mb-2 shadow-[2px_2px_0px_#111111]">
          CARA KERJA FORA
        </div>
        <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight">
          TIGA LANGKAH MUDAH
        </h2>
        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base text-[#111111] font-semibold mt-2">
          Kirim aspirasi · Simpan kode · Pantau proses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Step 1: Kirim aspirasi */}
        <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-6 sm:p-7 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-12 h-12 rounded-2xl bg-[#ffd9e1] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <Send className="w-6 h-6 text-[#111111]" />
              </span>
              <span className="font-['Space_Grotesk'] text-xs font-black px-2.5 py-1 bg-[#fde029] border border-[#111111] rounded-lg shadow-[1px_1px_0px_#111111]">
                LANGKAH 01
              </span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black uppercase text-[#111111] mb-2">
              Kirim Aspirasi
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/85 font-medium leading-relaxed">
              Tulis ide, saran, atau keluhan fasilitas tanpa mencantumkan nama. Kamu juga bisa memilih kelas atau merahasiakannya.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#111111]/20">
            <button
              onClick={() => navigate('/kirim')}
              className="text-xs font-['Space_Grotesk'] font-bold text-[#e01376] hover:underline cursor-pointer flex items-center gap-1"
            >
              Mulai Tulis Sekarang →
            </button>
          </div>
        </div>

        {/* Step 2: Simpan kode */}
        <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-6 sm:p-7 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-12 h-12 rounded-2xl bg-[#fde029] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <KeyRound className="w-6 h-6 text-[#111111]" />
              </span>
              <span className="font-['Space_Grotesk'] text-xs font-black px-2.5 py-1 bg-[#ffd9e1] border border-[#111111] rounded-lg shadow-[1px_1px_0px_#111111]">
                LANGKAH 02
              </span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black uppercase text-[#111111] mb-2">
              Simpan Kode
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/85 font-medium leading-relaxed">
              Setelah terkirim, salin nomor tiket dan kode akses rahasia. Kode ini berfungsi sebagai kunci privat untuk memantau statusmu.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#111111]/20">
            <span className="text-[11px] font-['Space_Grotesk'] font-bold text-[#5a3f47]">
              Enkripsi Aman & Privat
            </span>
          </div>
        </div>

        {/* Step 3: Pantau proses */}
        <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-6 sm:p-7 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="w-12 h-12 rounded-2xl bg-[#21D99A] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <CheckCircle2 className="w-6 h-6 text-[#111111]" />
              </span>
              <span className="font-['Space_Grotesk'] text-xs font-black px-2.5 py-1 bg-[#dbe1ff] border border-[#111111] rounded-lg shadow-[1px_1px_0px_#111111]">
                LANGKAH 03
              </span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black uppercase text-[#111111] mb-2">
              Pantau Proses
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/85 font-medium leading-relaxed">
              Gunakan kode akses rahasia untuk mengecek tahapan tindak lanjut dari komisi MPK hingga terealisasi oleh sekolah.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#111111]/20">
            <button
              onClick={() => navigate('/status')}
              className="text-xs font-['Space_Grotesk'] font-bold text-[#0051d5] hover:underline cursor-pointer flex items-center gap-1"
            >
              Buka Halaman Lacak Status →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
