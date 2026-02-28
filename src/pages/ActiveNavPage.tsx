import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, X, Volume2, VolumeX, Navigation, Star, Award, Compass } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import GoogleMapComponent from '@/components/GoogleMapView';

export default function ActiveNavPage() {
  const navigate = useNavigate();
  const { currentRoute, addPoints, setCurrentRoute } = useApp();
  const [currentStopIdx, setCurrentStopIdx] = useState(0);
  const [checkedIn, setCheckedIn] = useState<Set<number>>(new Set());
  const [showCheckInOverlay, setShowCheckInOverlay] = useState(false);
  const [lastPointsEarned, setLastPointsEarned] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const checkedInIds = currentRoute
    ? new Set(Array.from(checkedIn).map(i => currentRoute.stops[i]?.id).filter(Boolean))
    : new Set<string>();

  if (!currentRoute) {
    navigate('/home');
    return null;
  }

  const currentStop = currentRoute.stops[currentStopIdx];
  const totalStops = currentRoute.stops.length;
  const progress = totalStops > 0 ? checkedIn.size / totalStops : 0;
  const pointsEarned = checkedIn.size * 25;
  const allComplete = checkedIn.size >= totalStops;

  const handleCheckIn = () => {
    if (checkedIn.has(currentStopIdx)) return;
    const newCheckedIn = new Set(checkedIn);
    newCheckedIn.add(currentStopIdx);
    setCheckedIn(newCheckedIn);
    setLastPointsEarned(25);
    addPoints(25);
    setShowCheckInOverlay(true);
  };

  const dismissCheckIn = () => {
    setShowCheckInOverlay(false);
    if (allComplete) {
      navigate(`/completion?points=${pointsEarned}&visited=${checkedIn.size}&total=${totalStops}`);
    } else if (currentStopIdx < totalStops - 1) {
      setCurrentStopIdx(prev => prev + 1);
    }
  };

  const handleMemoryCapture = () => {
    navigate(`/memory-capture?spotId=${currentStop.id}&spotName=${encodeURIComponent(currentStop.name)}`);
  };

  const handleExit = () => {
    navigate(`/completion?points=${pointsEarned}&visited=${checkedIn.size}&total=${totalStops}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Full-screen map */}
      <div className="absolute inset-0">
        <GoogleMapComponent
          stops={currentRoute.stops}
          checkedInStops={checkedInIds}
          currentStopIndex={currentStopIdx}
          showRoute
          className="h-full w-full"
        />
      </div>

      {/* Top progress overlay */}
      <div className="absolute top-0 left-0 right-0 z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }}
      >
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white">
              {checkedIn.size}/{totalStops} stops
            </span>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/20">
              <Star size={12} className="text-accent" />
              <span className="text-xs font-semibold text-accent">{pointsEarned}</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-secondary"
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>

      {/* Exit button */}
      <button
        onClick={handleExit}
        className="absolute top-14 right-5 z-20 w-9 h-9 rounded-full bg-card/80 backdrop-blur flex items-center justify-center shadow-ios"
      >
        <X size={16} className="text-foreground" />
      </button>

      {/* Bottom HUD */}
      <div className="absolute bottom-0 left-0 right-0 z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.85))' }}
      >
        <div className="px-5 pt-4 pb-10">
          {/* Current stop info */}
          {currentStop && (
            <div className="flex items-center gap-3 mb-4">
              {/* Stop number */}
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-white">{currentStopIdx + 1}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-display text-white">{currentStop.name}</h3>
                <p className="text-xs text-white/70 truncate">{currentStop.shortDescription}</p>
              </div>

              {/* Distance indicator */}
              <div className="flex flex-col items-center gap-1">
                <Navigation size={24} className="text-primary" style={{ transform: 'rotate(45deg)' }} />
                <span className="text-sm font-bold text-primary">~300m</span>
                <span className="text-[10px] text-white/50">away</span>
              </div>
            </div>
          )}

          {/* Action row */}
          <div className="flex items-center gap-3">
            {/* Mute toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                isMuted ? 'bg-primary/30' : 'bg-white/15'
              }`}
            >
              {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
            </button>

            {/* Check-in button */}
            <button
              onClick={handleCheckIn}
              disabled={checkedIn.has(currentStopIdx)}
              className={`flex-1 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                checkedIn.has(currentStopIdx)
                  ? 'bg-white/20 text-white/50'
                  : 'bg-secondary text-white active:scale-[0.98]'
              }`}
            >
              <MapPin size={18} />
              {checkedIn.has(currentStopIdx) ? 'Checked In' : 'Check In'}
            </button>

            {/* Camera */}
            <button
              onClick={handleMemoryCapture}
              className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0"
            >
              <Camera size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Check-in confirmation overlay */}
      <AnimatePresence>
        {showCheckInOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/50"
            onClick={dismissCheckIn}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 14, stiffness: 200 }}
              className="ios-card p-8 mx-8 text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-4">
                <Award size={48} className="text-accent" />

                <div>
                  <p className="text-2xl font-bold text-foreground">+{lastPointsEarned} points</p>
                  <p className="text-sm text-secondary mt-1">
                    +{(0.5).toFixed(1)} $QUEST
                  </p>
                </div>

                <button
                  onClick={dismissCheckIn}
                  className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm mt-2"
                >
                  {allComplete ? 'Complete Route' : 'Continue'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
