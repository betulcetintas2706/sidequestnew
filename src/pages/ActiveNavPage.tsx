import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, SkipForward, CheckCircle, X, Volume2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import GoogleMapComponent from '@/components/GoogleMapView';

export default function ActiveNavPage() {
  const navigate = useNavigate();
  const { currentRoute, addPoints } = useApp();
  const [currentStopIdx, setCurrentStopIdx] = useState(0);
  const [checkedIn, setCheckedIn] = useState<Set<number>>(new Set());

  // Convert index-based checked-in to ID-based for map
  const checkedInIds = currentRoute
    ? new Set(Array.from(checkedIn).map(i => currentRoute.stops[i]?.id).filter(Boolean))
    : new Set<string>();

  if (!currentRoute) {
    navigate('/home');
    return null;
  }

  const currentStop = currentRoute.stops[currentStopIdx];
  const isLastStop = currentStopIdx >= currentRoute.stops.length - 1;

  const handleCheckIn = () => {
    setCheckedIn(prev => new Set(prev).add(currentStopIdx));
    addPoints(25);
  };

  const handleSkip = () => {
    if (isLastStop) {
      navigateToCompletion();
    } else {
      setCurrentStopIdx(prev => prev + 1);
    }
  };

  const handleMemoryCapture = () => {
    navigate(`/memory-capture?spotId=${currentStop.id}&spotName=${encodeURIComponent(currentStop.name)}`);
  };

  const navigateToCompletion = () => {
    navigate(`/completion?points=${checkedIn.size * 25}&visited=${checkedIn.size}&total=${currentRoute.stops.length}`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Map area */}
      <div className="h-[55vh] relative">
        <GoogleMapComponent
          stops={currentRoute.stops}
          checkedInStops={checkedInIds}
          currentStopIndex={currentStopIdx}
          showRoute
          className="h-full w-full"
        />

        <button
          onClick={navigateToCompletion}
          className="absolute top-12 right-4 w-9 h-9 rounded-full bg-card/90 backdrop-blur flex items-center justify-center shadow-ios"
        >
          <X size={18} className="text-foreground" />
        </button>

        {/* Stop progress */}
        <div className="absolute top-12 left-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur shadow-ios">
          <span className="text-xs font-semibold text-foreground">{currentStopIdx + 1}/{currentRoute.stops.length} stops</span>
        </div>
      </div>

      {/* Next stop card */}
      <div className="px-5 -mt-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStopIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="ios-card p-5 shadow-ios-lg"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Next Stop</p>
                <h3 className="text-lg font-display text-foreground mt-1">{currentStop.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{currentStop.category}</p>
              </div>
              <button className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center">
                <Volume2 size={16} className="text-secondary" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{currentStop.shortDescription}</p>

            <div className="flex gap-2">
              <button
                onClick={handleCheckIn}
                disabled={checkedIn.has(currentStopIdx)}
                className={`flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${checkedIn.has(currentStopIdx) ? 'bg-secondary/15 text-secondary' : 'bg-primary text-primary-foreground active:scale-[0.98]'}`}
              >
                <CheckCircle size={16} /> {checkedIn.has(currentStopIdx) ? 'Checked In ✓' : 'Check In'}
              </button>
              <button
                onClick={handleMemoryCapture}
                className="py-3 px-4 rounded-xl bg-muted text-foreground text-sm font-medium flex items-center gap-2"
              >
                <Camera size={16} />
              </button>
              <button
                onClick={handleSkip}
                className="py-3 px-4 rounded-xl bg-muted text-muted-foreground text-sm font-medium flex items-center gap-2"
              >
                <SkipForward size={16} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
