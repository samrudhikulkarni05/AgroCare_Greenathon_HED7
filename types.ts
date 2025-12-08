
export enum AppView {
  CHAT = 'CHAT',
  REPORT = 'REPORT'
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface DiagnosisData {
  disease_name: string;
  confidence: 'HIGH' | 'LOW';
  crop_detected: string;
  explanation: string;
  treatment_steps: string[];
  prevention_tips: string[];
  is_safe_organic: boolean;
}

export interface Expert {
  name: string;
  role: string;
  contact: string;
  address: string;
  type: 'GOVT' | 'PRIVATE' | 'NGO';
}

export interface BotResponse {
  type: 'CONVERSATION' | 'DIAGNOSIS' | 'ASK_LOCATION_FOR_EXPERTS' | 'EXPERT_LIST';
  text_response: string; // The chat message to show
  diagnosis_data?: DiagnosisData;
  experts_data?: Expert[];
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
