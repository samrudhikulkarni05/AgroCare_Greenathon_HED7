
export enum AppView {
  CHAT = 'CHAT',
  REPORT = 'REPORT',
  HISTORY = 'HISTORY',
  WEATHER = 'WEATHER',
  ADMIN = 'ADMIN',
  DOCS = 'DOCS'
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface User {
  username: string;
  name: string; // Display name
  id: string;
}

export interface DiagnosisData {
  disease_name: string;
  confidence: 'HIGH' | 'LOW';
  crop_detected: string;
  explanation: string;
  treatment_steps: string[];
  prevention_tips: string[];
  is_safe_organic: boolean;
  model_engine: 'CUSTOM_CNN_V2' | 'GEMINI_VISION' | 'HYBRID_VISION_KAG_V3';
  dataset_ref?: string;
}

export interface Expert {
  name: string;
  role: string;
  contact: string;
  address: string;
  type: 'GOVT' | 'PRIVATE' | 'NGO';
}

export interface WeatherData {
  location: string;
  current_temp: string;
  condition: string;
  humidity: string;
  wind_speed: string;
  precipitation: string;
  forecast: {
    day: string;
    temp: string;
    condition: string;
  }[];
  agri_advice: string;
  map_url?: string;
}

export interface BotResponse {
  type: 'CONVERSATION' | 'DIAGNOSIS' | 'ASK_LOCATION_FOR_EXPERTS' | 'EXPERT_LIST' | 'WEATHER_DATA';
  text_response: string; 
  diagnosis_data?: DiagnosisData;
  experts_data?: Expert[];
  weather_data?: WeatherData;
  language_detected?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: {
    text?: string;
    imageUri?: string;
    audioUri?: string;
    botResponse?: BotResponse;
  };
  timestamp: Date;
}

export interface FarmerReport {
  id: string;
  timestamp: string;
  crop: string;
  symptoms: string;
  diagnosis: DiagnosisData;
  imageUri?: string;
}
