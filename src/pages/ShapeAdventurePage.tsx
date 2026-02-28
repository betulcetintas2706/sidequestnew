import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Footprints, Car, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TravelType, DetourLevel } from '@/types';

const quickSuggestions = ['Downtown', 'Waterfront', 'Old Town', 'Arts District'];

const detourDescriptions: Record<DetourLevel, string> = {
  light: 'Slight scenic changes',
  moderate: 'Balanced exploration',
  bold: 'Maximum discovery',
};

const modeIcons: Record<string, string> = {
  adventure: '🧭', foodie: '🍜', nature: '🌿', culture: '🎭', social: '🤝', mystery: '🔮',
};

export default function ShapeAdventurePage() {
  const navigate = useNavigate();
  const { routeConfig, setRouteConfig } = useApp();
  const [destination, setDestination] = useState(routeConfig.destination);
  const [travelType, setTravelType] = useState<TravelType>(routeConfig.travelType);
  const [detourLevel, setDetourLevel] = useState<DetourLevel>(routeConfig.detourLevel);

  const handleGenerate = () => {
    setRouteConfig({ destination, travelType, detourLevel });
    navigate('/route-preview');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-14 pb-6 px-5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <ChevronLeft size={18} /> Back
        </button>

        <h1 className="text-2xl font-display text-foreground mb-1">Shape Your Adventure</h1>
        <p className="text-sm text-muted-foreground">
          Configure your {routeConfig.mode || 'adventure'} route
        </p>
      </div>

      <div className="px-5 space-y-5 pb-32">
        {/* Destination Search */}
        <div className="ios-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Search size={16} className="text-foreground" />
            <span className="text-sm font-semibold text-foreground">Where to?</span>
          </div>
          <input
            value={destination}
            onChange={e => setDestination(e.target.value)}
            placeholder="Search a destination..."
            className="w-full px-3 py-3 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 mb-3"
          />
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {quickSuggestions.map(s => (
              <button
                key={s}
                onClick={() => setDestination(s)}
                className="px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground whitespace-nowrap flex-shrink-0"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Mode */}
        <div className="ios-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Footprints size={16} className="text-foreground" />
            <span className="text-sm font-semibold text-foreground">How are you traveling?</span>
          </div>
          <div className="flex gap-3">
            {([
              { type: 'walking' as TravelType, icon: Footprints, label: 'Walking' },
              { type: 'driving' as TravelType, icon: Car, label: 'Driving' },
            ]).map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setTravelType(type)}
                className={`flex-1 ios-card p-3 flex items-center justify-center gap-2 transition-all ${travelType === type ? 'ring-2 ring-primary bg-primary/5' : ''}`}
              >
                <Icon size={18} className={travelType === type ? 'text-primary' : 'text-muted-foreground'} />
                <span className={`text-sm font-medium ${travelType === type ? 'text-primary' : 'text-foreground'}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detour Level */}
        <div className="ios-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <ArrowUpRight size={16} className="text-foreground" />
            <span className="text-sm font-semibold text-foreground">Detour level</span>
          </div>
          <div className="flex gap-2">
            {(['light', 'moderate', 'bold'] as DetourLevel[]).map(level => (
              <motion.button
                key={level}
                onClick={() => setDetourLevel(level)}
                className={`flex-1 py-3 rounded-xl text-center transition-all ${
                  detourLevel === level
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
                whileTap={{ scale: 0.97 }}
              >
                <p className="text-xs font-semibold capitalize">{level}</p>
                <p className="text-[9px] mt-0.5 opacity-80">{detourDescriptions[level]}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Mode Badge */}
        {routeConfig.mode && (
          <div className="flex items-center gap-2 px-1">
            <span className="text-lg">{modeIcons[routeConfig.mode] || '🧭'}</span>
            <span className="text-xs text-muted-foreground capitalize">{routeConfig.mode} mode</span>
          </div>
        )}

        {/* Generate Route */}
        <button
          onClick={handleGenerate}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:scale-[0.98] transition-transform shadow-ios-lg"
        >
          Generate Route
        </button>
      </div>
    </div>
  );
}
