import { Cloud, Droplets, Sun, Thermometer } from 'lucide-react';
import { Language } from '../types';
import { useTranslations } from '../data/translations';

interface WeatherWidgetProps {
  language: Language;
}

export function WeatherWidget({ language }: WeatherWidgetProps) {
  const t = useTranslations(language);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-4 text-white shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Sun className="h-5 w-5 mr-2" />
        {t.todayWeather}
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <Thermometer className="h-6 w-6 mx-auto mb-1" />
          <div className="text-sm opacity-90">{t.temperature}</div>
          <div className="text-xl font-bold">28°C</div>
        </div>
        
        <div className="text-center">
          <Droplets className="h-6 w-6 mx-auto mb-1" />
          <div className="text-sm opacity-90">{t.humidity}</div>
          <div className="text-xl font-bold">65%</div>
        </div>
        
        <div className="text-center">
          <Cloud className="h-6 w-6 mx-auto mb-1" />
          <div className="text-sm opacity-90">{t.rainfall}</div>
          <div className="text-xl font-bold">15mm</div>
        </div>
      </div>
    </div>
  );
}