import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Camera, Lock, Globe, CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Memory, Visibility } from '@/types';

export default function MemoryCapturePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const spotId = searchParams.get('spotId') || '';
  const spotName = searchParams.get('spotName') || 'Unknown';

  const [caption, setCaption] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addMemory, addPoints, user } = useApp();

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const memory: Memory = {
      id: 'm_' + Date.now(),
      userId: user.id,
      spotId,
      mediaUrl: selectedImage || '',
      caption,
      visibility: isPrivate ? 'private' : 'public',
      createdAt: new Date().toISOString(),
      likes: 0,
      spotName,
    };
    addMemory(memory);
    if (!isPrivate) addPoints(10);
    setShowConfirmation(true);
  };

  const handleContinue = () => {
    setShowConfirmation(false);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-14 pb-10 flex flex-col relative">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground text-sm mb-6">
        <ChevronLeft size={18} /> Back
      </button>

      {/* Title */}
      <h1 className="text-2xl font-display text-foreground mb-1">Capture this moment</h1>
      <p className="text-sm text-muted-foreground mb-6">Save what made this stop special</p>

      {/* Photo picker */}
      <div className="ios-card p-4 mb-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handlePhotoSelect}
        />

        {selectedImage ? (
          <button onClick={() => fileInputRef.current?.click()} className="w-full">
            <img
              src={selectedImage}
              alt="Captured memory"
              className="w-full h-56 object-cover rounded-2xl"
            />
          </button>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-56 rounded-2xl bg-muted flex flex-col items-center justify-center gap-3"
          >
            <Camera className="text-muted-foreground" size={32} />
            <span className="text-sm text-muted-foreground">Tap to add a photo</span>
          </button>
        )}

        {/* Caption */}
        <textarea
          value={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder="What made this moment special?"
          className="w-full mt-3 p-3 rounded-xl bg-muted border-none text-sm text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Privacy toggle */}
      <div className="ios-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          {isPrivate ? <Lock size={16} className="text-foreground" /> : <Globe size={16} className="text-foreground" />}
          <span className="text-sm font-semibold text-foreground">Privacy</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">{isPrivate ? 'Private Vault' : 'Public Discovery'}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {isPrivate ? 'Only you can see this memory' : 'Other explorers will discover this'}
            </p>
          </div>
          <button
            onClick={() => setIsPrivate(!isPrivate)}
            className={`w-12 h-7 rounded-full transition-colors relative ${isPrivate ? 'bg-secondary' : 'bg-primary'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-primary-foreground absolute top-1 transition-transform ${isPrivate ? 'left-1' : 'left-6'}`} />
          </button>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:scale-[0.98] transition-transform mt-auto"
      >
        Save Memory
      </button>

      {/* Save confirmation overlay */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center px-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="ios-card p-8 text-center w-full max-w-sm"
            >
              <CheckCircle className="text-secondary mx-auto mb-4" size={48} />
              <h3 className="text-lg font-display text-foreground mb-2">Memory saved!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {isPrivate ? 'Added to your private vault' : 'Shared with the explorer community'}
              </p>
              <button
                onClick={handleContinue}
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.98] transition-transform"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
