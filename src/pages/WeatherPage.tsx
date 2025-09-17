import { Cloud, Droplets, Sun, Wind, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { useTranslations } from '../data/translations';
import { weatherAlerts } from '../data/mockData';
import { useEffect, useState } from 'react';
import { fetchOpenMeteo } from '../lib/weather';
import { getCoords } from '../lib/utils';

interface WeatherPageProps {
  language: Language;
}

export function WeatherPage({ language }: WeatherPageProps) {
  const t = useTranslations(language);
  const [tempC, setTempC] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [rainMm, setRainMm] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { latitude, longitude } = await getCoords();
        const w = await fetchOpenMeteo(latitude, longitude);
        setTempC(Math.round(w.temperatureC));
        if (w.humidityPct != null) setHumidity(Math.round(w.humidityPct));
        if (w.precipitationMm != null) setRainMm(w.precipitationMm);
      } catch {
        // ignore, fallback to sample values
      }
    })();
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'rain': return <Droplets className="h-6 w-6" />;
      case 'heat': return <Sun className="h-6 w-6" />;
      case 'storm': return <Wind className="h-6 w-6" />;
      case 'pest': return <AlertTriangle className="h-6 w-6" />;
      default: return <Cloud className="h-6 w-6" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">
      {/* Current Weather */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{t.todayWeather}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Sun className="h-12 w-12 mx-auto mb-2" />
            <div className="text-3xl font-bold">{tempC != null ? `${tempC}°C` : '28°C'}</div>
            <div className="text-sm opacity-90">{t.temperature}</div>
          </div>
          
          <div className="text-center">
            <Droplets className="h-12 w-12 mx-auto mb-2" />
            <div className="text-3xl font-bold">{humidity != null ? `${humidity}%` : '65%'}</div>
            <div className="text-sm opacity-90">{t.humidity}</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-lg">Expected rainfall: {rainMm != null ? `${rainMm}mm` : '15-20mm'} today</div>
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.weatherAlerts}</h2>
        
        <div className="space-y-3">
          {weatherAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-2 ${getAlertColor(alert.severity)}`}
            >
              <div className="flex items-start">
                <div className="mr-3">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">
                    {language === 'hi' ? alert.messageHindi : alert.message}
                  </p>
                  <p className="text-sm mt-1 opacity-75">
                    Valid until: {alert.validUntil}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">7-Day Forecast</h2>
        
        <div className="space-y-3">
          {[
            { day: 'Today', weather: 'Cloudy', temp: '28°C', rain: '70%' },
            { day: 'Tomorrow', weather: 'Rainy', temp: '25°C', rain: '90%' },
            { day: 'Thursday', weather: 'Sunny', temp: '30°C', rain: '10%' },
            { day: 'Friday', weather: 'Partly Cloudy', temp: '29°C', rain: '30%' },
            { day: 'Saturday', weather: 'Sunny', temp: '31°C', rain: '5%' },
            { day: 'Sunday', weather: 'Cloudy', temp: '27°C', rain: '60%' },
            { day: 'Monday', weather: 'Rainy', temp: '24°C', rain: '85%' }
          ].map((forecast, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-800">{forecast.day}</div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{forecast.weather}</span>
                <span className="font-bold text-gray-800">{forecast.temp}</span>
                <span className="text-blue-600">{forecast.rain}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}