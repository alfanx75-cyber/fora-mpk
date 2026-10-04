import React from 'react';
import { Aspiration } from '../types';
import { CATEGORIES, STATUS_MAP } from '../data/mockData';
import { useAspirations } from '../context/AspirationContext';

interface AspirationCardProps {
  aspiration: Aspiration;
  rotationClass?: string;
}

export const AspirationCard: React.FC<AspirationCardProps> = ({
  aspiration,
  rotationClass = '',
}) => {
  const { voteAspiration, navigate } = useAspirations();

  const category = CATEGORIES.find(c => c.id === aspiration.category) || {
    id: aspiration.category,
    name: aspiration.category,
    icon: '💡',
    bgColor: '#ffd9e1',
  };

  const status = STATUS_MAP[aspiration.status] || STATUS_MAP.submitted;

  const handleCardClick = () => {
    navigate(`/aspirasi/${aspiration.id}`);
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    voteAspiration(aspiration.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl sm:rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between p-4 sm:p-6 cursor-pointer relative group transition-all duration-200 rotate-0 sm:${rotationClass} hover:rotate-0`}
    >
      <div>
        {/* Top Meta Header */}
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <span
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 border-[1.5px] sm:border-[2px] border-[#111111] rounded-full font-['Space_Grotesk'] text-[11px] sm:text-xs font-bold text-[#111111] shadow-[1px_1px_0px_#111111] sm:shadow-[1.5px_1.5px_0px_#111111]"
            style={{ backgroundColor: category.bgColor }}
          >
            <span>{category.icon}</span>
            <span className="uppercase">{category.name}</span>
          </span>

          <span
            className={`border-[1.5px] sm:border-[2px] border-[#111111] px-2 sm:px-2.5 py-0.5 rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-black uppercase tracking-wide flex items-center gap-1 shadow-[1.5px_1.5px_0px_#111111] sm:shadow-[2px_2px_0px_#111111] ${status.badgeBg} ${status.textColor}`}
          >
            <span className="material-symbols-outlined text-[13px] sm:text-[14px] leading-none">
              {status.icon}
            </span>
            <span>{status.label}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-['Space_Grotesk'] text-base sm:text-lg md:text-xl font-bold text-[#111111] leading-snug mb-2 sm:mb-3 group-hover:text-[#e01376] transition-colors">
          {aspiration.title}
        </h3>

        {/* Excerpt */}
        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
          {aspiration.description}
        </p>
      </div>

      {/* Bottom Bar: Author info & Vote Button */}
      <div className="pt-3 sm:pt-4 border-t-[1.5px] sm:border-t-[2px] border-[#111111] flex items-center justify-between gap-2">
        <div className="flex flex-col min-w-0 pr-1">
          <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-black text-[#111111] flex items-center gap-1 truncate">
            <span className="material-symbols-outlined text-xs sm:text-sm shrink-0">
              {aspiration.isAnonymous ? 'visibility_off' : 'person'}
            </span>
            <span className="truncate">{aspiration.isAnonymous ? 'Anonim' : aspiration.authorName}</span>
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] sm:text-[11px] text-[#5a3f47] font-semibold truncate">
            {aspiration.createdAt}
          </span>
        </div>

        <button
          type="button"
          onClick={handleVote}
          aria-label="Dukung Aspirasi ini"
          className={`btn-brutal shrink-0 relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black shadow-[2px_2px_0px_#111111] cursor-pointer transition-colors min-h-[38px] ${
            aspiration.hasVoted
              ? 'bg-[#ffd9e1] text-[#e01376]'
              : 'bg-[#FFFFFF] hover:bg-[#fde029] text-[#111111]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-sm sm:text-base transition-transform ${
              aspiration.hasVoted ? 'text-[#e01376] scale-110' : 'text-[#111111]'
            }`}
            style={{ fontVariationSettings: aspiration.hasVoted ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
          <span>{aspiration.supportCount}</span>
          <span className="hidden xs:inline sm:inline">Dukungan</span>
        </button>
      </div>
    </div>
  );
};
