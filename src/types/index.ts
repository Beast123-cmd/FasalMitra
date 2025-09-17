export interface Crop {
  id: string;
  name: string;
  nameHindi: string;
}

export interface SoilType {
  id: string;
  name: string;
  nameHindi: string;
}

export interface FertilizerRecommendation {
  fertilizer: string;
  amount: string;
  timing: string;
  notes: string;
}

export interface PestDetection {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
  treatment: string;
  image: string;
}

export interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface WeatherAlert {
  id: string;
  type: 'rain' | 'heat' | 'pest' | 'storm';
  severity: 'low' | 'medium' | 'high';
  message: string;
  messageHindi: string;
  validUntil: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export type Language = 'en' | 'hi' | 'pa' | 'mr';