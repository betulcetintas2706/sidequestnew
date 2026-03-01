import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Flame, Trophy, ChevronRight, Zap, Star, Crown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { seedSpots, seedChallenges } from '@/data/seedData';
import BottomTabBar from '@/components/BottomTabBar';

import heroImg from '@/assets/hero/train.jpg';


function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const trendingSpots = [seedSpots[0], seedSpots[4], seedSpots[9], seedSpots[1], seedSpots[5], seedSpots[7]];
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
      {/* Hero header — compact */}
      <div className="relative h-[180px] overflow-hidden">
        <motion.img
          src={heroImg}
          alt=""
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="grain absolute inset-0 pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">{getGreeting()}</p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h1 className="text-[1.5rem] font-display text-foreground leading-none">{user.name}</h1>
              <span className="text-[10px] text-muted-foreground italic font-display">· explorer</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex items-center gap-4 mt-2.5"
          >
            <div className="flex items-center gap-1.5">
              <Trophy size={13} className="text-accent" />
              <span className="text-sm font-semibold text-foreground">{user.points}</span>
              <span className="text-[10px] text-muted-foreground">pts</span>
            </div>
            <div className="w-px h-3 bg-border/50" />
            <div className="flex items-center gap-1.5">
              <Flame size={13} className="text-primary" />
              <span className="text-sm font-semibold text-foreground">{user.streak}</span>
              <span className="text-[10px] text-muted-foreground">day streak</span>
            </div>
            <div className="w-px h-3 bg-border/50" />
            <div className="flex items-center gap-1.5">
              <Compass size={13} className="text-secondary" />
              <span className="text-sm font-semibold text-foreground">{user.routesCompleted}</span>
              <span className="text-[10px] text-muted-foreground">routes</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Start route — fluid, not boxy */}
      <div className="px-5 py-4">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/mode-select')}
          className="w-full flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, hsl(18 52% 53%), hsl(30 52% 58%))' }}>
            <Compass className="text-primary-foreground" size={20} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-foreground">Start a Route</p>
            <p className="text-[11px] text-muted-foreground">Choose a mode and explore your city</p>
          </div>
          <ChevronRight className="text-muted-foreground/40" size={18} />
        </motion.button>
      </div>

      {/* Trending Near You — editorial header */}
      <div className="px-5 flex items-end justify-between mb-3">
        <div>
          <div className="editorial-rule mb-2" />
          <h2 className="text-lg font-display text-foreground">Trending near you</h2>
        </div>
        <button onClick={() => navigate('/explore')} className="text-[11px] text-primary font-medium flex items-center gap-0.5 pb-0.5">
          See all <ChevronRight size={13} />
        </button>
      </div>

      {/* Masonry feed */}
      <div className="px-4 columns-2 gap-2.5 space-y-2.5">
        {trendingSpots.slice(0, 2).map((spot, i) => (
          <SpotCard key={spot.id} spot={spot} aspect={i === 0 ? 'aspect-[3/4]' : 'aspect-square'} delay={0.35 + i * 0.06} navigate={navigate} />
        ))}

        {activeChallenges[0] && (
          <ChallengeCard challenge={activeChallenges[0]} image={challengeImages[0]} aspect="aspect-[4/5]" delay={0.47} navigate={navigate} />
        )}

        {trendingSpots.slice(2, 4).map((spot, i) => (
          <SpotCard key={spot.id} spot={spot} aspect={i === 0 ? 'aspect-square' : 'aspect-[3/4]'} delay={0.5 + i * 0.06} navigate={navigate} />
        ))}
      </div>

      {/* Weekly Leaderboard — editorial, minimal */}
      <div className="px-5 mt-8 mb-2">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="editorial-rule mb-2" />
            <h2 className="text-lg font-display text-foreground">Weekly leaderboard</h2>
          </div>
          <button onClick={() => navigate('/leaderboards')} className="text-[11px] text-primary font-medium flex items-center gap-0.5 pb-0.5">
            View all <ChevronRight size={13} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
        >
          {leaderboard.map((entry, i) => (
            <div key={entry.name} className={`flex items-center gap-3 py-3 ${i > 0 ? 'border-t border-border/30' : ''}`}>
              {i === 0 ? (
                <Crown size={14} className="text-accent w-5 shrink-0" />
              ) : (
                <span className="text-[11px] font-bold text-muted-foreground w-5 text-center shrink-0">{i + 1}</span>
              )}
              <div className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-sm shrink-0">
                {entry.avatar}
              </div>
              <span className="flex-1 text-[13px] text-foreground">@{entry.name}</span>
              <span className="text-[11px] text-muted-foreground">{entry.points} pts</span>
            </div>
          ))}

          {/* You */}
          <div className="flex items-center gap-3 py-3 border-t border-primary/15">
            <span className="text-[11px] font-bold text-primary w-5 text-center shrink-0">—</span>
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[13px] font-display text-primary shrink-0">
              {user.name[0]}
            </div>
            <span className="flex-1 text-[13px] text-primary font-medium">You</span>
            <span className="text-[11px] text-primary">{user.points} pts</span>
          </div>
        </motion.div>
      </div>

      {/* More to explore */}
      <div className="px-4 columns-2 gap-2.5 space-y-2.5 mt-4">
        {activeChallenges[1] && (
          <ChallengeCard challenge={activeChallenges[1]} image={challengeImages[1]} aspect="aspect-square" delay={0.6} navigate={navigate} />
        )}
        {trendingSpots.slice(4).map((spot, i) => (
          <SpotCard key={spot.id} spot={spot} aspect={i === 0 ? 'aspect-[3/4]' : 'aspect-square'} delay={0.63 + i * 0.05} navigate={navigate} />
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
}

/* ——— Sub-components ——— */

function SpotCard({ spot, aspect, delay, navigate }: { spot: any; aspect: string; delay: number; navigate: any }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onClick={() => navigate('/stop/' + spot.id)}
      className="break-inside-avoid w-full rounded-xl overflow-hidden relative group text-left"
    >
      <div className={`${aspect} relative`}>
        <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="text-[13px] text-white font-semibold leading-tight">{spot.name}</p>
          <p className="text-[10px] text-white/60 mt-0.5">{spot.category}</p>
        </div>
      </div>
    </motion.button>
  );
}

function ChallengeCard({ challenge, image, aspect, delay, navigate }: { challenge: any; image: string; aspect: string; delay: number; navigate: any }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onClick={() => navigate('/challenge/' + challenge.id)}
      className="break-inside-avoid w-full rounded-xl overflow-hidden relative group text-left"
    >
      <div className={`${aspect} relative`}>
        <img src={image} alt={challenge.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-accent/90 backdrop-blur-sm rounded-full px-2 py-0.5">
          <Zap className="text-accent-foreground" size={10} />
          <span className="text-[9px] font-semibold text-accent-foreground uppercase tracking-wide">Challenge</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="text-[13px] text-white font-semibold leading-tight">{challenge.title}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <Star size={10} className="text-white/70" />
            <span className="text-[10px] text-white/60">{challenge.rewardPoints} pts</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
