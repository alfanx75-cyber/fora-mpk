import React from 'react';

export const MarqueeTicker: React.FC = () => {
  return (
    <div className="w-full bg-[#fde029] border-y-[3px] border-[#111111] py-2.5 overflow-hidden select-none">
      <div className="marquee-track">
        <div className="flex items-center gap-8 text-[#111111] font-['Space_Grotesk'] text-xs uppercase tracking-wider font-extrabold px-4">
          <span>✦ ASPIRASI • REALISASI • INOVASI</span>
          <span>•</span>
          <span>🏛️ MPK SMANSA — 30 KELAS & 1.000+ SISWA</span>
          <span>•</span>
          <span>📢 SUARA SISWA DIDENGAR & DITINDAKLANJUTI</span>
          <span>•</span>
          <span>⚡ 5 KOMISI RESMI: KONSTRAKUM • KONSTADIP • KOASITER • KOMWASEV • KOMSIPUSOS</span>
          <span>✦</span>
          <span>100% AMAN & DIKAWAL DENGAN TANGGUNG JAWAB</span>
          <span>•</span>
          <span>💬 SETIAP SUARA MEMILIKI TIKET TRACKING</span>
          <span>•</span>
        </div>
        <div aria-hidden="true" className="flex items-center gap-8 text-[#111111] font-['Space_Grotesk'] text-xs uppercase tracking-wider font-extrabold px-4">
          <span>✦ ASPIRASI • REALISASI • INOVASI</span>
          <span>•</span>
          <span>🏛️ MPK SMANSA — 30 KELAS & 1.000+ SISWA</span>
          <span>•</span>
          <span>📢 SUARA SISWA DIDENGAR & DITINDAKLANJUTI</span>
          <span>•</span>
          <span>⚡ 5 KOMISI RESMI: KONSTRAKUM • KONSTADIP • KOASITER • KOMWASEV • KOMSIPUSOS</span>
          <span>✦</span>
          <span>100% AMAN & DIKAWAL DENGAN TANGGUNG JAWAB</span>
          <span>•</span>
          <span>💬 SETIAP SUARA MEMILIKI TIKET TRACKING</span>
          <span>•</span>
        </div>
      </div>
    </div>
  );
};
