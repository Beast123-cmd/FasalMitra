import { Sprout, Bug, CloudRain, TrendingUp, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { useTranslations } from '../data/translations';

interface QuickAccessCardsProps {
  language: Language;
  onCardClick: (feature: string) => void;
}

export function QuickAccessCards({ language, onCardClick }: QuickAccessCardsProps) {
  const t = useTranslations(language);

  const cards = [
    {
      id: 'soil',
      title: t.soilFertilizer,
      icon: Sprout,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'pest',
      title: t.pestDetection,
      icon: Bug,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    },
    {
      id: 'weather',
      title: t.weatherAlerts,
      icon: CloudRain,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'market',
      title: t.marketPrices,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600'
    },
    {
      id: 'chat',
      title: t.aiAdvisor,
      icon: MessageCircle,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <button
            key={card.id}
            onClick={() => onCardClick(card.id)}
            className={`${card.color} ${card.hoverColor} text-white p-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95`}
          >
            <div className="flex flex-col items-center space-y-3">
              <IconComponent className="h-12 w-12" />
              <span className="text-lg font-semibold text-center">{card.title}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}