import React from 'react';
import { useAspirations } from '../context/AspirationContext';

export const Toast: React.FC = () => {
  const { toast, hideToast, navigate } = useAspirations();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isVote = toast.type === 'vote';
  const isError = toast.type === 'error';

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl p-3 sm:p-4 shadow-[4px_4px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] max-w-md w-[92vw] sm:w-auto animate-[popToast_0.35s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]"
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-[2px] border-[#111111] flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-[2px_2px_0px_#111111] ${
            isSuccess
              ? 'bg-[#21D99A]'
              : isVote
              ? 'bg-[#ffd9e1]'
              : isError
              ? 'bg-[#ffdad6]'
              : 'bg-[#fde029]'
          }`}
        >
          {isSuccess ? '🚀' : isVote ? '❤️' : isError ? '👀' : '⚡'}
        </div>

        <div className="flex flex-col pr-1 sm:pr-2 min-w-0">
          <span className="font-['Space_Grotesk'] text-xs sm:text-sm uppercase font-extrabold text-[#111111] tracking-wide truncate">
            {toast.title}
          </span>
          <p className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-semibold text-[#111111]/90 leading-tight">
            {toast.message}
            {toast.ticketId && (
              <button
                onClick={() => {
                  hideToast();
                  navigate(`/aspirasi/${toast.ticketId}`);
                }}
                className="ml-1 font-mono font-bold text-[#0ea5e9] underline hover:text-[#0284c7] cursor-pointer"
              >
                {toast.ticketId}
              </button>
            )}
          </p>
        </div>

        <button
          onClick={hideToast}
          aria-label="Tutup Notifikasi"
          className="ml-auto p-1 text-[#111111] hover:text-[#0ea5e9] transition-colors rounded-lg focus:outline-none cursor-pointer"
        >
          <span className="material-symbols-outlined text-base sm:text-lg">close</span>
        </button>
      </div>

      <div className="w-full bg-[#f0edec] h-1.5 border border-[#111111] rounded-full mt-2 sm:mt-3 overflow-hidden">
        <div className="h-full bg-[#0ea5e9] w-full animate-[shrinkProgress_3.6s_linear_forwards]" />
      </div>
    </div>
  );
};
