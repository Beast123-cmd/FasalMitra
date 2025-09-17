import { Home, Cloud, TrendingUp, MessageCircle, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language } from '../types';
import { useTranslations } from '../data/translations';

interface BottomNavigationProps {
  language: Language;
}

export function BottomNavigation({ language }: BottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const t = useTranslations(language);

  const navItems = [
    { id: 'home', path: '/', icon: Home, label: t.home },
    { id: 'weather', path: '/weather', icon: Cloud, label: t.weather },
    { id: 'market', path: '/market', icon: TrendingUp, label: t.market },
    { id: 'chat', path: '/chat', icon: MessageCircle, label: t.chat },
    { id: 'profile', path: '/profile', icon: User, label: t.profile }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <IconComponent className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}