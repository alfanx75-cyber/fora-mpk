import React from 'react';
import { useAspirations } from '../context/AspirationContext';
import { ShieldCheck, ArrowRight, SearchCheck, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate } = useAspirations();

  return (
    <section className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-14 md:pt-20 pb-12 sm:pb-16 md:pb-20">
      <div className="relative z-10 max-w-3xl flex flex-col items-start">
        {/* 1. Slogan SMANSA: “Cerdas, Berkarakter, Berbudaya” */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-[#fde029] px-3.5 sm:px-4 py-1.5 sm:py-2 border-[2px] sm:border-[2.5px] border-[#111111] rounded-full shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] mb-5 sm:mb-6 hover:-rotate-1 hover:scale-102 transition-all duration-200 cursor-default select-none group">
          <span className="w-5 h-5 rounded-full bg-[#111111] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#111111]">
            <Zap className="w-3 h-3 fill-[#fde029] text-[#fde029] group-hover:scale-110 transition-transform" />
          </span>
          <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-black text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
            <span>Cerdas</span>
            <span className="text-[#111111]/40 font-black">•</span>
            <span>Berkarakter</span>
            <span className="text-[#111111]/40 font-black">•</span>
            <span>Berbudaya</span>
          </span>
        </div>

        {/* 2. Headline: “SUARAMU. DIDENGAR.” */}
        <h1 className="font-['Space_Grotesk'] text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.92] text-[#111111] font-black tracking-tighter uppercase mb-5 sm:mb-6">
          SUARAMU.<br />
          <span className="text-[#0ea5e9] drop-shadow-[2px_2px_0px_#111111]">
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
            className="btn-brutal flex items-center justify-center gap-2.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-[#FFFFFF] px-7 sm:px-9 py-4 sm:py-5 border-[3px] border-[#111111] rounded-2xl font-['Space_Grotesk'] text-base sm:text-lg font-black uppercase tracking-wider shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] cursor-pointer min-h-[54px] active:translate-y-0.5"
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
        </div>

        {/* 5. Short Privacy Note */}
        <div className="flex items-center gap-2 text-[#5a3f47]">
          <ShieldCheck className="w-4 h-4 text-[#00875a] shrink-0" />
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold">
            Tanpa nama. Isi aspirasi hanya dapat dibaca admin MPK yang berwenang.
          </p>
        </div>
      </div>
    </section>
  );
};
