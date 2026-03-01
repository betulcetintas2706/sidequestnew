import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Flame, Trophy, ChevronRight, MapPin, Target, ArrowUpRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import BottomTabBar from '@/components/BottomTabBar';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomePage() {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 grain">
      {/* Header — editorial style */}
      <div className="px-6 pt-14 pb-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            {getGreeting()}
          </p>
          <h1 className="text-3xl font-display text-foreground mt-1 leading-tight">{user.name}</h1>
          <div className="editorial-rule mt-3" />
        </motion.div>
      </div>

      {/* Stats — inline, not carded */}
      <div className="px-6 py-4 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Trophy className="text-accent" size={16} />
          <span className="text-sm font-semibold text-foreground">{user.points}</span>
          <span className="text-[11px] text-muted-foreground">pts</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-2">
          <Flame className="text-primary" size={16} />
          <span className="text-sm font-semibold text-foreground">{user.streak}</span>
          <span className="text-[11px] text-muted-foreground">day streak</span>
        </div>
      </div>

      {/* Primary CTA — full-bleed gradient, not a card */}
      <div className="px-5 mb-8">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/mode-select')}
          className="w-full relative overflow-hidden rounded-2xl p-6 text-left"
          style={{
            background: 'linear-gradient(135deg, hsl(18 52% 53%), hsl(30 52% 58%))',
          }}
        >
          <div className="relative z-10">
            <Compass className="text-primary-foreground/80 mb-3" size={28} />
            <p className="text-lg font-display text-primary-foreground leading-snug">
              Start a Route
            </p>
            <p className="text-xs text-primary-foreground/70 mt-1">
              Choose a mode and explore your city
            </p>
          </div>
          <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-primary-foreground/40" size={24} />
          {/* Decorative circle */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary-foreground/5" />
        </motion.button>
      </div>

      {/* Quick actions — asymmetric, text-led instead of icon-centered */}
      <div className="px-6 mb-8 flex gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/challenges')}
          className="flex-1 well text-left group"
        >
          <Target className="text-secondary mb-2" size={18} />
          <p className="text-sm font-semibold text-foreground">Find It</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Photo challenges</p>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/explore')}
          className="flex-1 well text-left group"
        >
          <MapPin className="text-primary mb-2" size={18} />
          <p className="text-sm font-semibold text-foreground">Explore</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Nearby spots</p>
        </motion.button>
      </div>

      {/* Trending — editorial list, not card carousel */}
      <div className="px-6 mb-8">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-3">
          Trending near you
        </p>
        <div className="space-y-0 divide-y divide-border">
          {['Hidden Mural Alley', 'Rooftop Garden Café', 'Sunset Overlook'].map((name, i) => (
            <motion.button
              key={name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="w-full flex items-center justify-between py-3.5 group text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground/60 font-mono w-4">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{name}</p>
                  <p className="text-[10px] text-muted-foreground">0.{i + 2} mi</p>
                </div>
              </div>
              <ArrowUpRight className="text-muted-foreground/40 group-hover:text-primary transition-colors" size={14} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Weekly leaderboard — compact, editorial */}
      <div className="px-6 mb-6">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-3">
          Weekly Leaderboard
        </p>
        <div className="well">
          {['@adventurer_sam', '@urban_wanderer', '@nature_nina'].map((name, i) => (
            <div key={name} className={`flex items-center gap-3 ${i > 0 ? 'mt-2.5 pt-2.5 border-t border-border/50' : ''}`}>
              <span className={`text-xs font-mono w-4 ${i === 0 ? 'text-accent font-bold' : 'text-muted-foreground/60'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="w-7 h-7 rounded-full bg-border flex items-center justify-center">
                <span className="text-[10px] font-semibold text-muted-foreground">
                  {name[1].toUpperCase()}
                </span>
              </div>
              <span className="flex-1 text-sm text-foreground">{name}</span>
              <span className="text-[11px] text-muted-foreground tabular-nums">{[320, 285, 240][i]}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}
