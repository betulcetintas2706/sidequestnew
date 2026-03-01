import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import sideQuestLogo from '@/assets/sidequest-logo.png';

import santorini from '@/assets/hero/santorini.jpg';
import bali from '@/assets/hero/bali.jpg';
import kyoto from '@/assets/hero/kyoto.jpg';
import iceland from '@/assets/hero/iceland.jpg';
import maldives from '@/assets/hero/maldives.jpg';
import amalfi from '@/assets/hero/amalfi.jpg';
import sahara from '@/assets/hero/sahara.jpg';
import milford from '@/assets/hero/milford.jpg';
import patagonia from '@/assets/hero/patagonia.jpg';
import swissAlps from '@/assets/hero/swiss-alps.jpg';
import greatWall from '@/assets/hero/great-wall.jpg';
import tajMahal from '@/assets/hero/taj-mahal.jpg';
import petra from '@/assets/hero/petra.jpg';
import colosseum from '@/assets/hero/colosseum.jpg';

const col1 = [
  { src: santorini, aspect: 'aspect-[3/4]' },
  { src: bali, aspect: 'aspect-square' },
  { src: iceland, aspect: 'aspect-[3/4]' },
  { src: tajMahal, aspect: 'aspect-[3/4]' },
  { src: maldives, aspect: 'aspect-square' },
  { src: patagonia, aspect: 'aspect-[4/5]' },
  { src: greatWall, aspect: 'aspect-[3/4]' },
];

const col2 = [
  { src: kyoto, aspect: 'aspect-[4/5]' },
  { src: amalfi, aspect: 'aspect-[4/5]' },
  { src: sahara, aspect: 'aspect-[3/4]' },
  { src: milford, aspect: 'aspect-square' },
  { src: colosseum, aspect: 'aspect-[4/5]' },
  { src: petra, aspect: 'aspect-[3/4]' },
  { src: swissAlps, aspect: 'aspect-[3/4]' },
];

export default function HeroPage() {
  const navigate = useNavigate();
  const { isOnboarded, dismissHero } = useApp();

  const handleStart = () => {
    dismissHero();
    navigate(isOnboarded ? '/home' : '/onboarding');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Pinterest masonry background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex gap-2 px-2 pt-2 h-full">
          {/* Column 1 — scrolls up */}
          <motion.div
            className="flex-1 flex flex-col gap-2"
            animate={{ y: [0, -1200, 0] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            {[...col1, ...col1].map((img, i) => (
              <div key={i} className={`${img.aspect} rounded-xl overflow-hidden relative shrink-0`}>
                <img src={img.src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>

          {/* Column 2 — scrolls down (offset) */}
          <motion.div
            className="flex-1 flex flex-col gap-2 -mt-48"
            animate={{ y: [-800, 0, -800] }}
            transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          >
            {[...col2, ...col2].map((img, i) => (
              <div key={i} className={`${img.aspect} rounded-xl overflow-hidden relative shrink-0`}>
                <img src={img.src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end px-6 pb-16 safe-bottom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-sm"
        >
          <motion.img
            src={sideQuestLogo}
            alt="SideQuest logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-20 h-20 rounded-2xl mb-5 shadow-lg object-contain"
          />

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-display text-foreground mb-2"
          >
            SideQuest
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg font-display italic text-primary leading-snug mb-8"
          >
            "The most interesting way there."
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-lg active:scale-[0.97] transition-transform"
          >
            Start a SideQuest
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={() => { dismissHero(); navigate('/explore'); }}
            className="mt-4 flex items-center gap-1.5 text-secondary text-sm font-medium"
          >
            <MapPin size={14} />
            Explore nearby
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
