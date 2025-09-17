import { User, Settings, Bell, Globe, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { useTranslations } from '../data/translations';

interface ProfilePageProps {
  language: Language;
}

export function ProfilePage({ language }: ProfilePageProps) {
  const t = useTranslations(language);

  const profileOptions = [
    {
      icon: User,
      title: language === 'hi' ? 'व्यक्तिगत जानकारी' : 'Personal Information',
      subtitle: language === 'hi' ? 'नाम, फोन, पता' : 'Name, phone, address'
    },
    {
      icon: Settings,
      title: language === 'hi' ? 'सेटिंग्स' : 'Settings',
      subtitle: language === 'hi' ? 'ऐप की सेटिंग्स' : 'App preferences'
    },
    {
      icon: Bell,
      title: language === 'hi' ? 'अधिसूचनाएं' : 'Notifications',
      subtitle: language === 'hi' ? 'मौसम और मार्केट अलर्ट' : 'Weather and market alerts'
    },
    {
      icon: Globe,
      title: language === 'hi' ? 'भाषा' : 'Language',
      subtitle: language === 'hi' ? 'अपनी भाषा चुनें' : 'Choose your language'
    },
    {
      icon: HelpCircle,
      title: language === 'hi' ? 'सहायता' : 'Help & Support',
      subtitle: language === 'hi' ? 'ऐप का उपयोग कैसे करें' : 'How to use the app'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {language === 'hi' ? 'राम सिंह' : 'Ram Singh'}
          </h1>
          <p className="text-gray-600">
            {language === 'hi' ? 'किसान, पंजाब' : 'Farmer, Punjab'}
          </p>
        </div>

        {/* Profile Options */}
        <div className="space-y-3">
          {profileOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <IconComponent className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* App Info */}
        <div className="mt-8 text-center text-gray-500">
          <p className="text-sm">{t.appName} v1.0.0</p>
          <p className="text-xs mt-1">
            {language === 'hi' ? 'भारतीय किसानों के लिए बनाया गया' : 'Made for Indian farmers'}
          </p>
        </div>
      </div>
    </div>
  );
}