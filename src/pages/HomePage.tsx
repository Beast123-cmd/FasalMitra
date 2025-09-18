import { useNavigate } from 'react-router-dom';
import { Target, BarChart3, DollarSign, TrendingUp, Wheat, Sun, Cloud, Droplets, Wind, Eye } from 'lucide-react';
import { Language } from '../types';
import { useTranslations } from '../data/translations';
import heroImage from "../assets/hero-farm.jpg";

interface HomePageProps {
  language: Language;
}

export function HomePage({ language }: HomePageProps) {
  const navigate = useNavigate();
  const t = useTranslations(language);

  const handleCardClick = (feature: string) => {
    switch (feature) {
      case 'soil':
        navigate('/soil-fertilizer');
        break;
      case 'pest':
        navigate('/pest-detection');
        break;
      case 'weather':
        navigate('/weather');
        break;
      case 'market':
        navigate('/market');
        break;
      case 'chat':
        navigate('/chat');
        break;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-r from-green-500 to-green-600 overflow-hidden">
        <div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    // We add a semi-transparent black gradient on top of the image
    // This darkens the image, making white text more readable,
    // just like in your example.
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
  }}
/>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-semibold mb-3">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/chat')}
                className="bg-white text-green-600 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {t.askAIButton}
              </button>
              <button
                onClick={() => navigate('/weather')}
                className="border border-white text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-green-600 transition-colors"
              >
                {t.checkWeatherButton}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Your Farm Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{t.yourFarmOverview}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
              <Target className="h-5 w-5 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-800">5.2 hectares</div>
              <div className="text-xs text-gray-500">{t.totalArea}</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
              <BarChart3 className="h-5 w-5 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-800">3 varieties</div>
              <div className="text-xs text-gray-500">{t.activeCrops}</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
              <DollarSign className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-800">₹2.4L</div>
              <div className="text-xs text-gray-500">{t.expectedIncome}</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center">
              <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-semibold text-gray-800">+12%</div>
              <div className="text-xs text-gray-500">{t.vsLastYear}</div>
            </div>
          </div>
        </div>

        {/* Recommended Crops and Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommended Crops */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-700">{t.recommendedCropsTitle}</h3>
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                {t.highConfidence}
              </span>
            </div>
            
            <div className="border border-gray-100 rounded-md p-3 mb-3">
              <div className="flex items-center mb-2">
                <Wheat className="h-4 w-4 text-yellow-500 mr-2" />
                <div>
                  <div className="font-medium text-gray-800 text-sm">Wheat</div>
                  <div className="text-xs text-gray-500">Rabi Season</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-2">{t.expectedYield}: 40-45 quintals/hectare</div>
              
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 mb-1">{t.whyThisCrop}</div>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">Suitable soil pH</span>
                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs">Optimal temperature</span>
                  <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-xs">Good market price</span>
                </div>
              </div>
              
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 rounded-md text-sm font-medium transition-colors">
                {t.viewDetailedGuide}
              </button>
            </div>
          </div>

          {/* Today's Weather */}
          <div className="bg-gradient-to-br from-blue-400 to-green-400 rounded-lg shadow-sm p-4 text-white">
            <h3 className="text-lg font-semibold mb-3">{t.todaysWeather}</h3>
            
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-1">
                <Sun className="h-5 w-5 mr-1" />
                <Cloud className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold">28°C</div>
              <div className="text-sm opacity-90">{t.partlyCloudy}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <Droplets className="h-4 w-4 mx-auto mb-1" />
                <div className="text-xs opacity-90">{t.humidity}</div>
                <div className="text-sm font-semibold">65%</div>
              </div>
              <div className="text-center">
                <Wind className="h-4 w-4 mx-auto mb-1" />
                <div className="text-xs opacity-90">{t.wind}</div>
                <div className="text-sm font-semibold">12 km/h</div>
              </div>
              <div className="text-center">
                <Eye className="h-4 w-4 mx-auto mb-1" />
                <div className="text-xs opacity-90">{t.visibility}</div>
                <div className="text-sm font-semibold">10 km</div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-md p-2">
              <div className="text-xs font-medium mb-1">{t.farmingTipTitle}</div>
              <div className="text-xs opacity-90">{t.farmingTipText}</div>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{t.quickAccess}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button
              onClick={() => handleCardClick('soil')}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg shadow-sm transition-colors"
            >
              <div className="text-center">
                <div className="text-xs font-medium">{t.soilFertilizer}</div>
              </div>
            </button>
            <button
              onClick={() => handleCardClick('pest')}
              className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg shadow-sm transition-colors"
            >
              <div className="text-center">
                <div className="text-xs font-medium">{t.pestDetection}</div>
              </div>
            </button>
            <button
              onClick={() => handleCardClick('weather')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-sm transition-colors"
            >
              <div className="text-center">
                <div className="text-xs font-medium">{t.weatherAlerts}</div>
              </div>
            </button>
            <button
              onClick={() => handleCardClick('market')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg shadow-sm transition-colors"
            >
              <div className="text-center">
                <div className="text-xs font-medium">{t.marketPrices}</div>
              </div>
            </button>
            <button
              onClick={() => handleCardClick('chat')}
              className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg shadow-sm transition-colors"
            >
              <div className="text-center">
                <div className="text-xs font-medium">{t.aiAdvisor}</div>
              </div>
            </button>
          </div>
        </div>

        {/* Alerts & Tips Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Alerts & Tips</h2>
          <div className="overflow-hidden bg-white rounded-lg shadow-sm border border-gray-100">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">Alert</td>
                  <td className="px-4 py-3 text-xs text-gray-800">Heavy rainfall expected in next 24 hours</td>
                  <td className="px-4 py-3 whitespace-nowrap"><span className="px-2 py-0.5 text-xs rounded bg-red-50 text-red-600">High</span></td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">2025-01-09</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">Tip</td>
                  <td className="px-4 py-3 text-xs text-gray-800">Irrigate fields in early morning to reduce evaporation</td>
                  <td className="px-4 py-3 whitespace-nowrap"><span className="px-2 py-0.5 text-xs rounded bg-green-50 text-green-600">General</span></td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-600">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
