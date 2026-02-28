import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Flame, Map, Compass } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { NavigatorMode } from '@/types';
import BottomTabBar from '@/components/BottomTabBar';

const modes: { id: NavigatorMode; emoji: string; label: string; tagline: string }[] = [
  { id: 'adventure', emoji: '🧭', label: 'Adventure', tagline: 'Urban exploration, rooftops & hidden passages' },
  { id: 'foodie', emoji: '🍜', label: 'Foodie', tagline: 'Cafés, street food & hole-in-the-wall gems' },
  { id: 'nature', emoji: '🌿', label: 'Nature', tagline: 'Parks, trails, gardens & waterways' },
  { id: 'culture', emoji: '🎭', label: 'Culture', tagline: 'Murals, galleries & historic landmarks' },
  { id: 'social', emoji: '🤝', label: 'Social', tagline: 'Markets, community spaces & live music' },
  { id: 'mystery', emoji: '🔮', label: 'Mystery', tagline: 'Random surprises — no spoilers' },
];

const modeColors: Record<NavigatorMode, string> = {
  adventure: 'text-primary',
  foodie: 'text-accent',
  nature: 'text-secondary',
  culture: 'text-primary',
  social: 'text-accent',
  mystery: 'text-secondary',
};

export default function HomePage() {
  const { user, routeConfig, setRouteConfig, isMysteryMode, setIsMysteryMode } = useApp();
  const navigate = useNavigate();

  const selectedMode = routeConfig.mode || 'adventure';
  const currentModeData = modes.find(m => m.id === selectedMode)!;

  const handleModeSelect = (mode: NavigatorMode) => {
    setRouteConfig({ mode });
    setIsMysteryMode(mode === 'mystery');
  };

  const handleStartRoute = () => {
    if (isMysteryMode) {
      navigate('/route-preview');
    } else {
      navigate('/shape-adventure');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-display bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          SideQuest
        </motion.h1>
        <p className="text-sm text-muted-foreground mt-1">What will you discover today?</p>
      </div>

      {/* Stats */}
      <div className="px-5 mt-5 mb-6">
        <div className="flex gap-3">
          {[
            { icon: Star, value: user.points, label: 'Points', color: 'text-accent', bg: 'bg-accent/15' },
            { icon: Flame, value: `${user.streak}d`, label: 'Streak', color: 'text-primary', bg: 'bg-primary/15' },
            { icon: Map, value: user.routesCompleted, label: 'Routes', color: 'text-secondary', bg: 'bg-secondary/15' },
          ].map(({ icon: Icon, value, label, color, bg }) => (
            <div key={label} className="ios-card flex-1 p-3 text-center">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mx-auto mb-1.5`}>
                <Icon className={color} size={18} />
              </div>
              <p className="text-lg font-semibold text-foreground">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mode selection */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground px-5 mb-3">Choose your vibe</h3>
        <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
          {modes.map(mode => (
            <button
              key={mode.id}
              onClick={() => handleModeSelect(mode.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-sm font-medium flex items-center gap-2 transition-all ${
                selectedMode === mode.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'ios-card text-foreground'
              }`}
            >
              <span>{mode.emoji}</span>
              {mode.label}
            </button>
          ))}
        </div>
        <p className={`text-xs px-5 mt-2 ${modeColors[selectedMode]} transition-colors`}>
          {currentModeData.tagline}
        </p>
      </div>

      {/* Actions */}
      <div className="px-5 space-y-3">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleStartRoute}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-ios-lg"
        >
          <Compass size={18} /> Start a Route
        </motion.button>
        <button
          onClick={() => navigate('/explore')}
          className="w-full py-3.5 rounded-2xl bg-muted text-foreground font-medium text-sm"
        >
          Explore Nearby
        </button>
      </div>

      <BottomTabBar />
    </div>
  );
}
