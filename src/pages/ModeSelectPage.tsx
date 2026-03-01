import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { NavigatorMode } from '@/types';

import heroImg from '@/assets/hero/kyoto.jpg';

const modes: { id: NavigatorMode; emoji: string; label: string; desc: string }[] = [
  { id: 'adventure', emoji: '🧭', label: 'Adventure', desc: 'Urban exploration, rooftops, hidden passages' },
  { id: 'foodie', emoji: '🍜', label: 'Foodie', desc: 'Cafés, street food, hole-in-the-wall gems' },
  { id: 'nature', emoji: '🌿', label: 'Nature', desc: 'Parks, trails, gardens, waterways' },
  { id: 'culture', emoji: '🎭', label: 'Culture', desc: 'Murals, galleries, historic landmarks' },
  { id: 'social', emoji: '🤝', label: 'Social', desc: 'Markets, community spaces, live music' },
  { id: 'mystery', emoji: '🔮', label: 'Mystery', desc: 'Random surprises, no spoilers' },
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
      {/* Hero header */}
      <div className="relative h-[140px] overflow-hidden">
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

      {/* Mode grid */}
      <div className="flex-1 px-5 pt-5 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {modes.map((mode, i) => (
            <motion.button
              key={mode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
              onClick={() => setSelected(mode.id)}
              className={`relative rounded-xl overflow-hidden text-left transition-all duration-200 ${
                selected === mode.id
                  ? 'ring-2 ring-primary shadow-ios-lg'
                  : 'shadow-ios'
              }`}
            >
              {/* Background with warm gradient */}
              <div className={`p-4 pb-3 ${
                selected === mode.id
                  ? 'bg-primary/8'
                  : 'bg-card'
              }`}>
                {selected === mode.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="text-primary-foreground" size={11} />
                  </motion.div>
                )}
                <span className="text-2xl block">{mode.emoji}</span>
                <p className="font-display text-foreground text-[15px] mt-2.5 leading-none">{mode.label}</p>
                <p className="text-[10.5px] text-muted-foreground mt-1.5 leading-snug">{mode.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Continue button */}
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
