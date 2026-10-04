import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, stats } = useAspirations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', path: '/', icon: 'home' },
    { label: 'Aspirasi', path: '/aspirasi', icon: 'how_to_vote' },
    { label: 'Status', path: '/status', icon: 'route' },
    { label: 'Tentang MPK', path: '/tentang', icon: 'groups' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return currentRoute === '/';
    return currentRoute.startsWith(path);
  };

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-50 bg-[#FCFBF5]/95 backdrop-blur-md border-b-[3px] border-[#111111]">
        <div className="h-16 sm:h-20 max-w-[1360px] mx-auto px-3 sm:px-6 md:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNav('/')}
              className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none cursor-pointer"
              title="FORA — Beranda"
            >
              <div className="relative flex items-center justify-center p-1 bg-[#FFFFFF] border-[2px] sm:border-[3px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] group-hover:rotate-6 transition-transform duration-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBce17YBE1NCiW1rZgQymZm-j7NEQnqiCC5oRtdpg0TtwJaGJCK_zIBIOc076NeFMgPXW-wZJvZso7UpSqspuIJ32Rka8QCGV7dbGGGfqLmyguAWkc9drjWiLHi1TZkp1zwgs6KtNgn5q52qfUrli1ehAJZVFpYHNansRH4wnep9Eus8_S8rd1lBh5nPqfwWyhK1ZtW_5KH1lRvXuC5zKrTPhl1rOfv7eH4zdgEzaxfkJLX6rwWtpLEC4lyqD03bPlCzQI"
                  alt="Logo Resmi MPK"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black tracking-tight leading-none text-[#111111] flex items-center gap-1 sm:gap-1.5">
                  FORA
                  <span className="text-[9px] sm:text-[10px] uppercase font-extrabold px-1 sm:px-1.5 py-0.5 bg-[#fde029] border border-[#111111] rounded shadow-[1px_1px_0px_#111111] tracking-wider text-[#111111]">
                    MPK
                  </span>
                </span>
                <span className="font-['Space_Grotesk'] text-[9px] sm:text-[10px] text-[#5a3f47] uppercase tracking-wider font-extrabold mt-0.5">
                  YOUR VOICE MOVES
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links (>= md / lg) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 bg-[#FFFFFF] p-1 sm:p-1.5 border-[2px] sm:border-[3px] border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111]">
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3 lg:px-4 py-1.5 sm:py-2 rounded-xl font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#fde029] text-[#111111] shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] border-[2px] border-[#111111] -translate-y-0.5'
                      : 'text-[#5a3f47] hover:text-[#111111] hover:bg-[#f0edec]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Count Pill (Desktop & Tablets >= lg) */}
            <div className="hidden xl:flex items-center gap-2 bg-[#FFFFFF] px-3.5 py-2 border-[2px] border-[#111111] rounded-full shadow-[2px_2px_0px_#111111]">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#21D99A] border-[1.5px] border-[#111111] z-10" />
                <span className="absolute w-3 h-3 rounded-full bg-[#21D99A] animate-ping" />
              </div>
              <span className="font-['Space_Grotesk'] text-xs font-extrabold text-[#111111] uppercase tracking-wide">
                LIVE: {stats.total} Aspirasi
              </span>
            </div>

            {/* Primary CTA Button */}
            <button
              onClick={() => handleNav('/kirim')}
              className="btn-brutal flex items-center gap-1 sm:gap-1.5 bg-[#e01376] hover:bg-[#b5005d] text-[#FFFFFF] px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 border-[2px] sm:border-[3px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] cursor-pointer"
            >
              <span className="text-sm sm:text-base font-black leading-none">+</span>
              <span className="hidden xs:inline sm:inline">Kirim Aspirasi</span>
              <span className="inline xs:hidden sm:hidden">Kirim</span>
            </button>

            {/* Mobile / Tablet Menu Trigger (Visible on < md) */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Buka Menu Navigasi"
              className="md:hidden p-2 sm:p-2.5 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] text-[#111111] hover:bg-[#fde029] transition-colors focus:outline-none cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px]"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Drawer Dropdown (< md) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-[3px] border-[#111111] bg-[#FCFBF5] px-4 py-4 shadow-[0px_8px_0px_#111111] animate-[popModal_0.25s_ease-out_forwards]">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => {
                const active = isActive(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-['Space_Grotesk'] text-sm font-extrabold uppercase tracking-wider border-[2px] border-[#111111] transition-all cursor-pointer flex items-center gap-2.5 min-h-[44px] ${
                      active
                        ? 'bg-[#fde029] text-[#111111] shadow-[3px_3px_0px_#111111]'
                        : 'bg-[#FFFFFF] text-[#111111] hover:bg-[#f0edec]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                );
              })}

              <div className="pt-3 border-t-[2px] border-dashed border-[#111111] flex items-center justify-between px-2">
                <span className="font-['Space_Grotesk'] text-xs font-bold text-[#5a3f47] uppercase">
                  Status Sistem MPK:
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#21D99A] border border-[#111111] rounded-full text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                  Online & Menerima
                </span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Navigation Bar for Mobile Phones (< md) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FCFBF5]/95 backdrop-blur-md border-t-[3px] border-[#111111] px-2 py-1.5 flex items-center justify-around shadow-[0px_-3px_0px_#111111]"
      >
        <button
          onClick={() => handleNav('/')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] ${
            currentRoute === '/'
              ? 'bg-[#fde029] border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111]'
              : 'text-[#5a3f47]'
          }`}
        >
          <span className="material-symbols-outlined text-lg leading-none">home</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-extrabold uppercase mt-0.5">
            Beranda
          </span>
        </button>

        <button
          onClick={() => handleNav('/aspirasi')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] ${
            currentRoute.startsWith('/aspirasi')
              ? 'bg-[#fde029] border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111]'
              : 'text-[#5a3f47]'
          }`}
        >
          <span className="material-symbols-outlined text-lg leading-none">how_to_vote</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-extrabold uppercase mt-0.5">
            Aspirasi
          </span>
        </button>

        <button
          onClick={() => handleNav('/kirim')}
          className="flex flex-col items-center justify-center py-1 px-3 bg-[#e01376] text-white border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] -translate-y-1.5 transition-transform active:translate-y-0 cursor-pointer min-h-[44px]"
        >
          <span className="material-symbols-outlined text-xl leading-none">add_circle</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-black uppercase mt-0.5">
            + Kirim
          </span>
        </button>

        <button
          onClick={() => handleNav('/status')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] ${
            currentRoute === '/status'
              ? 'bg-[#fde029] border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111]'
              : 'text-[#5a3f47]'
          }`}
        >
          <span className="material-symbols-outlined text-lg leading-none">route</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-extrabold uppercase mt-0.5">
            Status
          </span>
        </button>

        <button
          onClick={() => handleNav('/tentang')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-h-[44px] ${
            currentRoute === '/tentang'
              ? 'bg-[#fde029] border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111]'
              : 'text-[#5a3f47]'
          }`}
        >
          <span className="material-symbols-outlined text-lg leading-none">groups</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-extrabold uppercase mt-0.5">
            Tentang
          </span>
        </button>
      </nav>
    </>
  );
};
