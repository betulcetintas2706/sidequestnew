import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Map, Camera, Flame, Wallet, Medal, Bell, Volume2, MapIcon, HelpCircle, ChevronRight, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import BottomTabBar from '@/components/BottomTabBar';

export default function ProfilePage() {
  const { user, badges, memories } = useApp();
  const navigate = useNavigate();
  const unlockedBadges = badges.filter(b => b.unlocked);
  const questBalance = (user.routesCompleted * 1.5).toFixed(1);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="pt-14 pb-6 flex flex-col items-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-22 h-22 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 shadow-ios-lg"
          style={{ width: 88, height: 88 }}
        >
          <User className="text-primary-foreground" size={36} />
        </motion.div>

        <h1 className="text-2xl font-display text-foreground">{user.name}</h1>

        {/* Streak badge */}
        {user.streak > 0 && (
          <div className="flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full bg-primary/15">
            <Flame size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">{user.streak} day streak</span>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="px-5 mb-6">
        <div className="flex gap-3">
          {[
            { icon: Star, value: user.points, label: 'Points', color: 'text-accent', borderColor: 'border-accent/20' },
            { icon: Map, value: user.routesCompleted, label: 'Routes', color: 'text-secondary', borderColor: 'border-secondary/20' },
            { icon: Camera, value: memories.length, label: 'Memories', color: 'text-primary', borderColor: 'border-primary/20' },
          ].map(({ icon: Icon, value, label, color, borderColor }) => (
            <div key={label} className={`ios-card flex-1 py-4 flex flex-col items-center gap-2 border ${borderColor}`}>
              <Icon className={color} size={20} />
              <span className="text-xl font-bold text-foreground">{value}</span>
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet section */}
      <div className="px-5 mb-6">
        <div className="ios-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={18} className="text-secondary" />
            <span className="text-sm font-semibold text-foreground">Solana Wallet</span>
          </div>

          {user.walletAddress ? (
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-mono text-muted-foreground">
                {user.walletAddress.slice(0, 8)}...{user.walletAddress.slice(-4)}
              </span>
            </div>
          ) : (
            <button className="w-full py-2.5 rounded-xl bg-secondary/15 text-secondary text-sm font-medium mb-3">
              Connect Wallet
            </button>
          )}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground">$QUEST Balance</p>
              <p className="text-xl font-semibold text-secondary">{questBalance}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground">cNFT Badges</p>
              <p className="text-xl font-semibold text-accent">{unlockedBadges.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges section */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground px-5 mb-3">Badges</h3>
        {unlockedBadges.length === 0 ? (
          <div className="px-5">
            <div className="ios-card p-4 flex items-center gap-3">
              <Medal size={24} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">No badges yet</p>
                <p className="text-[11px] text-muted-foreground">Complete routes and challenges to earn badges</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
            {unlockedBadges.map(b => (
              <div key={b.id} className="flex flex-col items-center gap-1.5 flex-shrink-0" style={{ width: 72 }}>
                <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center text-2xl">
                  {b.icon}
                </div>
                <span className="text-[10px] text-muted-foreground text-center truncate w-full">{b.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings shortcuts */}
      <div className="px-5">
        <div className="ios-card overflow-hidden">
          {[
            { icon: Bell, label: 'Notifications', color: 'text-primary', path: '/settings' },
            { icon: Volume2, label: 'Voice Guide', color: 'text-secondary', path: '/settings' },
            { icon: MapIcon, label: 'Map Style', color: 'text-primary', path: '/settings' },
            { icon: HelpCircle, label: 'Help & Feedback', color: 'text-accent', path: '/settings' },
          ].map(({ icon: Icon, label, color, path }, i) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 ${i > 0 ? 'border-t border-border/50' : ''}`}
            >
              <Icon size={16} className={color} />
              <span className="flex-1 text-sm text-foreground text-left">{label}</span>
              <ChevronRight size={12} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}
