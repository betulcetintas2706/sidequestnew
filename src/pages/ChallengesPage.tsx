import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Star } from 'lucide-react';
import { seedChallenges, seedSpots } from '@/data/seedData';
import BottomTabBar from '@/components/BottomTabBar';

const difficultyColors: Record<string, string> = {
  easy: 'bg-secondary/20 text-secondary',
  medium: 'bg-accent/20 text-accent',
  hard: 'bg-primary/20 text-primary',
};

// Map challenges to spot images for visual richness
const challengeImages = [seedSpots[0].imageUrl, seedSpots[2].imageUrl, seedSpots[4].imageUrl, seedSpots[6].imageUrl];

export default function ChallengesPage() {
  const navigate = useNavigate();
  const active = seedChallenges.filter(c => c.active);
  const featured = active[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-display text-foreground">Challenges</h1>
        <p className="text-sm text-muted-foreground mt-1">Find hidden gems in your city</p>
      </div>

      {/* Featured — full-bleed image card */}
      {featured && (
        <div className="px-5 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/challenge/' + featured.id)}
            className="rounded-2xl overflow-hidden cursor-pointer relative"
          >
            <div className="aspect-[16/9] relative">
              <img src={challengeImages[0]} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-accent/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                <Zap className="text-white" size={11} />
                <span className="text-[10px] font-semibold text-white uppercase">Featured</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-display text-white mb-1">{featured.title}</h3>
                <p className="text-xs text-white/70 mb-2 leading-relaxed line-clamp-2">{featured.description}</p>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize bg-white/20 text-white`}>
                    {featured.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/80">
                    <Star size={12} /> {featured.rewardPoints} pts
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Other challenges */}
      <div className="px-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Nearby</h3>
        <div className="columns-2 gap-3 space-y-3">
          {active.slice(1).map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => navigate('/challenge/' + c.id)}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer relative group"
            >
              <div className="aspect-square relative">
                <img src={challengeImages[(i + 1) % challengeImages.length]} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-sm text-white font-semibold leading-tight">{c.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold capitalize bg-white/20 text-white`}>
                      {c.difficulty}
                    </span>
                    <span className="text-[10px] text-white/70">{c.rewardPoints} pts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}
