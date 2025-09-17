import { Language } from '../types';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    appName: 'FasalMitra',
    search: 'Type or speak your query...',
    soilFertilizer: 'Soil & Fertilizer',
    pestDetection: 'Pest Detection',
    weatherAlerts: 'Weather Alerts',
    marketPrices: 'Market Prices',
    aiAdvisor: 'AI Advisor',
    home: 'Home',
    weather: 'Weather',
    market: 'Market',
    chat: 'Chat',
    profile: 'Profile',
    selectCrop: 'Select Crop',
    selectSoil: 'Select Soil Type',
    getRecommendation: 'Get Recommendation',
    uploadImage: 'Upload Plant Image',
    takePicture: 'Take Picture',
    noImageSelected: 'No image selected',
    analyze: 'Analyze',
    todayWeather: "Today's Weather",
    temperature: 'Temperature',
    humidity: 'Humidity',
    rainfall: 'Rainfall',
    priceToday: "Today's Prices",
    askQuestion: 'Ask your farming question...',
    send: 'Send',
    listening: 'Listening...',
    processing: 'Processing...'
    ,previousQuestions: 'Previous Questions'
    ,noPreviousQuestions: 'No previous questions yet'
  },
  hi: {
    appName: 'फसलमित्र',
    search: 'अपना प्रश्न टाइप करें या बोलें...',
    soilFertilizer: 'मिट्टी और खाद',
    pestDetection: 'कीट पहचान',
    weatherAlerts: 'मौसम चेतावनी',
    marketPrices: 'बाजार भाव',
    aiAdvisor: 'AI सलाहकार',
    home: 'होम',
    weather: 'मौसम',
    market: 'बाजार',
    chat: 'चैट',
    profile: 'प्रोफाइल',
    selectCrop: 'फसल चुनें',
    selectSoil: 'मिट्टी का प्रकार चुनें',
    getRecommendation: 'सलाह पाएं',
    uploadImage: 'पौधे की तस्वीर अपलोड करें',
    takePicture: 'फोटो लें',
    noImageSelected: 'कोई तस्वीर नहीं चुनी',
    analyze: 'जांच करें',
    todayWeather: 'आज का मौसम',
    temperature: 'तापमान',
    humidity: 'नमी',
    rainfall: 'बारिश',
    priceToday: 'आज के भाव',
    askQuestion: 'अपना खेती का सवाल पूछें...',
    send: 'भेजें',
    listening: 'सुन रहे हैं...',
    processing: 'प्रोसेसिंग...'
    ,previousQuestions: 'पहले पूछे गए सवाल'
    ,noPreviousQuestions: 'अभी तक कोई सवाल नहीं'
  },
  pa: {
    appName: 'ਫਸਲਮਿਤਰ',
    search: 'ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ ਜਾਂ ਬੋਲੋ...',
    soilFertilizer: 'ਮਿੱਟੀ ਅਤੇ ਖਾਦ',
    pestDetection: 'ਕੀੜੇ ਦੀ ਪਛਾਣ',
    weatherAlerts: 'ਮੌਸਮ ਚੇਤਾਵਨੀ',
    marketPrices: 'ਮਾਰਕੀਟ ਭਾਅ',
    aiAdvisor: 'AI ਸਲਾਹਕਾਰ',
    home: 'ਘਰ',
    weather: 'ਮੌਸਮ',
    market: 'ਮਾਰਕੀਟ',
    chat: 'ਚੈਟ',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
    selectCrop: 'ਫਸਲ ਚੁਣੋ',
    selectSoil: 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ ਚੁਣੋ',
    getRecommendation: 'ਸਲਾਹ ਲਓ',
    uploadImage: 'ਪੌਧੇ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ',
    takePicture: 'ਫੋਟੋ ਲਓ',
    noImageSelected: 'ਕੋਈ ਤਸਵੀਰ ਨਹੀਂ ਚੁਣੀ',
    analyze: 'ਜਾਂਚ ਕਰੋ',
    todayWeather: 'ਅੱਜ ਦਾ ਮੌਸਮ',
    temperature: 'ਤਾਪਮਾਨ',
    humidity: 'ਨਮੀ',
    rainfall: 'ਬਾਰਿਸ਼',
    priceToday: 'ਅੱਜ ਦੇ ਭਾਅ',
    askQuestion: 'ਆਪਣਾ ਖੇਤੀ ਦਾ ਸਵਾਲ ਪੁੱਛੋ...',
    send: 'ਭੇਜੋ',
    listening: 'ਸੁਣ ਰਹੇ ਹਾਂ...',
    processing: 'ਪ੍ਰੋਸੈਸਿੰਗ...'
    ,previousQuestions: 'ਪਿਛਲੇ ਸਵਾਲ'
    ,noPreviousQuestions: 'ਹੁਣ ਤੱਕ ਕੋਈ ਸਵਾਲ ਨਹੀਂ'
  },
  mr: {
    appName: 'फसलमित्र',
    search: 'तुमचा प्रश्न टाइप करा किंवा बोला...',
    soilFertilizer: 'माती आणि खत',
    pestDetection: 'कीड ओळख',
    weatherAlerts: 'हवामान इशारे',
    marketPrices: 'बाजार भाव',
    aiAdvisor: 'AI सल्लागार',
    home: 'घर',
    weather: 'हवामान',
    market: 'बाजार',
    chat: 'चॅट',
    profile: 'प्रोफाइल',
    selectCrop: 'पीक निवडा',
    selectSoil: 'मातीचा प्रकार निवडा',
    getRecommendation: 'सल्ला घ्या',
    uploadImage: 'रोपाचा फोटो अपलोड करा',
    takePicture: 'फोटो काढा',
    noImageSelected: 'कोणताही फोटो निवडला नाही',
    analyze: 'तपासा',
    todayWeather: 'आजचे हवामान',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    rainfall: 'पाऊस',
    priceToday: 'आजचे भाव',
    askQuestion: 'तुमचा शेतीचा प्रश्न विचारा...',
    send: 'पाठवा',
    listening: 'ऐकत आहे...',
    processing: 'प्रक्रिया...'
    ,previousQuestions: 'मागील प्रश्न'
    ,noPreviousQuestions: 'अजून कोणतेही प्रश्न नाहीत'
  }
};

export function useTranslations(language: Language) {
  return translations[language];
}