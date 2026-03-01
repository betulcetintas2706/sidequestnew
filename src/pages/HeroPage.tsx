import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import sideQuestLogo from '@/assets/sidequest-logo.png';

import banffLake from '@/assets/hero/banff-lake.jpg';
import niagara from '@/assets/hero/niagara.jpg';
import aurora from '@/assets/hero/aurora.jpg';
import montreal from '@/assets/hero/montreal.jpg';
import tofino from '@/assets/hero/tofino.jpg';
import train from '@/assets/hero/train.jpg';
import lighthouse from '@/assets/hero/lighthouse.jpg';
import lakeLouise from '@/assets/hero/lake-louise.jpg';

const col1 = [
  { src: banffLake, label: 'Banff', aspect: 'aspect-[3/4]' },
  { src: niagara, label: 'Niagara Falls', aspect: 'aspect-square' },
  { src: tofino, label: 'Tofino', aspect: 'aspect-[3/4]' },
  { src: lighthouse, label: 'Nova Scotia', aspect: 'aspect-square' },
];

const col2 = [
  { src: montreal, label: 'Montréal', aspect: 'aspect-square' },
  { src: aurora, label: 'Northern Lights', aspect: 'aspect-[4/5]' },
  { src: train, label: 'Rocky Mountaineer', aspect: 'aspect-[4/5]' },
  { src: lakeLouise, label: 'Lake Louise', aspect: 'aspect-[3/4]' },
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
        <div className="flex gap-2.5 px-2.5 pt-2.5 h-full">
          {/* Column 1 — scrolls up */}
          <motion.div
            className="flex-1 flex flex-col gap-2.5"
            animate={{ y: [0, -400, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            {[...col1, ...col1].map((img, i) => (
              <div key={i} className={`${img.aspect} rounded-2xl overflow-hidden relative`}>
                <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            ))}
          </motion.div>

          {/* Column 2 — scrolls down */}
          <motion.div
            className="flex-1 flex flex-col gap-2.5 -mt-32"
            animate={{ y: [-300, 0, -300] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...col2, ...col2].map((img, i) => (
              <div key={i} className={`${img.aspect} rounded-2xl overflow-hidden relative`}>
                <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
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
