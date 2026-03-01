import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, Archive, Target, User } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/explore', icon: Compass, label: 'Explore' },
  { path: '/vault', icon: Archive, label: 'Vault' },
  { path: '/challenges', icon: Target, label: 'Challenges' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomTabBar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-t border-border/30 safe-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto h-14">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = location.pathname.startsWith(path);
          return (
            <NavLink
              key={path}
              to={path}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5"
            >
              {active && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute -top-px left-3 right-3 h-0.5 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={active ? 2.2 : 1.5}
                className={active ? 'text-primary' : 'text-muted-foreground/70'}
              />
              <span className={`text-[9px] tracking-wide ${active ? 'text-primary font-semibold' : 'text-muted-foreground/70'}`}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
