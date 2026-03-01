import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, MapPin, Footprints, Car } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TravelType, DetourLevel } from '@/types';

import heroImg from '@/assets/hero/train.jpg';

export default function RouteSetupPage() {
  const navigate = useNavigate();
  const { routeConfig, setRouteConfig } = useApp();
  const [destination, setDestination] = useState(routeConfig.destination);
  const [exploreAroundMe, setExploreAroundMe] = useState(routeConfig.exploreAroundMe);
  const [travelType, setTravelType] = useState<TravelType>(routeConfig.travelType);
  const [detourLevel, setDetourLevel] = useState<DetourLevel>(routeConfig.detourLevel);
  const [stopCount, setStopCount] = useState(routeConfig.stopCount);

  const handlePreview = () => {
    setRouteConfig({ destination, exploreAroundMe, travelType, detourLevel, stopCount });
    navigate('/route-preview');
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Compact hero */}
      <div className="relative h-[110px] shrink-0 overflow-hidden">
        <motion.img
          src={heroImg}
          alt=""
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="grain absolute inset-0 pointer-events-none" />

        <button
          onClick={() => navigate('/mode-select')}
          className="absolute top-12 left-4 flex items-center gap-0.5 text-white/80 text-sm z-10"
        >
          <ChevronLeft size={18} /> Back
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-3">
          <div className="editorial-rule mb-1.5" />
          <h1 className="text-lg font-display text-foreground leading-none">Set up your route</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-4 pb-6 flex flex-col min-h-0">
        {/* Destination */}
        <div className="mb-4">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 block">Destination</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
            <input
              value={destination}
              onChange={e => { setDestination(e.target.value); setExploreAroundMe(false); }}
              placeholder="Where to?"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            />
          </div>
          <button
            onClick={() => { setExploreAroundMe(!exploreAroundMe); setDestination(''); }}
            className={`mt-1.5 flex items-center gap-1.5 text-[11px] font-medium transition-colors ${exploreAroundMe ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <MapPin size={12} /> Explore around me
          </button>
        </div>

        {/* Travel type — inline toggle */}
        <div className="mb-4">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 block">Travel Type</label>
          <div className="flex gap-0 border border-border rounded-xl overflow-hidden">
            {([
              { type: 'walking' as TravelType, icon: Footprints, label: 'Walking' },
              { type: 'driving' as TravelType, icon: Car, label: 'Driving' },
            ]).map(({ type, icon: Icon, label }, i) => {
              const isActive = travelType === type;
              return (
                <button
                  key={type}
                  onClick={() => setTravelType(type)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all ${
                    i > 0 ? 'border-l border-border' : ''
                  } ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detour level — inline toggle */}
        <div className="mb-4">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 block">Detour Level</label>
          <div className="flex gap-0 border border-border rounded-xl overflow-hidden">
            {(['light', 'moderate', 'bold'] as DetourLevel[]).map((level, i) => {
              const isActive = detourLevel === level;
              return (
                <button
                  key={level}
                  onClick={() => setDetourLevel(level)}
                  className={`flex-1 py-2.5 text-xs font-medium capitalize transition-all ${
                    i > 0 ? 'border-l border-border' : ''
                  } ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stop count */}
        <div className="mb-5">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 block">
            Stops &middot; <span className="text-foreground">{stopCount}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={stopCount}
            onChange={e => setStopCount(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5 px-0.5">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>

        {/* Preview button */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          onClick={handlePreview}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] flex items-center justify-center gap-2 shadow-lg mt-auto"
        >
          Preview Route <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
