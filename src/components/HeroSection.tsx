import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { SCHOOL_LOGO, SCHOOL_NAME } from '../data/mockData';
import { ShieldCheck, ArrowRight, SearchCheck, QrCode } from 'lucide-react';
import { QrCodeModal } from './QrCodeModal';

export const HeroSection: React.FC = () => {
  const { navigate } = useAspirations();
  const [qrModalOpen, setQrModalOpen] = useState(false);

  return (
    <section className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-14 md:pt-20 pb-12 sm:pb-16 md:pb-20">
      <div className="relative z-10 max-w-3xl flex flex-col items-start">
        {/* 1. Small Label: “Ruang Aspirasi Siswa · MPK” */}
        <div className="inline-flex items-center gap-2 bg-[#FFFFFF] px-3.5 sm:px-4 py-1.5 border-[2px] sm:border-[2.5px] border-[#111111] rounded-full shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] mb-5 sm:mb-6">
          <span className="w-2 h-2 rounded-full bg-[#e01376]" />
          <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-black text-[#111111] uppercase tracking-wider">
            Ruang Aspirasi Siswa · MPK {SCHOOL_NAME}
          </span>
        </div>

        {/* 2. Headline: “SUARAMU. DIDENGAR.” */}
        <h1 className="font-['Space_Grotesk'] text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.92] text-[#111111] font-black tracking-tighter uppercase mb-5 sm:mb-6">
          SUARAMU.<br />
          <span className="text-[#e01376] drop-shadow-[2px_2px_0px_#111111]">
            DIDENGAR.
          </span>
        </h1>

        {/* 3. Description: “Sampaikan ide, kritik, atau saran kepada MPK.” */}
        <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-xl md:text-2xl text-[#111111] font-semibold mb-7 sm:mb-9 leading-relaxed max-w-2xl">
          Sampaikan ide, kritik, atau saran kepada MPK.
        </p>

        {/* 4. Action Cluster: Primary CTA "KIRIM ASPIRASI" & Secondary "Lacak status" */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-7">
          {/* Main CTA: Highest Visual Priority */}
          <button
            onClick={() => navigate('/kirim')}
            className="btn-brutal flex items-center justify-center gap-2.5 bg-[#e01376] hover:bg-[#b5005d] text-[#FFFFFF] px-7 sm:px-9 py-4 sm:py-5 border-[3px] border-[#111111] rounded-2xl font-['Space_Grotesk'] text-base sm:text-lg font-black uppercase tracking-wider shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] cursor-pointer min-h-[54px] active:translate-y-0.5"
          >
            <span>KIRIM ASPIRASI</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Secondary Action: Lacak status */}
          <button
            onClick={() => navigate('/status')}
            className="btn-brutal flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#f0edec] text-[#111111] px-5 sm:px-7 py-3.5 sm:py-4.5 border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl font-['Space_Grotesk'] text-sm sm:text-base font-extrabold uppercase tracking-wider shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] cursor-pointer min-h-[50px]"
          >
            <SearchCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#316bf3]" />
            <span>Lacak Status</span>
          </button>

          {/* Direct QR Code Action */}
          <button
            onClick={() => setQrModalOpen(true)}
            className="btn-brutal flex items-center justify-center gap-2 bg-[#fde029] hover:bg-[#ebd024] text-[#111111] px-4 sm:px-5 py-3.5 sm:py-4.5 border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl font-['Space_Grotesk'] text-sm sm:text-base font-extrabold uppercase tracking-wider shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] cursor-pointer min-h-[50px]"
            title="Tampilkan QR Code langsung untuk scan dan bagikan"
          >
            <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-[#111111]" />
            <span>QR Code Web</span>
          </button>
        </div>

        {/* 5. Short Privacy Note */}
        <div className="flex items-center gap-2 text-[#5a3f47]">
          <ShieldCheck className="w-4 h-4 text-[#00875a] shrink-0" />
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold">
            Tanpa nama. Isi aspirasi hanya dapat dibaca admin MPK yang berwenang.
          </p>
        </div>
      </div>

      {/* QR Code Direct Modal */}
      <QrCodeModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} />
    </section>
  );
};
