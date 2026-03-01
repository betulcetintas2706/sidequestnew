import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Flame, Trophy, ChevronRight, MapPin, Target, ArrowUpRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { seedSpots } from '@/data/seedData';
import BottomTabBar from '@/components/BottomTabBar';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const trendingSpots = [seedSpots[0], seedSpots[4], seedSpots[1]];

export default function HomePage() {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 grain">
      {/* Header */}
      <div className="px-6 pt-14 pb-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            {getGreeting()}
          </p>
          <h1 className="text-3xl font-display text-foreground mt-1 leading-tight">{user.name}</h1>
          <div className="editorial-rule mt-3" />
        </motion.div>
      </div>

      {/* Stats */}
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

      {/* Primary CTA */}
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
            <p className="text-lg font-display text-primary-foreground leading-snug">Start a Route</p>
            <p className="text-xs text-primary-foreground/70 mt-1">Choose a mode and explore your city</p>
          </div>
          <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-primary-foreground/40" size={24} />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary-foreground/5" />
        </motion.button>
      </div>

      {/* Quick actions — image cards instead of text wells */}
      <div className="px-5 mb-8 flex gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/challenges')}
          className="flex-1 rounded-2xl overflow-hidden relative aspect-[4/3]"
        >
          <img src={seedSpots[6].imageUrl} alt="Challenges" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <Target className="text-white/80 mb-1" size={16} />
            <p className="text-sm font-semibold text-white">Find It</p>
            <p className="text-[10px] text-white/70">Photo challenges</p>
          </div>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/explore')}
          className="flex-1 rounded-2xl overflow-hidden relative aspect-[4/3]"
        >
          <img src={seedSpots[4].imageUrl} alt="Explore" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <MapPin className="text-white/80 mb-1" size={16} />
            <p className="text-sm font-semibold text-white">Explore</p>
            <p className="text-[10px] text-white/70">Nearby spots</p>
          </div>
        </motion.button>
      </div>

      {/* Trending — Airbnb horizontal scroll cards */}
      <div className="mb-8">
        <div className="px-6 flex items-center justify-between mb-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
            Trending near you
          </p>
          <button onClick={() => navigate('/explore')} className="text-[11px] text-primary font-medium">See all</button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
          {trendingSpots.map((spot, i) => (
            <motion.button
              key={spot.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              onClick={() => navigate('/stop/' + spot.id)}
              className="flex-shrink-0 w-40 rounded-2xl overflow-hidden relative group"
            >
              <div className="aspect-[3/4] relative">
                <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs text-white font-semibold leading-tight">{spot.name}</p>
                  <p className="text-[10px] text-white/60 mt-0.5">{spot.category} · 0.{i + 2} mi</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Weekly leaderboard */}
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
                <span className="text-[10px] font-semibold text-muted-foreground">{name[1].toUpperCase()}</span>
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
