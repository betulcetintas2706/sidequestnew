import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paintbrush, Coffee, TreePine, Binoculars, ShoppingBasket, Image, Flower2, Landmark } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import BottomTabBar from '@/components/BottomTabBar';
import GoogleMapComponent from '@/components/GoogleMapView';

const categories: { name: string; icon: typeof Paintbrush; colorClass: string; bgClass: string; activeClass: string }[] = [
  { name: 'Murals', icon: Paintbrush, colorClass: 'text-primary', bgClass: 'bg-primary/15', activeClass: 'bg-primary' },
  { name: 'Cafes', icon: Coffee, colorClass: 'text-accent', bgClass: 'bg-accent/15', activeClass: 'bg-accent' },
  { name: 'Parks', icon: TreePine, colorClass: 'text-secondary', bgClass: 'bg-secondary/15', activeClass: 'bg-secondary' },
  { name: 'Viewpoints', icon: Binoculars, colorClass: 'text-primary', bgClass: 'bg-primary/15', activeClass: 'bg-primary' },
  { name: 'Markets', icon: ShoppingBasket, colorClass: 'text-destructive', bgClass: 'bg-destructive/15', activeClass: 'bg-destructive' },
  { name: 'Galleries', icon: Image, colorClass: 'text-accent', bgClass: 'bg-accent/15', activeClass: 'bg-accent' },
  { name: 'Gardens', icon: Flower2, colorClass: 'text-secondary', bgClass: 'bg-secondary/15', activeClass: 'bg-secondary' },
  { name: 'Historic', icon: Landmark, colorClass: 'text-accent', bgClass: 'bg-accent/15', activeClass: 'bg-accent' },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setRouteConfig } = useApp();

  const handleFindNearby = () => {
    if (selectedCategory) {
      setRouteConfig({ mode: 'adventure', destination: selectedCategory });
      navigate('/route-preview');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-14 pb-2">
        {/* Header */}
        <h1 className="text-2xl font-display text-foreground">Explore Nearby</h1>
        <p className="text-[11px] text-muted-foreground mt-1">Enable location to discover what's around you</p>
      </div>

      {/* Map preview */}
      <div className="px-5 mt-4 mb-5">
        <GoogleMapComponent
          isInteractive={false}
          className="h-44 rounded-2xl overflow-hidden"
        />
      </div>

      {/* Category heading */}
      <div className="px-5 mb-3">
        <h3 className="text-sm font-semibold text-foreground">What are you looking for?</h3>
      </div>

      {/* Category grid */}
      <div className="px-5 grid grid-cols-2 gap-3">
        {categories.map(({ name, icon: Icon, colorClass, activeClass }) => {
          const isSelected = selectedCategory === name;
          return (
            <button
              key={name}
              onClick={() => setSelectedCategory(prev => prev === name ? null : name)}
              className={`flex items-center gap-2.5 p-3.5 rounded-2xl text-left transition-all ${
                isSelected
                  ? `${activeClass} text-primary-foreground`
                  : 'ios-card'
              }`}
            >
              <Icon size={18} className={isSelected ? 'text-primary-foreground' : colorClass} />
              <span className={`text-sm font-medium ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>{name}</span>
            </button>
          );
        })}
      </div>

      {/* Quick start button */}
      {selectedCategory && (
        <div className="px-5 mt-6">
          <button
            onClick={handleFindNearby}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:scale-[0.98] transition-transform"
          >
            Find {selectedCategory} Nearby
          </button>
        </div>
      )}

      <BottomTabBar />
    </div>
  );
}
