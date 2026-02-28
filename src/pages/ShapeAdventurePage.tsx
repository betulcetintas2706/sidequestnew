import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Search, MapPin, Footprints, Car } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { NavigatorMode, TravelType, DetourLevel } from '@/types';

const modes: { id: NavigatorMode; emoji: string; label: string; desc: string }[] = [
  { id: 'adventure', emoji: '🧭', label: 'Adventure', desc: 'Urban exploration, rooftops, hidden passages' },
  { id: 'foodie', emoji: '🍜', label: 'Foodie', desc: 'Cafés, street food, hole-in-the-wall gems' },
  { id: 'nature', emoji: '🌿', label: 'Nature', desc: 'Parks, trails, gardens, waterways' },
  { id: 'culture', emoji: '🎭', label: 'Culture', desc: 'Murals, galleries, historic landmarks' },
  { id: 'social', emoji: '🤝', label: 'Social', desc: 'Markets, community spaces, live music' },
  { id: 'mystery', emoji: '🔮', label: 'Mystery', desc: 'Random surprises, no spoilers' },
];

export default function ShapeAdventurePage() {
  const navigate = useNavigate();
  const { routeConfig, setRouteConfig, setIsMysteryMode } = useApp();

  // Step 0 = mode select, Step 1 = route setup
  const [step, setStep] = useState(0);
  const [selectedMode, setSelectedMode] = useState<NavigatorMode | null>(routeConfig.mode);
  const [destination, setDestination] = useState(routeConfig.destination);
  const [exploreAroundMe, setExploreAroundMe] = useState(routeConfig.exploreAroundMe);
  const [travelType, setTravelType] = useState<TravelType>(routeConfig.travelType);
  const [detourLevel, setDetourLevel] = useState<DetourLevel>(routeConfig.detourLevel);
  const [stopCount, setStopCount] = useState(routeConfig.stopCount);

  const handleModeNext = () => {
    if (selectedMode) {
      setRouteConfig({ mode: selectedMode });
      setIsMysteryMode(selectedMode === 'mystery');
      setStep(1);
    }
  };

  const handlePreview = () => {
    setRouteConfig({ destination, exploreAroundMe, travelType, detourLevel, stopCount });
    navigate('/route-preview');
  };

  const handleBack = () => {
    if (step === 1) setStep(0);
    else navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-14 pb-10 flex flex-col">
      <button onClick={handleBack} className="flex items-center gap-1 text-muted-foreground text-sm mb-6">
        <ChevronLeft size={18} /> Back
      </button>

      {/* Step indicator */}
      <div className="flex gap-2 mb-6">
        <div className={`h-1 rounded-full flex-1 transition-all ${step >= 0 ? 'bg-primary' : 'bg-border'}`} />
        <div className={`h-1 rounded-full flex-1 transition-all ${step >= 1 ? 'bg-primary' : 'bg-border'}`} />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="mode"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <h1 className="text-2xl font-display text-foreground mb-2">Choose your mode</h1>
            <p className="text-sm text-muted-foreground mb-8">How do you want to explore today?</p>

            <div className="grid grid-cols-2 gap-3 flex-1">
              {modes.map((mode, i) => (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`ios-card p-4 text-left relative transition-all ${selectedMode === mode.id ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                >
                  {selectedMode === mode.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="text-primary-foreground" size={12} />
                    </div>
                  )}
                  <span className="text-3xl">{mode.emoji}</span>
                  <p className="font-semibold text-foreground text-sm mt-2">{mode.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{mode.desc}</p>
                </motion.button>
              ))}
            </div>

            <button
              onClick={handleModeNext}
              disabled={!selectedMode}
              className={`w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 mt-6 transition-all ${selectedMode ? 'bg-primary text-primary-foreground active:scale-[0.98]' : 'bg-muted text-muted-foreground'}`}
            >
              Continue <ChevronRight size={18} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="setup"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col"
          >
            <h1 className="text-2xl font-display text-foreground mb-6">Set up your route</h1>

            {/* Destination */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Destination</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  value={destination}
                  onChange={e => { setDestination(e.target.value); setExploreAroundMe(false); }}
                  placeholder="Where to?"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button
                onClick={() => { setExploreAroundMe(!exploreAroundMe); setDestination(''); }}
                className={`mt-2 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${exploreAroundMe ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
              >
                <MapPin size={14} /> Explore around me
              </button>
            </div>

            {/* Travel type */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Travel Type</label>
              <div className="flex gap-3">
                {[{ type: 'walking' as TravelType, icon: Footprints, label: 'Walking' }, { type: 'driving' as TravelType, icon: Car, label: 'Driving' }].map(({ type, icon: Icon, label }) => (
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

            {/* Detour level */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Detour Level</label>
              <div className="flex gap-2">
                {(['light', 'moderate', 'bold'] as DetourLevel[]).map(level => (
                  <button
                    key={level}
                    onClick={() => setDetourLevel(level)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-medium capitalize transition-all ${detourLevel === level ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Stop count */}
            <div className="mb-8">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Stops: {stopCount}</label>
              <input
                type="range"
                min={1}
                max={5}
                value={stopCount}
                onChange={e => setStopCount(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              </div>
            </div>

            <button
              onClick={handlePreview}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:scale-[0.98] transition-transform mt-auto"
            >
              Preview Route
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
