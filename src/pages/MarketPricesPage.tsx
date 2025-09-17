import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Language } from '../types';
import { useTranslations } from '../data/translations';
import { marketPrices } from '../data/mockData';

interface MarketPricesPageProps {
  language: Language;
}

export function MarketPricesPage({ language }: MarketPricesPageProps) {
  const t = useTranslations(language);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'down': return <TrendingDown className="h-5 w-5 text-red-600" />;
      case 'stable': return <Minus className="h-5 w-5 text-gray-600" />;
      default: return <Minus className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-8 w-8 text-yellow-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">{t.priceToday}</h1>
        </div>

        <div className="space-y-3">
          {marketPrices.map((price, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{price.crop}</h3>
                <p className="text-sm text-gray-600">{price.unit}</p>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold text-gray-800">₹{price.price.toLocaleString()}</div>
                <div className={`flex items-center text-sm font-medium ${getTrendColor(price.trend)}`}>
                  {getTrendIcon(price.trend)}
                  <span className="ml-1">
                    {price.change > 0 ? '+' : ''}{price.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-center">
            <strong>Note:</strong> Prices are from local mandi and updated daily
          </p>
        </div>
      </div>
    </div>
  );
}