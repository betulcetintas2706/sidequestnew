import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Footprints, Car, ChevronLeft, ArrowUpRight, MapPin, CheckCircle, X, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TravelType, DetourLevel } from '@/types';
import { GOOGLE_MAPS_KEY } from '@/components/GoogleMapView';

interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface SelectedPlace {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
}

const quickSuggestions = ['Downtown', 'Waterfront', 'Old Town', 'Arts District'];

const detourDescriptions: Record<DetourLevel, string> = {
  light: '+5 min · subtle detours',
  moderate: '+10 min · interesting stops',
  bold: '+20 min · full discovery',
};

const modeIcons: Record<string, string> = {
  adventure: '🧭', foodie: '🍜', nature: '🌿', culture: '🎭', social: '🤝', mystery: '🔮',
};

async function fetchAutocomplete(input: string): Promise<PlacePrediction[]> {
  if (input.length < 2) return [];
  try {
    const resp = await fetch(
      `https://places.googleapis.com/v1/places:autocomplete`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_MAPS_KEY,
        },
        body: JSON.stringify({ input, languageCode: 'en' }),
      }
    );
    if (!resp.ok) return [];
    const data = await resp.json();
    return (data.suggestions || [])
      .filter((s: any) => s.placePrediction)
      .map((s: any) => ({
        place_id: s.placePrediction.placeId,
        description: s.placePrediction.text?.text || '',
        structured_formatting: {
          main_text: s.placePrediction.structuredFormat?.mainText?.text || '',
          secondary_text: s.placePrediction.structuredFormat?.secondaryText?.text || '',
        },
      }));
  } catch {
    return [];
  }
}

async function fetchPlaceDetails(placeId: string): Promise<SelectedPlace | null> {
  try {
    const resp = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,location`,
      {
        headers: {
          'X-Goog-Api-Key': GOOGLE_MAPS_KEY,
        },
      }
    );
    if (!resp.ok) return null;
    const data = await resp.json();
    return {
      placeId,
      name: data.displayName?.text || '',
      lat: data.location?.latitude || 0,
      lng: data.location?.longitude || 0,
    };
  } catch {
    return null;
  }
}

export default function ShapeAdventurePage() {
  const navigate = useNavigate();
  const { routeConfig, setRouteConfig } = useApp();
  const [destination, setDestination] = useState(routeConfig.destination);
  const [travelType, setTravelType] = useState<TravelType>(routeConfig.travelType);
  const [detourLevel, setDetourLevel] = useState<DetourLevel>(routeConfig.detourLevel);
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null);
  const [isLoadingPlace, setIsLoadingPlace] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (selectedPlace) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (destination.length < 2) { setPredictions([]); return; }
    debounceRef.current = setTimeout(async () => {
      const results = await fetchAutocomplete(destination);
      setPredictions(results);
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [destination, selectedPlace]);

  const handleSelectPrediction = async (p: PlacePrediction) => {
    setDestination(p.description);
    setPredictions([]);
    setIsSearchFocused(false);
    setIsLoadingPlace(true);
    const place = await fetchPlaceDetails(p.place_id);
    if (place) setSelectedPlace(place);
    setIsLoadingPlace(false);
  };

  const handleClearPlace = () => {
    setSelectedPlace(null);
    setDestination('');
    setPredictions([]);
  };

  const handleGenerate = () => {
    setRouteConfig({ destination: destination || 'Downtown', travelType, detourLevel });
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
            onChange={e => { setDestination(e.target.value); setSelectedPlace(null); }}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search a destination..."
            className="w-full px-3 py-3 rounded-xl bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 mb-3"
          />

          {/* Autocomplete results */}
          {isSearchFocused && predictions.length > 0 && !selectedPlace && (
            <div className="rounded-xl bg-muted overflow-hidden mb-3">
              {predictions.map((p, i) => (
                <div key={p.place_id}>
                  <button
                    onClick={() => handleSelectPrediction(p)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-muted-foreground/5"
                  >
                    <MapPin size={16} className="text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-foreground truncate">{p.structured_formatting.main_text}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{p.structured_formatting.secondary_text}</p>
                    </div>
                  </button>
                  {i < predictions.length - 1 && <div className="border-t border-border/30 mx-3" />}
                </div>
              ))}
            </div>
          )}

          {/* Loading */}
          {isLoadingPlace && (
            <div className="flex items-center gap-2 mb-3">
              <Loader2 size={14} className="text-primary animate-spin" />
              <span className="text-xs text-muted-foreground">Getting location...</span>
            </div>
          )}

          {/* Selected place confirmation */}
          {selectedPlace && (
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={16} className="text-secondary" />
              <span className="text-xs text-secondary font-medium">{selectedPlace.name}</span>
              <div className="flex-1" />
              <button onClick={handleClearPlace}>
                <X size={14} className="text-muted-foreground" />
              </button>
            </div>
          )}

          {/* Quick suggestions (fallback) */}
          {predictions.length === 0 && !selectedPlace && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {quickSuggestions.map(s => (
                <button
                  key={s}
                  onClick={() => { setDestination(s); setIsSearchFocused(false); }}
                  className="px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground whitespace-nowrap flex-shrink-0"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Travel Mode */}
        <div className="ios-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Footprints size={16} className="text-foreground" />
            <span className="text-sm font-semibold text-foreground">How are you traveling?</span>
          </div>
          <div className="flex rounded-2xl bg-muted p-1 gap-0">
            {([
              { type: 'walking' as TravelType, icon: Footprints, label: 'Walking' },
              { type: 'driving' as TravelType, icon: Car, label: 'Driving' },
            ]).map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setTravelType(type)}
                className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                  travelType === type
                    ? 'bg-secondary text-primary-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <Icon size={14} />
                {label}
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
