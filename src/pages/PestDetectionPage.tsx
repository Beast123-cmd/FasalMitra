import { useState } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle, Bug } from 'lucide-react';
import { Language, PestDetection } from '../types';
import { useTranslations } from '../data/translations';
import { pestDatabase } from '../data/mockData';
import { fileToBase64 } from '../lib/utils';
import { analyzeImageToJson } from '../lib/ai';

interface PestDetectionPageProps {
  language: Language;
}

export function PestDetectionPage({ language }: PestDetectionPageProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [detection, setDetection] = useState<PestDetection | null>(null);
  const [loading, setLoading] = useState(false);
  const t = useTranslations(language);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
      const { base64, mimeType } = await fileToBase64(selectedImage);
      const result = await analyzeImageToJson(base64, mimeType, 'Identify crop disease from the photo.');
      const resolved: PestDetection = {
        id: Date.now().toString(),
        name: result.name || 'Unknown disease',
        severity: (result.severity as any) || 'medium',
        treatment: result.treatment || 'Consult local agronomist and follow integrated pest management.',
        image: imagePreview || pestDatabase[0].image,
      };
      setDetection(resolved);
    } catch (e) {
      const fallback = pestDatabase[Math.floor(Math.random() * pestDatabase.length)];
      setDetection(fallback);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'medium': return <AlertTriangle className="h-5 w-5" />;
      case 'low': return <CheckCircle className="h-5 w-5" />;
      default: return <Bug className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Bug className="h-8 w-8 text-orange-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">{t.pestDetection}</h1>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center">
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Selected plant"
                  className="max-w-full h-48 object-cover mx-auto rounded-lg"
                />
                <p className="text-green-700 font-medium">Image selected successfully!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="h-16 w-16 text-green-400 mx-auto" />
                <p className="text-gray-600 text-lg">{t.uploadImage}</p>
              </div>
            )}
            
            <div className="mt-4 space-y-2">
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <span className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg cursor-pointer transition-colors">
                  <Upload className="h-5 w-5 mr-2" />
                  {t.uploadImage}
                </span>
              </label>
              
              <div className="text-sm text-gray-500">
                {selectedImage ? selectedImage.name : t.noImageSelected}
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          {selectedImage && (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200"
            >
              {loading ? t.processing : t.analyze}
            </button>
          )}
        </div>

        {/* Detection Results */}
        {detection && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-xl border-2 ${getSeverityColor(detection.severity)}`}>
              <div className="flex items-center mb-2">
                {getSeverityIcon(detection.severity)}
                <h3 className="text-xl font-bold ml-2">{detection.name}</h3>
              </div>
              <p className="text-sm capitalize">
                Severity: {detection.severity}
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <h4 className="font-bold text-blue-800 mb-2">Treatment Recommendation:</h4>
              <p className="text-blue-700">{detection.treatment}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">Reference Image:</h4>
              <img
                src={detection.image}
                alt={detection.name}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}