import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { AspirationCard } from '../components/AspirationCard';
import { CategoryIcon } from '../components/CategoryIcon';
import { CATEGORIES, STATUS_MAP } from '../data/mockData';
import { Search, FolderKanban } from 'lucide-react';

export const AspirasiFeedPage: React.FC = () => {
  const { aspirations, navigate } = useAspirations();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'oldest'>('popular');

  // Filter and sort aspirations
  const filtered = aspirations.filter(asp => {
    // Category check
    if (selectedCategory !== 'all' && asp.category !== selectedCategory) {
      return false;
    }
    // Status check
    if (selectedStatus !== 'all' && asp.status !== selectedStatus) {
      return false;
    }
    // Search text check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = asp.title.toLowerCase().includes(q);
      const matchDesc = asp.description.toLowerCase().includes(q);
      const matchAuthor = asp.authorName.toLowerCase().includes(q);
      const matchId = asp.id.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchAuthor && !matchId) {
        return false;
      }
    }
    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.supportCount - a.supportCount;
    }
    if (sortBy === 'latest') {
      return b.id.localeCompare(a.id);
    }
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-10 pb-5 sm:pb-6 border-b-[2px] sm:border-b-[3px] border-[#111111]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fde029] border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-2">
            <FolderKanban className="w-3.5 h-3.5 text-[#111111]" />
            <span>ARSIP SUARA & TRANSPARANSI</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl font-black text-[#111111] uppercase tracking-tight">
            SUARA ASPIRASI SISWA
          </h1>
          <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base md:text-lg text-[#111111] font-medium mt-1.5 sm:mt-2 max-w-xl">
            Semua aspirasi, keluhan, dan gagasan yang masuk diinventarisasi secara terbuka. Cari atau berikan dukunganmu!
          </p>
        </div>

        <button
          onClick={() => navigate('/kirim')}
          className="btn-brutal self-stretch sm:self-start md:self-auto flex items-center justify-center gap-2 bg-[#e01376] hover:bg-[#b5005d] text-white px-5 sm:px-6 py-3 sm:py-3.5 border-[2px] sm:border-[3px] border-[#111111] rounded-2xl font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] min-h-[44px]"
        >
          <span className="text-lg leading-none">+</span>
          <span>Kirim Suara Baru</span>
        </button>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] mb-8 sm:mb-10 space-y-4 sm:space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#111111] text-lg sm:text-xl">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari kata kunci, lokasi, atau ID Tiket (#MPK-2026)..."
            className="w-full bg-[#FCFBF5] border-[2px] sm:border-[3px] border-[#111111] rounded-xl sm:rounded-2xl pl-10 sm:pl-12 pr-10 py-3 sm:py-3.5 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base font-semibold text-[#111111] placeholder:text-[#5a3f47]/60 focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold p-1 hover:bg-[#ffd9e1] rounded-full"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filters Chips */}
        <div>
          <span className="block font-['Space_Grotesk'] text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#111111] mb-2">
            Kategori:
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn-brutal px-3 sm:px-3.5 py-1.5 sm:py-2 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase tracking-wider font-extrabold whitespace-nowrap cursor-pointer transition-all min-h-[36px] ${
                selectedCategory === 'all'
                  ? 'bg-[#111111] text-white shadow-[2px_2px_0px_#e01376]'
                  : 'bg-[#FCFBF5] text-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#f0edec]'
              }`}
            >
              Semua
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn-brutal inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase tracking-wider font-extrabold whitespace-nowrap cursor-pointer transition-all min-h-[36px] ${
                  selectedCategory === cat.id
                    ? 'bg-[#111111] text-white shadow-[2px_2px_0px_#e01376]'
                    : 'bg-[#FCFBF5] text-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#f0edec]'
                }`}
              >
                <CategoryIcon category={cat.id} className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Row: Status Filter & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t-[2px] border-dashed border-[#111111]">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 no-scrollbar">
            <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#111111] shrink-0">
              Status:
            </span>
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs font-bold uppercase border-[1.5px] border-[#111111] transition-all shrink-0 ${
                selectedStatus === 'all'
                  ? 'bg-[#fde029] text-[#111111] shadow-[1.5px_1.5px_0px_#111111]'
                  : 'bg-white text-[#111111] hover:bg-[#f0edec]'
              }`}
            >
              Semua
            </button>
            {Object.values(STATUS_MAP).map(st => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs font-bold uppercase border-[1.5px] border-[#111111] transition-all shrink-0 ${
                  selectedStatus === st.id
                    ? 'bg-[#111111] text-white shadow-[1.5px_1.5px_0px_#fde029]'
                    : 'bg-white text-[#111111] hover:bg-[#f0edec]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto sm:ml-auto shrink-0">
            <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#111111]">
              Urutkan:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'popular' | 'latest' | 'oldest')}
              className="bg-[#FCFBF5] border-[2px] border-[#111111] rounded-xl px-2.5 sm:px-3 py-1.5 font-['Space_Grotesk'] text-[11px] sm:text-xs font-extrabold uppercase focus:outline-none shadow-[2px_2px_0px_#111111]"
            >
              <option value="popular">Terpopuler</option>
              <option value="latest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count Header */}
      <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
        <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#5a3f47]">
          {sorted.length} aspirasi ditemukan
        </span>
        {(selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedStatus('all');
              setSearchQuery('');
            }}
            className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-extrabold uppercase text-[#e01376] hover:underline"
          >
            Reset Filter ✕
          </button>
        )}
      </div>

      {/* Aspirations Grid or Clean Empty State */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {sorted.map((asp, idx) => {
            const rotations = ['rotate-[-0.8deg]', 'rotate-[0.6deg]', 'rotate-[-1deg]', 'rotate-[0.8deg]', 'rotate-[-0.6deg]', 'rotate-[0.9deg]'];
            return (
              <AspirationCard
                key={asp.id}
                aspiration={asp}
                rotationClass={rotations[idx % rotations.length]}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-8 sm:p-12 text-center shadow-[6px_6px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] max-w-xl mx-auto my-8 sm:my-12">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#ffd9e1] border-[2px] sm:border-[3px] border-[#111111] flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-[3px_3px_0px_#111111]">
            <Search className="w-6 h-6 text-[#111111]" />
          </div>
          <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black text-[#111111] uppercase mb-2">
            BELUM ADA ASPIRASI
          </h3>
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium mb-6">
            Belum ada aspirasi yang cocok dengan filter ini. Jadilah yang pertama mengirimkan suaramu!
          </p>
          <button
            onClick={() => navigate('/kirim')}
            className="btn-brutal px-5 sm:px-6 py-3 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[3px_3px_0px_#111111]"
          >
            + KIRIM ASPIRASI SEKARANG
          </button>
        </div>
      )}
    </div>
  );
};
