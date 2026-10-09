import React from 'react';
import { AspirationProvider, useAspirations } from './context/AspirationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { SubmitPage } from './pages/SubmitPage';
import { StatusPage } from './pages/StatusPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { SCHOOL_LOGO } from './data/mockData';

const AppContent: React.FC = () => {
  const { currentRoute } = useAspirations();

  const renderCurrentPage = () => {
    if (currentRoute === '/') {
      return <HomePage />;
    }
    if (currentRoute === '/kirim') {
      return <SubmitPage />;
    }
    if (currentRoute === '/status' || currentRoute.startsWith('/aspirasi')) {
      // Obsolete public feed or direct links route safely to Private Tracking
      return <StatusPage />;
    }
    if (currentRoute === '/tentang') {
      return <AboutPage />;
    }
    if (currentRoute === '/admin') {
      return <AdminPage />;
    }
    return <HomePage />;
  };

  return (
    <div className="relative min-h-screen text-[#111111] overflow-x-hidden selection:bg-[#fde029] selection:text-[#111111]">
      {/* 
        Stationary Fixed Background Layer:
        - Tetap diam di tempat (tidak bergerak) saat halaman di-scroll
        - Mempertahankan background titik-titik (retro-dotted-bg) asli
        - Menampilkan watermark logo resmi SMAN 1 Kebumen secara elegan
        - pointer-events-none & select-none agar bebas halangan interaksi
      */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden bg-[#FCFBF5]"
      >
        {/* Retro Dotted Grid Pattern Asli - Tetap diam */}
        <div className="absolute inset-0 retro-dotted-bg" />

        {/* Watermark Logo SMAN 1 Kebumen - Tetap diam di tengah layar saat di-scroll (ukuran diperbesar & opacity dinaikkan) */}
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <img
            src={SCHOOL_LOGO}
            alt=""
            className="w-[340px] sm:w-[520px] md:w-[660px] lg:w-[780px] max-w-[92vw] max-h-[82vh] object-contain opacity-[0.09] sm:opacity-[0.095] filter contrast-125 drop-shadow-sm select-none transition-all duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 
        Scrollable Content Layer:
        - Seluruh blok elemen bergerak melintasi background yang diam
      */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Neo-Brutalist Navbar with School Branding */}
        <Navbar />

        {/* Main Dynamic Viewport */}
        <main className="flex-1 w-full">
          {renderCurrentPage()}
        </main>

        {/* Global Neo-Brutalist Footer */}
        <Footer />

        {/* Global Notification Toast */}
        <Toast />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AspirationProvider>
      <AppContent />
    </AspirationProvider>
  );
}
