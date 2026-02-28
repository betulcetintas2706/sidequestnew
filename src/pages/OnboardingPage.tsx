import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Map, Star } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const pages = [
  {
    icon: Leaf,
    title: "Discover, don't just navigate",
    body: "SideQuest finds the most interesting way to get there — not the fastest.",
  },
  {
    icon: Map,
    title: 'Routes with soul',
    body: 'Every route includes hidden stops, local gems, and moments worth remembering.',
  },
  {
    icon: Star,
    title: 'Earn as you explore',
    body: 'Check in at stops, capture memories, and earn points and badges for every discovery.',
  },
];

export default function OnboardingPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [animateIn, setAnimateIn] = useState(true);
  const navigate = useNavigate();
  const { completeOnboarding, setUser } = useApp();

  const safeIndex = Math.min(currentPage, pages.length - 1);
  const isLast = safeIndex === pages.length - 1;
  const current = pages[safeIndex];
  const Icon = current.icon;

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
      setUser({
        id: 'u_' + Math.random().toString(36).slice(2, 8),
        name: 'Explorer',
        authProvider: 'guest',
        points: 0,
        streak: 0,
        routesCompleted: 0,
        badgesUnlocked: [],
        savedRoutes: [],
      });
      navigate('/home');
      return;
    }

    setAnimateIn(false);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setAnimateIn(true);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-8 py-16">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full">
        {/* Icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={animateIn ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative mb-10"
          >
            <div className="w-28 h-28 rounded-full bg-primary/15 flex items-center justify-center">
              <Icon size={48} className="text-primary" strokeWidth={1.5} />
            </div>
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl -z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Title */}
        <motion.h2
          key={`title-${currentPage}`}
          initial={{ opacity: 0, y: 20 }}
          animate={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-display text-foreground text-center mb-4"
        >
          {current.title}
        </motion.h2>

        {/* Body */}
        <motion.p
          key={`body-${currentPage}`}
          initial={{ opacity: 0, y: 20 }}
          animate={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-sm text-muted-foreground text-center leading-relaxed"
        >
          {current.body}
        </motion.p>
      </div>

      {/* Page indicators */}
      <div className="flex gap-2 mb-8">
        {pages.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentPage ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>

      {/* Button */}
      <button
        onClick={handleNext}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:scale-[0.98] transition-transform"
      >
        {isLast ? 'Start Exploring' : 'Next'}
      </button>
    </div>
  );
}
