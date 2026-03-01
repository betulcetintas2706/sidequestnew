import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Flame, Trophy, ChevronRight, Zap, Star } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { seedSpots, seedChallenges } from '@/data/seedData';
import BottomTabBar from '@/components/BottomTabBar';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// Interleave spots and challenges into a single feed
const feedSpots = [seedSpots[0], seedSpots[4], seedSpots[1], seedSpots[5], seedSpots[9]];
const activeChallenges = seedChallenges.filter(c => c.active).slice(0, 2);
const challengeImages = [seedSpots[2].imageUrl, seedSpots[6].imageUrl];

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

      {/* Feed — mixed spots & challenges, no sections */}
      <div className="px-5 pb-2 flex items-center justify-between">
        <p className="text-xs font-semibold text-foreground">For you</p>
      </div>

      <div className="px-4 columns-2 gap-2.5 space-y-2.5">
        {/* First two spots */}
        {feedSpots.slice(0, 2).map((spot, i) => {
          const heights = ['aspect-[3/4]', 'aspect-square'];
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

        {/* Inline challenge card woven into the feed */}
        {activeChallenges[0] && (
          <motion.button
            key={'challenge-' + activeChallenges[0].id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.4 }}
            onClick={() => navigate('/challenge/' + activeChallenges[0].id)}
            className="break-inside-avoid w-full rounded-xl overflow-hidden relative group text-left"
          >
            <div className="aspect-[4/5] relative">
              <img src={challengeImages[0]} alt={activeChallenges[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-accent/90 backdrop-blur-sm rounded-full px-2 py-0.5">
                <Zap className="text-accent-foreground" size={10} />
                <span className="text-[9px] font-semibold text-accent-foreground uppercase">Challenge</span>
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

        {/* More spots */}
        {feedSpots.slice(2, 4).map((spot, i) => {
          const heights = ['aspect-square', 'aspect-[3/4]'];
          return (
            <motion.button
              key={spot.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 3) * 0.06, duration: 0.4 }}
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

        {/* Second challenge */}
        {activeChallenges[1] && (
          <motion.button
            key={'challenge-' + activeChallenges[1].id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.4 }}
            onClick={() => navigate('/challenge/' + activeChallenges[1].id)}
            className="break-inside-avoid w-full rounded-xl overflow-hidden relative group text-left"
          >
            <div className="aspect-square relative">
              <img src={challengeImages[1]} alt={activeChallenges[1].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-accent/90 backdrop-blur-sm rounded-full px-2 py-0.5">
                <Zap className="text-accent-foreground" size={10} />
                <span className="text-[9px] font-semibold text-accent-foreground uppercase">Challenge</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-[13px] text-white font-semibold leading-tight">{activeChallenges[1].title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star size={10} className="text-white/70" />
                  <span className="text-[10px] text-white/60">{activeChallenges[1].rewardPoints} pts</span>
                </div>
              </div>
            </div>
          </motion.button>
        )}

        {/* Last spot */}
        {feedSpots[4] && (
          <motion.button
            key={feedSpots[4].id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.4 }}
            onClick={() => navigate('/stop/' + feedSpots[4].id)}
            className="break-inside-avoid w-full rounded-xl overflow-hidden relative group text-left"
          >
            <div className="aspect-[3/4] relative">
              <img src={feedSpots[4].imageUrl} alt={feedSpots[4].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-[13px] text-white font-semibold leading-tight">{feedSpots[4].name}</p>
                <p className="text-[10px] text-white/60 mt-0.5">{feedSpots[4].category}</p>
              </div>
            </div>
          </motion.button>
        )}
      </div>



      <BottomTabBar />
    </div>
  );
}
