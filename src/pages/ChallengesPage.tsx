import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Compass, UtensilsCrossed, TreePine, Palette, Users, Sparkles, Target, Star } from 'lucide-react';
import BottomTabBar from '@/components/BottomTabBar';
import { NavigatorMode } from '@/types';

interface Challenge {
  id: string;
  title: string;
  description: string;
  pointsReward: number;
  category: NavigatorMode;
}

const challenges: Challenge[] = [
  { id: 'ch1', title: 'First Steps', description: 'Complete your first discovery route', pointsReward: 50, category: 'adventure' },
  { id: 'ch2', title: 'Memory Keeper', description: 'Capture 5 memories during routes', pointsReward: 75, category: 'culture' },
  { id: 'ch3', title: 'Local Foodie', description: 'Visit 3 cafes or restaurants on foodie routes', pointsReward: 100, category: 'foodie' },
  { id: 'ch4', title: 'Nature Walker', description: 'Complete a nature route with all stops', pointsReward: 100, category: 'nature' },
  { id: 'ch5', title: 'Social Butterfly', description: 'Share 3 memories publicly', pointsReward: 75, category: 'social' },
  { id: 'ch6', title: 'Mystery Solver', description: 'Complete 2 mystery mode routes', pointsReward: 150, category: 'mystery' },
  { id: 'ch7', title: 'Bold Explorer', description: 'Complete a route with Bold detour level', pointsReward: 125, category: 'adventure' },
  { id: 'ch8', title: 'Week Warrior', description: 'Maintain a 7-day exploration streak', pointsReward: 200, category: 'adventure' },
];

const categoryConfig: Record<NavigatorMode, { icon: typeof Compass; color: string; bgColor: string }> = {
  adventure: { icon: Compass, color: 'text-primary', bgColor: 'bg-primary/15' },
  foodie: { icon: UtensilsCrossed, color: 'text-accent', bgColor: 'bg-accent/15' },
  nature: { icon: TreePine, color: 'text-secondary', bgColor: 'bg-secondary/15' },
  culture: { icon: Palette, color: 'text-primary', bgColor: 'bg-primary/15' },
  social: { icon: Users, color: 'text-accent', bgColor: 'bg-accent/15' },
  mystery: { icon: Sparkles, color: 'text-secondary', bgColor: 'bg-secondary/15' },
};

function PointsBadge({ points }: { points: number }) {
  return (
    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
      <Star size={12} /> {points}
    </span>
  );
}

export default function ChallengesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-14 pb-2">
        {/* Header */}
        <h1 className="text-2xl font-display text-foreground">Challenges</h1>
        <p className="text-sm text-muted-foreground mt-1">Earn points and badges by exploring</p>
      </div>

      <div className="px-5 mt-5 mb-5">
        {/* Daily challenge highlight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="ios-card p-4 shadow-ios-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Flame className="text-accent" size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-accent">Daily Challenge</p>
              <p className="text-xs text-muted-foreground mt-0.5">Explore a new neighborhood today</p>
            </div>
            <PointsBadge points={50} />
          </div>
        </motion.div>
      </div>

      {/* All Challenges */}
      <div className="px-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">All Challenges</h3>
        <div className="space-y-2">
          {challenges.map((c, i) => {
            const config = categoryConfig[c.category];
            const Icon = config.icon;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="ios-card p-3 flex items-center gap-3"
              >
                <div className={`w-11 h-11 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={config.color} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{c.title}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{c.description}</p>
                </div>
                <PointsBadge points={c.pointsReward} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}
