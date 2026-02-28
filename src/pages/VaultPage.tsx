import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Globe, ImageIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import BottomTabBar from '@/components/BottomTabBar';

type VaultFilter = 'all' | 'private' | 'public';

export default function VaultPage() {
  const [filter, setFilter] = useState<VaultFilter>('all');
  const { memories } = useApp();

  const filtered = memories.filter(m => {
    if (filter === 'private') return m.visibility === 'private';
    if (filter === 'public') return m.visibility === 'public';
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Empty state */}
      {memories.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-10 text-center">
          <ImageIcon size={48} className="text-muted-foreground mb-5" />
          <h2 className="text-base font-semibold text-foreground mb-2">No memories yet</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Capture moments during your routes{'\n'}to fill your vault
          </p>
        </div>
      ) : (
        <div className="pt-14 pb-4">
          {/* Header */}
          <div className="px-5 mb-4">
            <h1 className="text-2xl font-display text-foreground">Memory Vault</h1>
            <p className="text-sm text-muted-foreground">{memories.length} moments captured</p>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 px-5 mb-5">
            {(['all', 'private', 'public'] as VaultFilter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-2 rounded-full text-xs font-medium capitalize transition-all ${
                  filter === f
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {f === 'all' ? 'All' : f === 'private' ? 'Private' : 'Public'}
              </button>
            ))}
          </div>

          {/* Memory grid */}
          <div className="px-5 grid grid-cols-2 gap-3">
            {filtered.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="ios-card p-2 overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full h-28 rounded-xl bg-muted flex items-center justify-center mb-2 overflow-hidden">
                  {m.mediaUrl ? (
                    <img src={m.mediaUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={24} className="text-muted-foreground" />
                  )}
                  {/* Privacy badge */}
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center">
                    {m.visibility === 'public' ? (
                      <Globe size={10} className="text-foreground" />
                    ) : (
                      <Lock size={10} className="text-foreground" />
                    )}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 px-1">
                  {m.caption || 'A moment remembered'}
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1 px-1">
                  {new Date(m.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <BottomTabBar />
    </div>
  );
}
