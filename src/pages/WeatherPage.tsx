import { Cloud, Droplets, Sun, Wind, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { useTranslations } from '../data/translations';
import { useEffect, useState } from 'react';
import { fetchOpenMeteo, fetch7DayForecast, fetchSoil, fetchWeatherAlerts, DailyForecast, WeatherAlertAPI } from '../lib/weather';
import { getCoords } from '../lib/utils';

interface WeatherPageProps {
  language: Language;
}

export function WeatherPage({ language }: WeatherPageProps) {
  const t = useTranslations(language);

  // Current weather states
  const [tempC, setTempC] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [rainMm, setRainMm] = useState<number | null>(null);

  // Soil data
  const [soilTemp, setSoilTemp] = useState<number | null>(null);
  const [soilMoisture, setSoilMoisture] = useState<number | null>(null);

  // 7-day forecast
  const [forecast, setForecast] = useState<DailyForecast[]>([]);

  // Weather alerts
  const [alerts, setAlerts] = useState<WeatherAlertAPI[]>([]);

  // Loading & error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(false);

      try {
        const { latitude, longitude } = await getCoords().catch(() => ({
          latitude: 28.6139, // fallback
          longitude: 77.209,
        }));

        // Fetch current weather
        const w = await fetchOpenMeteo(latitude, longitude);
        setTempC(Math.round(w.temperatureC));
        setHumidity(w.humidityPct != null ? Math.round(w.humidityPct) : null);
        setRainMm(w.precipitationMm != null ? w.precipitationMm : null);

        // Fetch soil data
        const s = await fetchSoil(latitude, longitude);
        setSoilTemp(s.soilTemperatureC != null ? Math.round(s.soilTemperatureC) : null);
        setSoilMoisture(s.soilMoistureVol != null ? Math.round(s.soilMoistureVol * 100) : null);

        // Fetch 7-day forecast
        const f = await fetch7DayForecast(latitude, longitude);
        setForecast(f);

        // Fetch real-time alerts
        const a = await fetchWeatherAlerts(latitude, longitude);
        setAlerts(a);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'rain': return <Droplets className="h-6 w-6" />;
      case 'heat': return <Sun className="h-6 w-6" />;
      case 'storm': return <Wind className="h-6 w-6" />;
      case 'pest': return <AlertTriangle className="h-6 w-6" />;
      default: return <Cloud className="h-6 w-6" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getWeatherIcon = (code: number) => {
    switch (code) {
      case 0: return <Sun className="h-5 w-5" />;
      case 1:
      case 2: return <Cloud className="h-5 w-5" />;
      case 3:
      case 61:
      case 63: return <Droplets className="h-5 w-5" />;
      default: return <Cloud className="h-5 w-5" />;
    }
  };

  if (loading) return <div className="text-center py-10">{t.loading || 'Loading...'}</div>;
  if (error) return <div className="text-center py-10 text-red-600">{t.error || 'Failed to fetch weather data'}</div>;

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl space-y-6">

      {/* Current Weather */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{t.todayWeather}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Sun className="h-12 w-12 mx-auto mb-2" />
            <div className="text-3xl font-bold">{tempC != null ? `${tempC}°C` : '--'}</div>
            <div className="text-sm opacity-90">{t.temperature}</div>
          </div>
          <div className="text-center">
            <Droplets className="h-12 w-12 mx-auto mb-2" />
            <div className="text-3xl font-bold">{humidity != null ? `${humidity}%` : '--'}</div>
            <div className="text-sm opacity-90">{t.humidity}</div>
          </div>
          <div className="text-center">
            <Cloud className="h-12 w-12 mx-auto mb-2" />
            <div className="text-3xl font-bold">{rainMm != null ? `${rainMm}mm` : '--'}</div>
            <div className="text-sm opacity-90">{t.precipitation || 'Precipitation'}</div>
          </div>
        </div>

        {/* Soil Data */}
        <div className="mt-4 text-center">
          <div className="text-lg">
            Soil Temp: {soilTemp != null ? `${soilTemp}°C` : '--'}, Moisture: {soilMoisture != null ? `${soilMoisture}%` : '--'}
          </div>
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.weatherAlerts}</h2>
        <div className="space-y-3">
          {alerts.length > 0 ? alerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-lg border-2 ${getAlertColor(alert.severity)}`}>
              <div className="flex items-start">
                <div className="mr-3">{getAlertIcon(alert.event)}</div>
                <div className="flex-1">
                  <p className="font-semibold">{alert.title}</p>
                  <p className="text-sm mt-1 opacity-75">{alert.description}</p>
                  <p className="text-sm mt-1 opacity-50">
                    Valid: {new Date(alert.start * 1000).toLocaleString()} - {new Date(alert.end * 1000).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )) : <p className="text-gray-500">No active alerts</p>}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">7-Day Forecast</h2>
        <div className="space-y-3">
          {forecast.map((day, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-800">
                {new Date(day.date).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'short' })}
              </div>
              <div className="flex items-center space-x-4">
                {getWeatherIcon(day.weatherCode)}
                <span className="font-bold text-gray-800">{day.tempMaxC}°C / {day.tempMinC}°C</span>
                <span className="text-blue-600">{day.precipitationMm} mm</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
