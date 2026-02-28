import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, Star, MapPin, Camera, Award, Compass, Archive } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function CompletionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { incrementStreak, setCurrentRoute, addPoints, user, memories } = useApp();

  const pointsEarned = Number(searchParams.get('points') || 0);
  const stopsVisited = Number(searchParams.get('visited') || 0);
  const totalStops = Number(searchParams.get('total') || 0);
  const questTokens = (stopsVisited * 0.5).toFixed(1);

  const [animateIn, setAnimateIn] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    // Update profile
    addPoints(pointsEarned);
    incrementStreak();

    const t1 = setTimeout(() => setAnimateIn(true), 100);
    const t2 = setTimeout(() => setShowBadge(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNewRoute = () => {
    setCurrentRoute(null);
    navigate('/home');
  };

  const handleViewVault = () => {
    setCurrentRoute(null);
    navigate('/vault');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-6 pt-16 pb-10 overflow-y-auto">
      {/* Star badge */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={animateIn ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', damping: 12, stiffness: 100 }}
        className="relative mb-8"
      >
        <div className="w-36 h-36 rounded-full bg-accent/15 flex items-center justify-center">
          <Star className="text-accent" size={64} strokeWidth={1.5} />
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl -z-10" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={animateIn ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-display text-foreground mb-2">Route Complete!</h1>
        <p className="text-sm text-muted-foreground">You discovered something new today.</p>
      </motion.div>

      {/* Stats summary card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={animateIn ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="ios-card p-5 w-full mb-4"
      >
        <div className="flex justify-around mb-4">
          <div className="flex flex-col items-center gap-1.5">
            <MapPin className="text-secondary" size={18} />
            <span className="text-xl font-semibold text-foreground">{stopsVisited}</span>
            <span className="text-[10px] text-muted-foreground">Stops visited</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Star className="text-accent" size={18} />
            <span className="text-xl font-semibold text-foreground">{pointsEarned}</span>
            <span className="text-[10px] text-muted-foreground">Points earned</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Camera className="text-primary" size={18} />
            <span className="text-xl font-semibold text-foreground">{memories.length}</span>
            <span className="text-[10px] text-muted-foreground">Memories</span>
          </div>
        </div>

        <div className="h-px bg-border mb-4" />

        {/* Token reward */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-secondary">$</span>
          </div>
          <span className="text-sm font-medium text-secondary">+{questTokens} $QUEST earned</span>
        </div>
      </motion.div>

      {/* Badge earned */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 200 }}
            className="ios-card p-4 w-full mb-8"
          >
            <div className="flex items-center gap-3">
              <Award className="text-accent flex-shrink-0" size={28} />
              <div>
                <p className="text-sm font-semibold text-accent">New Badge!</p>
                <p className="text-[11px] text-muted-foreground">Route Explorer — Complete your first route</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={animateIn ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full space-y-3 mt-auto"
      >
        <button
          onClick={handleNewRoute}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <Compass size={18} /> Start a New Route
        </button>
        <button
          onClick={handleViewVault}
          className="w-full py-3.5 rounded-2xl bg-muted text-foreground font-medium text-sm flex items-center justify-center gap-2"
        >
          <Archive size={16} /> View Memory Vault
        </button>
      </motion.div>
    </div>
  );
}
