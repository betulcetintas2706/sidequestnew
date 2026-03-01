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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero header */}
      <div className="relative h-[140px] overflow-hidden">
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

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
            <div className="editorial-rule mb-2" />
            <h1 className="text-xl font-display text-foreground leading-none">Set up your route</h1>
            <p className="text-[11px] text-muted-foreground mt-1">Customize your adventure</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-5 pb-6 flex flex-col">
        {/* Destination */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="mb-6"
        >
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">Destination</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              value={destination}
              onChange={e => { setDestination(e.target.value); setExploreAroundMe(false); }}
              placeholder="Where to?"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            />
          </div>
          <button
            onClick={() => { setExploreAroundMe(!exploreAroundMe); setDestination(''); }}
            className={`mt-2.5 flex items-center gap-2 text-xs font-medium transition-colors ${exploreAroundMe ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <MapPin size={13} /> Explore around me
          </button>
        </motion.div>

        {/* Travel type */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className="mb-6"
        >
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">Travel Type</label>
          <div className="flex gap-3">
            {([
              { type: 'walking' as TravelType, icon: Footprints, label: 'Walking' },
              { type: 'driving' as TravelType, icon: Car, label: 'Driving' },
            ]).map(({ type, icon: Icon, label }) => {
              const isActive = travelType === type;
              return (
                <button
                  key={type}
                  onClick={() => setTravelType(type)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-muted/50 text-muted-foreground border border-transparent'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Detour level */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="mb-6"
        >
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">Detour Level</label>
          <div className="flex gap-2">
            {(['light', 'moderate', 'bold'] as DetourLevel[]).map(level => {
              const isActive = detourLevel === level;
              return (
                <button
                  key={level}
                  onClick={() => setDetourLevel(level)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-medium capitalize transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Stop count */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          className="mb-8"
        >
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 block">
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
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-0.5">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </motion.div>

        {/* Preview button */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          onClick={handlePreview}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-[15px] flex items-center justify-center gap-2 shadow-lg mt-auto"
        >
          Preview Route <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
