import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatisticsSection } from '../components/StatisticsSection';
import { ThreeStepsSection } from '../components/ThreeStepsSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 2. Hero dengan CTA utama */}
      <HeroSection />

      {/* 3. Dashboard statistik realtime */}
      <StatisticsSection />

      {/* 4. Tiga langkah singkat: Kirim aspirasi · Simpan kode · Pantau proses */}
      <ThreeStepsSection />
    </div>
  );
};
