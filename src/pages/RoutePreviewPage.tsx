import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sparkles, Play, ChevronRight, Loader2, Quote } from 'lucide-react';
import GoogleMapComponent from '@/components/GoogleMapView';
import { useApp } from '@/context/AppContext';
import { seedSpots } from '@/data/seedData';
import { Route } from '@/types';

const modeIcons: Record<string, string> = {
  adventure: '🧭', foodie: '🍜', nature: '🌿', culture: '🎭', social: '🤝', mystery: '🔮',
};

export default function RoutePreviewPage() {
  const navigate = useNavigate();
  const { routeConfig, setCurrentRoute, isMysteryMode } = useApp();
  const [showMystery, setShowMystery] = useState(false);
  const [isLoading] = useState(false);

  const route = useMemo<Route>(() => {
    const filtered = seedSpots.filter(s =>
      (routeConfig.mode ? s.modeTags.includes(routeConfig.mode) : true) &&
      s.travelTags.includes(routeConfig.travelType)
    );
    const stops = filtered.slice(0, routeConfig.stopCount);
    return {
      id: 'r_' + Date.now(),
      mode: routeConfig.mode || 'adventure',
      travelType: routeConfig.travelType,
      detourLevel: routeConfig.detourLevel,
      stopCount: stops.length,
      origin: 'Current Location',
      destination: routeConfig.destination || undefined,
      stops,
      estTime: 15 + stops.length * 8,
      estDetourTime: stops.length * 5,
      estPoints: stops.length * 25,
    };
  }, [routeConfig]);

  const discoveryMinutes = route.estTime + route.estDetourTime;

  const handleStart = () => {
    setCurrentRoute(route);
    navigate('/active-nav');
  };

  return (
    <div className="min-h-screen bg-background pb-10 relative">
      {/* Map section */}
      <div className="relative" style={{ height: 320 }}>
        <GoogleMapComponent
          stops={route.stops}
          showRoute
          isInteractive={false}
          className="h-full w-full"
        />

        {/* Time comparison pill */}
        {route.estTime > 0 && (
          <div className="absolute top-12 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-xl">
            <Clock size={10} className="text-accent" />
            <span className="text-xs font-semibold text-accent">
              +{route.estDetourTime} min
            </span>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-background/60 backdrop-blur-xl">
            <Loader2 size={14} className="text-primary animate-spin" />
            <span className="text-xs text-muted-foreground">Planning your discovery route...</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 space-y-4 mt-4">
        {/* Narrative card */}
        <div className="ios-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{modeIcons[route.mode] || '🧭'}</span>
            <span className="text-sm font-semibold text-foreground capitalize">{route.mode} Route</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {routeConfig.destination
              ? `A curated ${route.mode} route through ${routeConfig.destination} with ${route.stops.length} discovery stops.`
              : `A curated ${route.mode} route with ${route.stops.length} discovery stops near you.`}
          </p>

          {!isMysteryMode && (
            <>
              <div className="border-t border-border/50 my-3" />
              <div className="flex items-start gap-2">
                <Quote size={12} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm italic text-muted-foreground">
                  Every detour is a doorway to something unforgettable.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Route comparison */}
        {route.estTime > 0 && (
          <div className="ios-card p-4">
            <p className="text-sm font-semibold text-foreground mb-3">Route comparison</p>
            <div className="flex gap-3">
              <div className="flex-1 py-3 rounded-xl bg-muted flex flex-col items-center">
                <span className="text-2xl font-bold text-muted-foreground">{route.estTime}</span>
                <span className="text-[10px] text-muted-foreground">min fastest</span>
              </div>
              <div className="flex-1 py-3 rounded-xl bg-primary/15 border border-primary/30 flex flex-col items-center">
                <span className="text-2xl font-bold text-primary">{discoveryMinutes}</span>
                <span className="text-[10px] text-primary">min discovery</span>
              </div>
            </div>
          </div>
        )}

        {/* Stop list */}
        {route.stops.length > 0 && (
          <div className="ios-card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">Stops</span>
              <span className="text-xs font-semibold text-accent bg-accent/15 px-2 py-1 rounded-full">
                {route.estPoints} pts
              </span>
            </div>
            <div className="space-y-0">
              {route.stops.map((stop, i) => (
                <div key={stop.id}>
                  <div className="flex items-center gap-3 py-3">
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{stop.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{stop.shortDescription}</p>
                    </div>
                    <span className="text-[10px] font-medium text-primary bg-primary/15 px-2 py-1 rounded-full flex-shrink-0">
                      {stop.category}
                    </span>
                  </div>
                  {i < route.stops.length - 1 && <div className="border-t border-border/30 ml-12" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleStart}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-ios-lg"
          >
            <Play size={18} />
            Begin {routeConfig.travelType === 'walking' ? 'Walking' : 'Driving'}
          </button>

          {routeConfig.mode !== 'mystery' && (
            <button
              onClick={() => setShowMystery(!showMystery)}
              className="w-full py-3.5 rounded-2xl bg-muted text-foreground font-medium text-sm flex items-center justify-center gap-2"
            >
              🔮 Mystery Mode
            </button>
          )}
        </div>
      </div>

      {/* Mystery mode overlay */}
      <AnimatePresence>
        {showMystery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-8"
            onClick={() => setShowMystery(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="ios-card p-8 text-center max-w-sm"
              onClick={e => e.stopPropagation()}
            >
              <span className="text-5xl mb-4 block">🔮</span>
              <h2 className="text-lg font-display text-foreground mb-2">Mystery Mode</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Let the unknown guide you. Your stops will be revealed one at a time as you explore.
              </p>
              <button
                onClick={() => {
                  setShowMystery(false);
                  navigate('/shape-adventure');
                }}
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm"
              >
                Embrace the Mystery
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
