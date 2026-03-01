import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Flame, Trophy, ChevronRight, Zap, Star, Crown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { seedSpots, seedChallenges } from '@/data/seedData';
import BottomTabBar from '@/components/BottomTabBar';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const trendingSpots = [seedSpots[0], seedSpots[4], seedSpots[9], seedSpots[1], seedSpots[5]];
const activeChallenges = seedChallenges.filter(c => c.active).slice(0, 2);
const challengeImages = [seedSpots[2].imageUrl, seedSpots[6].imageUrl];

const leaderboard = [
  { name: 'adventurer_sam', points: 320, avatar: '🏔️' },
  { name: 'urban_wanderer', points: 285, avatar: '🌆' },
  { name: 'nature_nina', points: 240, avatar: '🌿' },
];

export default function HomePage() {
  const { user } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="text-[11px] text-muted-foreground tracking-wide uppercase">{getGreeting()}</p>
          <h1 className="text-[1.65rem] font-display text-foreground mt-0.5">{user.name}</h1>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="px-5 py-3">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <div className="flex-1 rounded-2xl bg-card border border-border/50 px-4 py-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(30 52% 64%), hsl(30 60% 72%))' }}>
              <Trophy size={14} className="text-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground leading-none">{user.points}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">points</p>
            </div>
          </div>
          <div className="flex-1 rounded-2xl bg-card border border-border/50 px-4 py-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsl(18 52% 53%), hsl(18 60% 60%))' }}>
              <Flame size={14} className="text-primary-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground leading-none">{user.streak}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">day streak</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Start route CTA */}
      <div className="px-5 py-2">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
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

      {/* Trending Near You */}
      <div className="mt-2">
        <div className="px-5 pb-2 flex items-center justify-between">
          <div>
            <div className="editorial-rule mb-2" />
            <p className="text-base font-display text-foreground">Trending near you</p>
          </div>
          <button onClick={() => navigate('/explore')} className="text-[11px] text-primary font-medium flex items-center gap-0.5">
            See all <ChevronRight size={13} />
          </button>
        </div>

        <div className="px-4 columns-2 gap-2.5 space-y-2.5">
          {trendingSpots.slice(0, 2).map((spot, i) => {
            const heights = ['aspect-[3/4]', 'aspect-square'];
            return (
              <motion.button
                key={spot.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                onClick={() => navigate('/stop/' + spot.id)}
                className="break-inside-avoid w-full rounded-xl overflow-hidden relative group text-left"
              >
                <div className={`${heights[i]} relative`}>
                  <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <p className="text-[13px] text-white font-semibold leading-tight">{spot.name}</p>
                    <p className="text-[10px] text-white/60 mt-0.5">{spot.category}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}

          {/* Challenge woven in */}
          {activeChallenges[0] && (
            <motion.button
              key={'challenge-' + activeChallenges[0].id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              onClick={() => navigate('/challenge/' + activeChallenges[0].id)}
              className="break-inside-avoid w-full rounded-xl overflow-hidden relative group text-left"
            >
              <div className="aspect-[4/5] relative">
                <img src={challengeImages[0]} alt={activeChallenges[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-accent/90 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <Zap className="text-accent-foreground" size={10} />
                  <span className="text-[9px] font-semibold text-accent-foreground uppercase tracking-wide">Challenge</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <p className="text-[13px] text-white font-semibold leading-tight">{activeChallenges[0].title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star size={10} className="text-white/70" />
                    <span className="text-[10px] text-white/60">{activeChallenges[0].rewardPoints} pts</span>
                  </div>
                </div>
              </div>
            </motion.button>
          )}

          {trendingSpots.slice(2, 4).map((spot, i) => {
            const heights = ['aspect-square', 'aspect-[3/4]'];
            return (
              <motion.button
                key={spot.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 + i * 0.06, duration: 0.4 }}
                onClick={() => navigate('/stop/' + spot.id)}
                className="break-inside-avoid w-full rounded-xl overflow-hidden relative group text-left"
              >
                <div className={`${heights[i]} relative`}>
                  <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
      </div>

      {/* Weekly Leaderboard */}
      <div className="mt-6 px-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="editorial-rule mb-2" />
            <p className="text-base font-display text-foreground">Weekly leaderboard</p>
          </div>
          <button onClick={() => navigate('/leaderboards')} className="text-[11px] text-primary font-medium flex items-center gap-0.5">
            View all <ChevronRight size={13} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="rounded-2xl bg-card border border-border/50 overflow-hidden"
        >
          {leaderboard.map((entry, i) => (
            <div key={entry.name} className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-border/40' : ''}`}>
              <span className={`text-xs font-bold w-5 text-center ${i === 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                {i === 0 ? <Crown size={14} className="text-accent mx-auto" /> : i + 1}
              </span>
              <div className="w-8 h-8 rounded-full bg-muted/70 flex items-center justify-center text-sm">
                {entry.avatar}
              </div>
              <span className="flex-1 text-sm text-foreground font-medium">@{entry.name}</span>
              <span className="text-xs text-muted-foreground font-medium">{entry.points} pts</span>
            </div>
          ))}

          {/* Current user */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-t border-border/40 bg-primary/5">
            <span className="text-xs font-bold w-5 text-center text-muted-foreground">—</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-display text-primary">
              {user.name[0]}
            </div>
            <span className="flex-1 text-sm text-primary font-semibold">You</span>
            <span className="text-xs text-primary font-medium">{user.points} pts</span>
          </div>
        </motion.div>
      </div>

      {/* Second challenge at bottom */}
      {activeChallenges[1] && (
        <div className="mt-6 px-4">
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            onClick={() => navigate('/challenge/' + activeChallenges[1].id)}
            className="w-full rounded-xl overflow-hidden relative group text-left"
          >
            <div className="aspect-[2/1] relative">
              <img src={challengeImages[1]} alt={activeChallenges[1].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-accent/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                <Zap className="text-accent-foreground" size={11} />
                <span className="text-[10px] font-semibold text-accent-foreground uppercase tracking-wide">Challenge</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <p className="text-[15px] text-white font-semibold leading-tight">{activeChallenges[1].title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star size={11} className="text-white/70" />
                  <span className="text-[11px] text-white/60">{activeChallenges[1].rewardPoints} pts</span>
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      )}

      {/* Last trending spot */}
      {trendingSpots[4] && (
        <div className="mt-2.5 px-4">
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            onClick={() => navigate('/stop/' + trendingSpots[4].id)}
            className="w-full rounded-xl overflow-hidden relative group text-left"
          >
            <div className="aspect-[2/1] relative">
              <img src={trendingSpots[4].imageUrl} alt={trendingSpots[4].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <p className="text-[15px] text-white font-semibold leading-tight">{trendingSpots[4].name}</p>
                <p className="text-[11px] text-white/60 mt-0.5">{trendingSpots[4].category}</p>
              </div>
            </div>
          </motion.button>
        </div>
      )}

      <BottomTabBar />
    </div>
  );
}
