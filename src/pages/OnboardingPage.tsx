import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Map, Camera, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { NavigatorMode } from '@/types';

import santorini from '@/assets/hero/santorini.jpg';
import kyoto from '@/assets/hero/kyoto.jpg';
import amalfi from '@/assets/hero/amalfi.jpg';
import patagonia from '@/assets/hero/patagonia.jpg';

const modeIcons: Record<string, string> = {
  adventure: '🧭', foodie: '🍜', nature: '🌿', culture: '🎭', social: '🤝', mystery: '🔮',
};

const bgImages = [santorini, kyoto, amalfi, patagonia];

const pages = [
  {
    icon: <Map className="text-primary" size={28} />,
    title: 'Discovery routes, not fastest routes.',
    desc: 'SideQuest adds curated detours to your journey — hidden gems, scenic spots, and places you\'d never find on your own.',
  },
  {
    icon: <Compass className="text-primary" size={28} />,
    title: 'Pick a Navigator Mode.',
    desc: 'Choose how you want to explore. Each mode unlocks different types of stops and experiences.',
    hasModePicker: true,
  },
  {
    icon: <Camera className="text-primary" size={28} />,
    title: 'Save memories and earn points.',
    desc: 'Capture moments along the way. Keep them private in your Vault or share with the community to climb leaderboards.',
  },
  {
    icon: null,
    title: 'Ready to explore?',
    desc: 'Sign in to save your progress across devices, or continue as a guest.',
    hasAuth: true,
  },
];

export default function OnboardingPage() {
  const [page, setPage] = useState(0);
  const [selectedMode, setSelectedMode] = useState<NavigatorMode | null>(null);
  const navigate = useNavigate();
  const { completeOnboarding, setRouteConfig, setUser } = useApp();

  const finish = (provider: 'apple' | 'google' | 'guest') => {
    if (selectedMode) setRouteConfig({ mode: selectedMode });
    setUser({ id: 'u_' + Math.random().toString(36).slice(2, 8), name: provider === 'guest' ? 'Explorer' : 'Traveler', authProvider: provider, points: 0, streak: 0, routesCompleted: 0, badgesUnlocked: [], savedRoutes: [] });
    completeOnboarding();
    navigate('/home');
  };

  const next = () => { if (page < pages.length - 1) setPage(page + 1); };
  const current = pages[page];

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background image — subtle, matches hero aesthetic */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={page}
            src={bgImages[page]}
            alt=""
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: page === 3 ? 0.25 : 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-16 pb-10 safe-bottom">
        {/* Progress dots */}
        <div className="flex gap-2 justify-center mb-14">
          {pages.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === page ? 32 : 6 }}
              className={`h-1.5 rounded-full transition-colors duration-300 ${i === page ? 'bg-primary' : 'bg-border'}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`flex-1 flex flex-col ${current.hasAuth ? 'justify-end' : ''}`}
          >
            {/* Icon — only for non-auth pages */}
            {current.icon && (
              <div className="w-14 h-14 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-primary/10">
                {current.icon}
              </div>
            )}

            {/* Editorial rule */}
            <div className="editorial-rule mb-4" />

            {/* Title */}
            <h2 className={`leading-tight font-display mb-3 text-foreground ${current.hasAuth ? 'text-[2rem]' : 'text-[1.65rem]'}`}>
              {current.title}
            </h2>

            {/* Description */}
            <p className={`text-muted-foreground leading-relaxed mb-8 ${current.hasAuth ? 'text-base max-w-[32ch]' : 'text-sm max-w-[28ch]'}`}>
              {current.desc}
            </p>

            {/* Mode picker */}
            {current.hasModePicker && (
              <div className="grid grid-cols-3 gap-2.5 mb-8">
                {(Object.keys(modeIcons) as NavigatorMode[]).map(mode => (
                  <motion.button
                    key={mode}
                    onClick={() => setSelectedMode(mode)}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-3.5 rounded-xl flex flex-col items-center gap-1.5 transition-all duration-200
                      ${selectedMode === mode
                        ? 'bg-primary/10 ring-2 ring-primary shadow-sm'
                        : 'bg-card/80 backdrop-blur-sm border border-border/60 hover:border-primary/30'
                      }`}
                  >
                    <span className="text-2xl">{modeIcons[mode]}</span>
                    <span className="text-[11px] font-semibold capitalize text-foreground tracking-wide">{mode}</span>
                    {selectedMode === mode && (
                      <motion.div
                        layoutId="modeCheck"
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                      >
                        <span className="text-primary-foreground text-[9px]">✓</span>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Auth buttons — polished, bottom-anchored */}
            {current.hasAuth && (
              <div className="space-y-3">
                <motion.button
                  onClick={() => finish('apple')}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-2xl bg-foreground text-background font-semibold text-[15px] flex items-center justify-center gap-2.5 shadow-lg"
                >
                   Continue with Apple
                </motion.button>
                <motion.button
                  onClick={() => finish('google')}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-2xl bg-card/90 backdrop-blur-sm border border-border font-semibold text-[15px] flex items-center justify-center gap-2.5 text-foreground shadow-sm"
                >
                  Continue with Google
                </motion.button>
                <div className="pt-1">
                  <button
                    onClick={() => finish('guest')}
                    className="w-full py-3 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Next button — matches hero minimal style */}
        {!current.hasAuth && (
          <motion.button
            onClick={next}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-md mt-auto"
          >
            Next <ChevronRight size={18} />
          </motion.button>
        )}
      </div>

      {/* Grain texture overlay */}
      <div className="grain absolute inset-0 pointer-events-none z-20" />
    </div>
  );
}
