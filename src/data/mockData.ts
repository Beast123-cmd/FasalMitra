import { Crop, SoilType, MarketPrice, WeatherAlert, PestDetection } from '../types';

export const crops: Crop[] = [
  { id: 'wheat', name: 'Wheat', nameHindi: 'गेहूं' },
  { id: 'rice', name: 'Rice', nameHindi: 'चावल' },
  { id: 'corn', name: 'Corn', nameHindi: 'मक्का' },
  { id: 'cotton', name: 'Cotton', nameHindi: 'कपास' },
  { id: 'sugarcane', name: 'Sugarcane', nameHindi: 'गन्ना' },
  { id: 'tomato', name: 'Tomato', nameHindi: 'टमाटर' },
  { id: 'potato', name: 'Potato', nameHindi: 'आलू' },
  { id: 'onion', name: 'Onion', nameHindi: 'प्याज' }
];

export const soilTypes: SoilType[] = [
  { id: 'clay', name: 'Clay Soil', nameHindi: 'चिकनी मिट्टी' },
  { id: 'sandy', name: 'Sandy Soil', nameHindi: 'रेतीली मिट्टी' },
  { id: 'loamy', name: 'Loamy Soil', nameHindi: 'दोमट मिट्टी' },
  { id: 'black', name: 'Black Soil', nameHindi: 'काली मिट्टी' },
  { id: 'red', name: 'Red Soil', nameHindi: 'लाल मिट्टी' }
];

export const marketPrices: MarketPrice[] = [
  { crop: 'Wheat', price: 2150, unit: '₹/quintal', trend: 'up', change: 50 },
  { crop: 'Rice', price: 2890, unit: '₹/quintal', trend: 'down', change: -30 },
  { crop: 'Cotton', price: 6200, unit: '₹/quintal', trend: 'up', change: 100 },
  { crop: 'Sugarcane', price: 380, unit: '₹/quintal', trend: 'stable', change: 0 },
  { crop: 'Tomato', price: 2800, unit: '₹/quintal', trend: 'up', change: 200 },
  { crop: 'Onion', price: 3500, unit: '₹/quintal', trend: 'down', change: -150 }
];

export const weatherAlerts: WeatherAlert[] = [
  {
    id: '1',
    type: 'rain',
    severity: 'high',
    message: 'Heavy rainfall expected in next 24 hours',
    messageHindi: 'अगले 24 घंटों में भारी बारिश की संभावना',
    validUntil: '2025-01-09'
  },
  {
    id: '2',
    type: 'pest',
    severity: 'medium',
    message: 'Aphid outbreak reported in nearby areas',
    messageHindi: 'आसपास के क्षेत्रों में माहू का प्रकोप',
    validUntil: '2025-01-12'
  }
];

export const pestDatabase: PestDetection[] = [
  {
    id: '1',
    name: 'Aphids',
    severity: 'medium',
    treatment: 'Apply neem oil spray. Mix 5ml neem oil in 1 liter water',
    image: 'https://images.pexels.com/photos/6167651/pexels-photo-6167651.jpeg'
  },
  {
    id: '2',
    name: 'Leaf Blight',
    severity: 'high',
    treatment: 'Remove affected leaves and apply copper fungicide',
    image: 'https://images.pexels.com/photos/4750309/pexels-photo-4750309.jpeg'
  }
];