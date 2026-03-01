import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Flame, Trophy, ChevronRight, MapPin, Target } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { seedSpots } from '@/data/seedData';
import BottomTabBar from '@/components/BottomTabBar';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const trendingSpots = [seedSpots[0], seedSpots[4], seedSpots[1], seedSpots[5], seedSpots[9]];

export default function HomePage() {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header — minimal, no rule */}
      <div className="px-5 pt-14 pb-1">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="text-[11px] text-muted-foreground">{getGreeting()}</p>
          <div className="flex items-baseline justify-between">
            <h1 className="text-2xl font-display text-foreground">{user.name}</h1>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><Trophy size={12} className="text-accent" /> {user.points}</span>
              <span className="flex items-center gap-1"><Flame size={12} className="text-primary" /> {user.streak}d</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Start route — inline tap target, not a block */}
      <div className="px-5 py-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/mode-select')}
          className="w-full flex items-center gap-3 py-3 group"
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(18 52% 53%), hsl(30 52% 58%))' }}>
            <Compass className="text-primary-foreground" size={20} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-foreground">Start a Route</p>
            <p className="text-[11px] text-muted-foreground">Choose a mode and explore your city</p>
          </div>
          <ChevronRight className="text-muted-foreground/40" size={18} />
        </motion.button>
      </div>

      {/* Quick actions — small inline chips */}
      <div className="px-5 pb-5 flex gap-2">
        <button onClick={() => navigate('/challenges')} className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-muted text-xs font-medium text-foreground">
          <Target size={13} className="text-secondary" /> Challenges
        </button>
        <button onClick={() => navigate('/explore')} className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-muted text-xs font-medium text-foreground">
          <MapPin size={13} className="text-primary" /> Explore
        </button>
      </div>

      {/* Feed — flowing image content, no sections */}
      <div className="px-5 pb-2 flex items-center justify-between">
        <p className="text-xs font-semibold text-foreground">Trending near you</p>
        <button onClick={() => navigate('/explore')} className="text-[11px] text-primary font-medium">See all</button>
      </div>

      <div className="px-4 columns-2 gap-2.5 space-y-2.5">
        {trendingSpots.map((spot, i) => {
          const heights = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-square', 'aspect-[3/4]'];
          return (
            <motion.button
              key={spot.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              onClick={() => navigate('/stop/' + spot.id)}
              className="break-inside-avoid w-full rounded-xl overflow-hidden relative group text-left"
            >
              <div className={`${heights[i]} relative`}>
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <p className="text-[13px] text-white font-semibold leading-tight">{spot.name}</p>
                  <p className="text-[10px] text-white/60 mt-0.5">{spot.category}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Leaderboard — simple inline list, no well/card */}
      <div className="px-5 pt-6 pb-2">
        <p className="text-xs font-semibold text-foreground mb-3">Weekly Leaderboard</p>
        {['@adventurer_sam', '@urban_wanderer', '@nature_nina'].map((name, i) => (
          <div key={name} className={`flex items-center gap-3 py-2.5 ${i > 0 ? 'border-t border-border/40' : ''}`}>
            <span className={`text-[11px] font-mono w-4 ${i === 0 ? 'text-accent font-bold' : 'text-muted-foreground/50'}`}>
              {i + 1}
            </span>
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
              <span className="text-[10px] font-semibold text-muted-foreground">{name[1].toUpperCase()}</span>
            </div>
            <span className="flex-1 text-sm text-foreground">{name}</span>
            <span className="text-[11px] text-muted-foreground tabular-nums">{[320, 285, 240][i]} pts</span>
          </div>
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
}
