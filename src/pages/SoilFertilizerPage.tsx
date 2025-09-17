 
import { CheckCircle, AlertTriangle, Sprout } from 'lucide-react';
import { Language, Crop, SoilType, FertilizerRecommendation } from '../types';
import { useTranslations } from '../data/translations';
import { crops, soilTypes } from '../data/mockData';
import { useEffect, useState } from 'react';
import { fetchSoil } from '../lib/weather';
import { getCoords } from '../lib/utils';

interface SoilFertilizerPageProps {
  language: Language;
}

export function SoilFertilizerPage({ language }: SoilFertilizerPageProps) {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [selectedSoil, setSelectedSoil] = useState<string>('');
  const [recommendation, setRecommendation] = useState<FertilizerRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [soilTemp, setSoilTemp] = useState<number | null>(null);
  const [soilMoist, setSoilMoist] = useState<number | null>(null);
  const t = useTranslations(language);

  useEffect(() => {
    (async () => {
      try {
        const { latitude, longitude } = await getCoords();
        const soil = await fetchSoil(latitude, longitude);
        if (soil.soilTemperatureC != null) setSoilTemp(Math.round(soil.soilTemperatureC));
        if (soil.soilMoistureVol != null) setSoilMoist(Number((soil.soilMoistureVol * 100).toFixed(1)));
      } catch {
        // ignore
      }
    })();
  }, []);

  const handleGetRecommendation = async () => {
    if (!selectedCrop || !selectedSoil) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRecommendation: FertilizerRecommendation = {
        fertilizer: 'NPK 20:20:0 + Zinc Sulphate',
        amount: '2.5 kg per acre',
        timing: 'Apply before sowing and 30 days after sowing',
        notes: 'Soil health is good. Regular water management recommended.'
      };
      setRecommendation(mockRecommendation);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Sprout className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-2xl font-bold text-green-800">{t.soilFertilizer}</h1>
        </div>

        <div className="space-y-4">
          {/* Crop Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              {t.selectCrop}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full p-4 border-2 border-green-200 rounded-lg text-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            >
              <option value="">-- {t.selectCrop} --</option>
              {crops.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {language === 'en' ? crop.name : crop.nameHindi}
                </option>
              ))}
            </select>
          </div>

          {/* Soil Type Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              {t.selectSoil}
            </label>
            <select
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value)}
              className="w-full p-4 border-2 border-green-200 rounded-lg text-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            >
              <option value="">-- {t.selectSoil} --</option>
              {soilTypes.map((soil) => (
                <option key={soil.id} value={soil.id}>
                  {language === 'en' ? soil.name : soil.nameHindi}
                </option>
              ))}
            </select>
          </div>

          {/* Get Recommendation Button */}
          <button
            onClick={handleGetRecommendation}
            disabled={!selectedCrop || !selectedSoil || loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200"
          >
            {loading ? t.processing : t.getRecommendation}
          </button>
        </div>

        {/* Recommendation Display */}
        {recommendation && (
          <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-xl font-bold text-green-800">Recommendation</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Fertilizer</div>
                <div className="text-lg font-semibold text-gray-800">{recommendation.fertilizer}</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Amount</div>
                <div className="text-lg font-semibold text-gray-800">{recommendation.amount}</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Timing</div>
                <div className="text-lg font-semibold text-gray-800">{recommendation.timing}</div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div className="text-sm text-yellow-800">{recommendation.notes}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Soil live metrics */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-sm text-gray-600 mb-1">Soil Temp</div>
            <div className="text-xl font-bold text-gray-800">{soilTemp != null ? `${soilTemp}°C` : '—'}</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-sm text-gray-600 mb-1">Soil Moisture</div>
            <div className="text-xl font-bold text-gray-800">{soilMoist != null ? `${soilMoist}%` : '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}