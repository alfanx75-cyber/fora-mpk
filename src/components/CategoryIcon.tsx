import React from 'react';
import { 
  Building2, 
  UtensilsCrossed, 
  GraduationCap, 
  Calendar, 
  Bus, 
  Sparkles, 
  Lightbulb, 
  Layers 
} from 'lucide-react';
import { AspirationCategory } from '../types';

export const CategoryIcon: React.FC<{ category: AspirationCategory | string; className?: string }> = ({ 
  category, 
  className = "w-4 h-4" 
}) => {
  switch (category) {
    case 'fasilitas':
      return <Building2 className={className} />;
    case 'kantin':
      return <UtensilsCrossed className={className} />;
    case 'akademik':
      return <GraduationCap className={className} />;
    case 'event':
      return <Calendar className={className} />;
    case 'transportasi':
      return <Bus className={className} />;
    case 'kebersihan':
      return <Sparkles className={className} />;
    case 'ide_baru':
      return <Lightbulb className={className} />;
    case 'lainnya':
    default:
      return <Layers className={className} />;
  }
};
