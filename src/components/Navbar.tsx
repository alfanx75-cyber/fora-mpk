import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { MPK_LOGO, SCHOOL_NAME } from '../data/mockData';
import { Shield, Sparkles, QrCode } from 'lucide-react';
import { QrCodeModal } from './QrCodeModal';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, stats, isAdmin } = useAspirations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', path: '/', icon: 'home' },
    { label: 'Kirim Aspirasi', path: '/kirim', icon: 'edit_square' },
    { label: 'Lacak Status', path: '/status', icon: 'search_check' },
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
          {/* Brand Zone with School Identity */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNav('/')}
              className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none cursor-pointer"
              title="FORA — Beranda"
            >
              {/* Official School / MPK Logo */}
              <div className="relative flex items-center justify-center p-1 bg-[#FFFFFF] border-[2px] sm:border-[3px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] group-hover:rotate-6 transition-transform duration-200">
                <img
                  src={MPK_LOGO}
                  alt="Logo Resmi MPK SMAN 1 Kebumen"
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Brand Typography & Official School Tag */}
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black tracking-tight leading-none text-[#111111] flex items-center gap-1 sm:gap-1.5">
                  FORA
                  <span className="text-[9px] sm:text-[10px] uppercase font-extrabold px-1.5 py-0.5 bg-[#fde029] border border-[#111111] rounded shadow-[1px_1px_0px_#111111] tracking-wider text-[#111111]">
                    MPK
                  </span>
                </span>
                <span className="font-['Space_Grotesk'] text-[9px] sm:text-[10px] text-[#5a3f47] uppercase tracking-wider font-extrabold mt-0.5 truncate max-w-[180px] sm:max-w-none">
                  {SCHOOL_NAME}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links (>= md) */}
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
            {/* Live Count Pill (Desktop >= xl) */}
            <div className="hidden xl:flex items-center gap-2 bg-[#FFFFFF] px-3.5 py-2 border-[2px] border-[#111111] rounded-full shadow-[2px_2px_0px_#111111]">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#21D99A] border-[1.5px] border-[#111111] z-10" />
                <span className="absolute w-3 h-3 rounded-full bg-[#21D99A] animate-ping" />
              </div>
              <span className="font-['Space_Grotesk'] text-xs font-extrabold text-[#111111] uppercase tracking-wide">
                REALTIME: {stats.total} Aspirasi
              </span>
            </div>

            {/* Primary CTA Button: KIRIM ASPIRASI */}
            <button
              onClick={() => handleNav('/kirim')}
              className="btn-brutal flex items-center gap-1.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-[#FFFFFF] px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 border-[2px] sm:border-[3px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#fde029]" />
              <span className="hidden xs:inline sm:inline">Kirim Aspirasi</span>
              <span className="inline xs:hidden sm:hidden">Kirim</span>
            </button>

            {/* Direct QR Code Action */}
            <button
              onClick={() => setQrModalOpen(true)}
              title="QR Code Langsung Web FORA"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 sm:py-2.5 bg-[#fde029] hover:bg-[#ebd024] text-[#111111] border-[2px] sm:border-[2.5px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer transition-colors"
            >
              <QrCode className="w-3.5 h-3.5 text-[#111111]" />
              <span>QR Web</span>
            </button>

            {/* Quick Admin MPK Button */}
            <button
              onClick={() => handleNav('/admin')}
              title={isAdmin ? 'Panel Admin MPK (Aktif)' : 'Login Admin MPK'}
              className={`hidden md:flex items-center gap-1 px-3 py-2 sm:py-2.5 border-[2px] sm:border-[2.5px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer transition-colors ${
                isAdmin
                  ? 'bg-[#21D99A] text-[#111111] hover:bg-[#1fbe87]'
                  : 'bg-[#FFFFFF] text-[#5a3f47] hover:bg-[#fde029] hover:text-[#111111]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'Admin' : 'Admin'}</span>
            </button>

            {/* Mobile Menu Trigger (< md) */}
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

              {/* QR Code Action in Mobile Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setQrModalOpen(true);
                }}
                className="w-full text-left px-4 py-3 rounded-xl font-['Space_Grotesk'] text-sm font-extrabold uppercase tracking-wider border-[2px] border-[#111111] bg-[#fde029] text-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer flex items-center gap-2.5 min-h-[44px]"
              >
                <QrCode className="w-4 h-4 text-[#111111]" />
                <span>Buka QR Code Web</span>
              </button>

              {/* Admin MPK Link in Drawer */}
              <button
                onClick={() => handleNav('/admin')}
                className={`w-full text-left px-4 py-3 rounded-xl font-['Space_Grotesk'] text-sm font-extrabold uppercase tracking-wider border-[2px] border-[#111111] transition-all cursor-pointer flex items-center gap-2.5 min-h-[44px] ${
                  isActive('/admin')
                    ? 'bg-[#21D99A] text-[#111111] shadow-[3px_3px_0px_#111111]'
                    : 'bg-[#FCFBF5] text-[#5a3f47] hover:bg-[#f0edec]'
                }`}
              >
                <Shield className="w-4 h-4 text-[#ba1a1a]" />
                <span>Panel Admin MPK {isAdmin ? '(Aktif)' : ''}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* QR Code Modal Dialog */}
      <QrCodeModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} />

      {/* Floating Bottom Navigation Bar for Mobile Phones (< md) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FCFBF5]/95 backdrop-blur-md border-t-[3px] border-[#111111] px-2 py-1.5 flex items-center justify-around shadow-[0px_-3px_0px_#111111]"
      >
        <button
          onClick={() => handleNav('/')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
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
          onClick={() => handleNav('/kirim')}
          className="flex flex-col items-center justify-center py-1 px-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] -translate-y-1.5 transition-transform active:translate-y-0 cursor-pointer min-h-[44px]"
        >
          <span className="material-symbols-outlined text-xl leading-none">add_circle</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-black uppercase mt-0.5">
            Kirim
          </span>
        </button>

        <button
          onClick={() => handleNav('/status')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
            currentRoute === '/status'
              ? 'bg-[#fde029] border-[2px] border-[#111111] shadow-[2px_2px_0px_#111111]'
              : 'text-[#5a3f47]'
          }`}
        >
          <span className="material-symbols-outlined text-lg leading-none">search_check</span>
          <span className="font-['Space_Grotesk'] text-[10px] font-extrabold uppercase mt-0.5">
            Lacak
          </span>
        </button>

        <button
          onClick={() => handleNav('/tentang')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-h-[44px] ${
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
