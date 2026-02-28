import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Flame, Star, Share2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function CompletionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { incrementStreak, setCurrentRoute } = useApp();

  const pointsEarned = Number(searchParams.get('points') || 0);
  const stopsVisited = Number(searchParams.get('visited') || 0);
  const totalStops = Number(searchParams.get('total') || 0);

  const handleDone = () => {
    incrementStreak();
    setCurrentRoute(null);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6"
      >
        <Star className="text-accent" size={40} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-display text-foreground mb-2"
      >
        Quest Complete!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground text-sm mb-8"
      >
        You visited {stopsVisited} of {totalStops} stops
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex gap-6 mb-10"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center">
            <Trophy className="text-accent" size={24} />
          </div>
          <span className="text-lg font-semibold text-foreground">{pointsEarned}</span>
          <span className="text-[11px] text-muted-foreground">Points</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
            <Flame className="text-primary" size={24} />
          </div>
          <span className="text-lg font-semibold text-foreground">+1</span>
          <span className="text-[11px] text-muted-foreground">Streak</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full space-y-3"
      >
        <button
          onClick={handleDone}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:scale-[0.98] transition-transform"
        >
          Back to Home
        </button>
        <button className="w-full py-3 rounded-2xl bg-muted text-foreground font-medium text-sm flex items-center justify-center gap-2">
          <Share2 size={16} /> Share Achievement
        </button>
      </motion.div>
    </div>
  );
}
