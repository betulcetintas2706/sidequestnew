import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, Globe } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import BottomTabBar from '@/components/BottomTabBar';

export default function VaultPage() {
  const [tab, setTab] = useState<'private' | 'public'>('private');
  const { memories } = useApp();

  const filtered = tab === 'private'
    ? memories.filter(m => m.visibility === 'private')
    : memories.filter(m => m.visibility === 'public');

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-14 pb-2">
        <h1 className="text-2xl font-display text-foreground">Your Vault</h1>
      </div>

      {/* Toggle */}
      <div className="px-5 mb-5">
        <div className="flex bg-muted rounded-xl p-1">
          <button
            onClick={() => setTab('private')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${tab === 'private' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
          >
            <Lock size={12} /> Private
          </button>
          <button
            onClick={() => setTab('public')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${tab === 'public' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
          >
            <Globe size={12} /> Public
          </button>
        </div>
      </div>

      {/* Memories — Pinterest masonry */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 px-5">
          <p className="text-muted-foreground text-sm">No memories yet</p>
          <p className="text-muted-foreground text-xs mt-1">Start a route to capture your first!</p>
        </div>
      ) : (
        <div className="px-4 columns-2 gap-3 space-y-3">
          {filtered.map((m, i) => {
            const isLong = i % 3 === 0;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="break-inside-avoid rounded-2xl overflow-hidden relative group cursor-pointer"
              >
                <div className={`${isLong ? 'aspect-[3/4]' : 'aspect-square'} relative`}>
                  {m.mediaUrl ? (
                    <img src={m.mediaUrl} alt={m.caption} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-xs text-white font-medium leading-snug line-clamp-2">{m.caption}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] text-white/70">📍 {m.spotName || 'Unknown'}</span>
                      {tab === 'public' && (
                        <span className="flex items-center gap-0.5 text-[10px] text-white/70">
                          <Heart size={9} /> {m.likes}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <BottomTabBar />
    </div>
  );
}
