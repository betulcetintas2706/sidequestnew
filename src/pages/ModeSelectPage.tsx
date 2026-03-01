import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Compass, UtensilsCrossed, TreePine, Palette, Users, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { NavigatorMode } from '@/types';

import heroImg from '@/assets/hero/kyoto.jpg';

const modes: { id: NavigatorMode; icon: typeof Compass; label: string; desc: string }[] = [
  { id: 'adventure', icon: Compass, label: 'Adventure', desc: 'Urban exploration, rooftops, hidden passages' },
  { id: 'foodie', icon: UtensilsCrossed, label: 'Foodie', desc: 'Cafés, street food, hole-in-the-wall gems' },
  { id: 'nature', icon: TreePine, label: 'Nature', desc: 'Parks, trails, gardens, waterways' },
  { id: 'culture', icon: Palette, label: 'Culture', desc: 'Murals, galleries, historic landmarks' },
  { id: 'social', icon: Users, label: 'Social', desc: 'Markets, community spaces, live music' },
  { id: 'mystery', icon: Sparkles, label: 'Mystery', desc: 'Random surprises, no spoilers' },
];

export default function ModeSelectPage() {
  const [selected, setSelected] = useState<NavigatorMode | null>(null);
  const navigate = useNavigate();
  const { setRouteConfig } = useApp();

  const handleContinue = () => {
    if (selected) {
      setRouteConfig({ mode: selected });
      navigate('/route-setup');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="relative h-[160px] overflow-hidden">
        <motion.img
          src={heroImg}
          alt=""
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="grain absolute inset-0 pointer-events-none" />

        <button
          onClick={() => navigate('/home')}
          className="absolute top-12 left-4 flex items-center gap-0.5 text-white/80 text-sm z-10"
        >
          <ChevronLeft size={18} /> Back
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
            <div className="editorial-rule mb-2" />
            <h1 className="text-xl font-display text-foreground leading-none">Choose your mode</h1>
            <p className="text-[11px] text-muted-foreground mt-1">How do you want to explore today?</p>
          </motion.div>
        </div>
      </div>

      {/* Mode list */}
      <div className="flex-1 px-5 pt-4 pb-6">
        {modes.map((mode, i) => {
          const Icon = mode.icon;
          const isSelected = selected === mode.id;
          return (
            <motion.button
              key={mode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.04, duration: 0.35 }}
              onClick={() => setSelected(mode.id)}
              className={`w-full flex items-center gap-3.5 py-3.5 text-left transition-colors ${
                i > 0 ? 'border-t border-border/40' : ''
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                isSelected ? 'bg-primary/12' : 'bg-muted/60'
              }`}>
                <Icon size={17} className={`transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-display text-[15px] leading-none transition-colors ${
                  isSelected ? 'text-primary' : 'text-foreground'
                }`}>{mode.label}</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{mode.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center transition-all ${
                isSelected ? 'bg-primary' : 'border-2 border-border'
              }`}>
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="text-primary-foreground" size={11} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Continue */}
      <div className="px-5 pb-10">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          onClick={handleContinue}
          disabled={!selected}
          whileTap={selected ? { scale: 0.98 } : undefined}
          className={`w-full py-4 rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 ${
            selected
              ? 'bg-primary text-primary-foreground shadow-ios-lg'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          Continue <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
