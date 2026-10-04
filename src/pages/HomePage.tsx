import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { StatisticsSection } from '../components/StatisticsSection';
import { TransparencySection } from '../components/TransparencySection';
import { QuickSubmitSection } from '../components/QuickSubmitSection';
import { AspirationCard } from '../components/AspirationCard';
import { useAspirations } from '../context/AspirationContext';
import { CATEGORIES, MPK_MEMBERS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { aspirations, navigate } = useAspirations();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAspirations = selectedCategory === 'all'
    ? aspirations.slice(0, 6)
    : aspirations.filter(a => a.category === selectedCategory).slice(0, 6);

  // Rotation tilts for aesthetic asymmetric poster feel (zeroed on mobile in component)
  const rotations = ['rotate-[-0.8deg]', 'rotate-[0.6deg]', 'rotate-[-1.1deg]', 'rotate-[0.7deg]', 'rotate-[-0.5deg]', 'rotate-[0.9deg]'];

  return (
    <div className="w-full">
      {/* 1. Hero Section with Interactive Card */}
      <HeroSection />

      {/* 2. Infinite Ticker Banner */}
      <MarqueeTicker />

      {/* 3. Statistics Bento Section */}
      <StatisticsSection />

      {/* 4. Aspiration Feed Preview ("SUARA YANG LAGI RAMAI DIBICARAKAN") */}
      <section id="feed-preview" className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="flex flex-col items-start gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          <div className="inline-block px-3 py-1 bg-[#fde029] border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111]">
            🔥 TREN ASPIRASI SISWA
          </div>
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight">
              SUARA YANG LAGI RAMAI DIBICARAKAN
            </h2>
            <button
              onClick={() => navigate('/aspirasi')}
              className="btn-brutal font-['Space_Grotesk'] text-xs sm:text-sm uppercase tracking-wider text-[#111111] font-black underline decoration-[3px] decoration-[#e01376] hover:text-[#e01376] transition-colors py-1 text-left cursor-pointer"
            >
              Lihat Semua {aspirations.length + 240} Aspirasi →
            </button>
          </div>
        </div>

        {/* Category Chips Filter - Touch optimized */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`btn-brutal px-3.5 sm:px-4 py-2 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs uppercase tracking-wider font-extrabold whitespace-nowrap cursor-pointer transition-all min-h-[38px] ${
              selectedCategory === 'all'
                ? 'bg-[#111111] text-[#FFFFFF] shadow-[3px_3px_0px_#e01376]'
                : 'bg-[#FFFFFF] text-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#f0edec]'
            }`}
          >
            Semua
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`btn-brutal px-3.5 sm:px-4 py-2 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs uppercase tracking-wider font-extrabold whitespace-nowrap cursor-pointer transition-all min-h-[38px] ${
                selectedCategory === cat.id
                  ? 'bg-[#111111] text-[#FFFFFF] shadow-[3px_3px_0px_#e01376]'
                  : 'bg-[#FFFFFF] text-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#f0edec]'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Editorial Asymmetrical Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {filteredAspirations.map((asp, idx) => (
            <AspirationCard
              key={asp.id}
              aspiration={asp}
              rotationClass={rotations[idx % rotations.length]}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <button
            onClick={() => navigate('/aspirasi')}
            className="btn-brutal inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl font-['Space_Grotesk'] text-xs sm:text-sm uppercase font-black shadow-[4px_4px_0px_#111111] sm:shadow-[5px_5px_0px_#111111] min-h-[48px]"
          >
            <span>JELAJAHI SEMUA SUARA SISWA</span>
            <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* 5. Transparency Pipeline Section */}
      <TransparencySection />

      {/* 6. About MPK Teaser ("WHO ARE WE?") */}
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 md:p-14 shadow-[6px_6px_0px_#111111] sm:shadow-[8px_8px_0px_#111111]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-5 sm:pb-6 border-b-[2px] sm:border-b-[3px] border-[#111111]">
            <div>
              <div className="inline-block px-3 py-1 bg-[#dbe1ff] border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-2">
                🏛️ PERWAKILAN RESMI SISWA
              </div>
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight">
                WHO ARE WE?
              </h2>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base text-[#111111] max-w-md font-medium">
              MPK bukan sekadar kumpulan orang yang duduk di ruang rapat. Kami adalah jembatan independen antara suara siswa dan sekolah.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {MPK_MEMBERS.slice(0, 3).map(member => (
              <div
                key={member.name}
                className="card-brutal-hover bg-[#FCFBF5] border-[2px] sm:border-[3px] border-[#111111] rounded-2xl p-4 sm:p-6 shadow-[3px_3px_0px_#111111] sm:shadow-[5px_5px_0px_#111111] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border-[2px] border-[#111111] flex items-center justify-center text-xl sm:text-2xl shadow-[2px_2px_0px_#111111]">
                      {member.avatar}
                    </span>
                    <span
                      className="px-2.5 py-0.5 border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] font-black uppercase shadow-[1px_1px_0px_#111111]"
                      style={{ backgroundColor: member.badgeBg }}
                    >
                      {member.badge}
                    </span>
                  </div>
                  <h4 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#111111]">
                    {member.name}
                  </h4>
                  <div className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-semibold text-[#5a3f47] mb-3">
                    {member.role} • {member.class}
                  </div>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111]/80 italic border-l-[3px] border-[#e01376] pl-3 py-1">
                    “{member.quote}”
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-[2px] border-dashed border-[#111111] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-extrabold text-[#5a3f47]">
              Terdiri dari 36 Perwakilan Kelas & 4 Komisi Khusus
            </span>
            <button
              onClick={() => navigate('/tentang')}
              className="btn-brutal px-4 sm:px-5 py-2.5 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] min-h-[40px]"
            >
              Kenali Struktur & Anggota Lengkap →
            </button>
          </div>
        </div>
      </section>

      {/* 7. Giant Quick Submit Section */}
      <QuickSubmitSection />
    </div>
  );
};
