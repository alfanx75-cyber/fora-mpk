import React from 'react';
import { AspirationProvider, useAspirations } from './context/AspirationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { AspirasiFeedPage } from './pages/AspirasiFeedPage';
import { AspirationDetailPage } from './pages/AspirationDetailPage';
import { SubmitPage } from './pages/SubmitPage';
import { StatusPage } from './pages/StatusPage';
import { AboutPage } from './pages/AboutPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useAspirations();

  const renderCurrentPage = () => {
    if (currentRoute === '/') {
      return <HomePage />;
    }
    if (currentRoute.startsWith('/aspirasi/')) {
      return <AspirationDetailPage />;
    }
    if (currentRoute === '/aspirasi') {
      return <AspirasiFeedPage />;
    }
    if (currentRoute === '/status') {
      return <StatusPage />;
    }
    if (currentRoute === '/kirim') {
      return <SubmitPage />;
    }
    if (currentRoute === '/tentang') {
      return <AboutPage />;
    }
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF5] retro-dotted-bg text-[#111111]">
      {/* Sticky Neo-Brutalist Navbar */}
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
  );
};

export default function App() {
  return (
    <AspirationProvider>
      <AppContent />
    </AspirationProvider>
  );
}
