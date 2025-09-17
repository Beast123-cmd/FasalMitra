import { Globe, Sprout } from 'lucide-react';
import { Language } from '../types';
import { useTranslations } from '../data/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages = [
  { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'pa' as Language, name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'mr' as Language, name: 'मराठी', flag: '🇮🇳' }
];

export function Header({ language, onLanguageChange }: HeaderProps) {
  const t = useTranslations(language);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800">{t.appName}</span>
              <div className="text-xs text-gray-500">{t.smartCompanionTagline}</div>
            </div>
          </div>

          {/* Location and Language */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Pune, Maharashtra
            </div>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}