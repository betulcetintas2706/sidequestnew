import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { seedSpots } from '@/data/seedData';
import { NavigatorMode } from '@/types';
import BottomTabBar from '@/components/BottomTabBar';

const filters: { id: NavigatorMode | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'adventure', label: '🧭 Adventure' },
  { id: 'foodie', label: '🍜 Foodie' },
  { id: 'nature', label: '🌿 Nature' },
  { id: 'culture', label: '🎭 Culture' },
  { id: 'mystery', label: '🔮 Mystery' },
];

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState<NavigatorMode | 'all'>('all');
  const navigate = useNavigate();

  const spots = activeFilter === 'all' ? seedSpots : seedSpots.filter(s => s.modeTags.includes(activeFilter));

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Map placeholder */}
      <div className="h-48 bg-secondary/15 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-secondary">
            <MapPin size={32} />
            <span className="text-xs font-medium">Explore Map</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeFilter === f.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spot grid — Airbnb style image cards */}
      <div className="px-4 columns-2 gap-3 space-y-3">
        {spots.map((spot, i) => {
          const isLong = i % 4 === 0 || i % 4 === 3;
          return (
            <motion.button
              key={spot.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => navigate('/stop/' + spot.id)}
              className="break-inside-avoid w-full rounded-2xl overflow-hidden text-left group cursor-pointer"
            >
              <div className={`${isLong ? 'aspect-[3/4]' : 'aspect-[4/3]'} relative`}>
                {spot.imageUrl ? (
                  <img src={spot.imageUrl} alt={spot.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <MapPin className="text-muted-foreground" size={24} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[11px] text-white/70 font-medium">{spot.category}</p>
                  <p className="text-sm text-white font-semibold leading-tight">{spot.name}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <BottomTabBar />
    </div>
  );
}
