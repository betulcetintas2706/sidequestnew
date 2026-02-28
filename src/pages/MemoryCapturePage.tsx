import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Camera, Globe, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Memory, Visibility } from '@/types';

export default function MemoryCapturePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const spotId = searchParams.get('spotId') || '';
  const spotName = searchParams.get('spotName') || 'Unknown';

  const [caption, setCaption] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('private');
  const { addMemory, addPoints, user } = useApp();

  const handleSave = () => {
    const memory: Memory = {
      id: 'm_' + Date.now(),
      userId: user.id,
      spotId,
      mediaUrl: '',
      caption,
      visibility,
      createdAt: new Date().toISOString(),
      likes: 0,
      spotName,
    };
    addMemory(memory);
    if (visibility === 'public') addPoints(10);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-14 pb-10 flex flex-col">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground text-sm mb-6">
        <ChevronLeft size={18} /> Back
      </button>

      <h1 className="text-2xl font-display text-foreground mb-2">Capture Memory</h1>
      <p className="text-xs text-muted-foreground mb-6">📍 {spotName}</p>

      {/* Photo upload placeholder */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full h-48 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 mb-6"
      >
        <Camera className="text-muted-foreground" size={32} />
        <span className="text-sm text-muted-foreground">Tap to add photo</span>
      </motion.button>

      {/* Caption */}
      <textarea
        value={caption}
        onChange={e => setCaption(e.target.value)}
        placeholder="What did you discover?"
        className="w-full p-4 rounded-2xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground resize-none h-28 focus:outline-none focus:ring-2 focus:ring-primary/30 mb-6"
      />

      {/* Visibility */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setVisibility('private')}
          className={`flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${visibility === 'private' ? 'bg-foreground/10 text-foreground' : 'bg-muted text-muted-foreground'}`}
        >
          <Lock size={14} /> Private Vault
        </button>
        <button
          onClick={() => setVisibility('public')}
          className={`flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${visibility === 'public' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
        >
          <Globe size={14} /> Public +10 pts
        </button>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:scale-[0.98] transition-transform mt-auto"
      >
        Save Memory
      </button>
    </div>
  );
}
