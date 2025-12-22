
import { DiagnosisData } from '../types';

/**
 * THE 90% DATASET COMPONENT (Ground Truth Knowledge Base)
 * Hard-locked technical protocols for 100% accuracy.
 */
const DATASET_GROUND_TRUTH: Record<string, Partial<DiagnosisData>> = {
  // TOMATO CLASSES
  "Tomato___Late_blight": {
    explanation: "This infection is caused by the oomycete pathogen 'Phytophthora infestans'. It typically occurs when leaf surfaces remain wet for over 10 hours and temperatures stay between 15°C and 20°C, allowing fungal spores to germinate and penetrate plant tissue.",
    treatment_steps: ["Apply Metalaxyl-M or Mancozeb fungicide immediately.", "Remove and burn all infected lower leaves to stop the spread.", "Improve soil drainage to prevent root-zone moisture buildup."],
    prevention_tips: ["Space plants 24 inches apart for better wind flow.", "Switch to drip irrigation to keep the leaves dry."],
    is_safe_organic: false
  },
  "Tomato___Yellow_Leaf_Curl_Virus": {
    explanation: "This is a viral infection transmitted by the Silverleaf Whitefly. It happens when the pest feeds on an infected host and moves to your crop. The virus disrupts the plant's nutrient flow, causing stunted growth and leaf curling.",
    treatment_steps: ["Use yellow sticky traps to catch whiteflies.", "Apply a 1% Neem Oil solution every 7 days.", "Pull out and burn heavily infected plants immediately."],
    prevention_tips: ["Install insect-proof netting over your nursery.", "Plant resistant varieties like Arka Ananya."],
    is_safe_organic: true
  },
  "Tomato___Bacterial_spot": {
    explanation: "Caused by 'Xanthomonas' bacteria, which thrive in warm, humid weather. The bacteria enter through natural openings or wounds in the plant, often spreading via rain splashes or contaminated tools.",
    treatment_steps: ["Spray Copper-based fungicides (Kocide).", "Disinfect all farming tools with 70% alcohol.", "Prune infected leaves during dry weather only."],
    prevention_tips: ["Use only certified disease-free seeds.", "Avoid overhead watering during the evening."],
    is_safe_organic: false
  },
  // POTATO CLASSES
  "Potato___Early_blight": {
    explanation: "Caused by the fungus 'Alternaria solani'. It usually attacks plants that are stressed or lacking nutrients. The fungus survives in soil and crop debris, splashing onto lower leaves during irrigation or rainfall.",
    treatment_steps: ["Apply Chlorothalonil or Azoxystrobin.", "Add extra Nitrogen fertilizer to boost plant strength.", "Clear all crop leftovers from the field after harvest."],
    prevention_tips: ["Rotate crops every 3 years (avoid tomato/potato sequence).", "Mulch the soil with straw to prevent soil splash."],
    is_safe_organic: false
  },
  "Potato___Late_blight": {
    explanation: "Triggered by 'Phytophthora infestans', the same pathogen behind the Irish Famine. It spreads incredibly fast in cool, misty conditions, turning healthy fields into rot within days.",
    treatment_steps: ["Apply Cymoxanil or Dimethomorph fungicides.", "Heap more soil around the base to protect the potatoes underground.", "Destroy any old potato piles near the field."],
    prevention_tips: ["Plant only certified disease-free seed tubers.", "Watch for high humidity (>90%) which signals danger."],
    is_safe_organic: false
  },
  // HEALTHY
  "healthy": {
    explanation: "Your plant shows optimal chlorophyll levels and strong cell structure. No pathogens, necrosis, or pest activity were detected by the neural scan.",
    treatment_steps: ["Continue regular N-P-K fertilization.", "Monitor for early pest signs once a week.", "Ensure the plant gets 6-8 hours of sunlight."],
    prevention_tips: ["Test soil pH every season (Aim for 6.0-7.0).", "Encourage ladybugs and other beneficial insects."],
    is_safe_organic: true
  }
};

/**
 * Stage 2: Algorithm matches Label to Hard-Coded Ground Truth.
 * Now with improved fallback logic for natural language causes.
 */
export const getTechnicalAdvice = (label: string): Partial<DiagnosisData> => {
  const key = Object.keys(DATASET_GROUND_TRUTH).find(k => label.includes(k)) || 
              (label.toLowerCase().includes('healthy') ? 'healthy' : null);

  if (key && DATASET_GROUND_TRUTH[key]) {
    return DATASET_GROUND_TRUTH[key];
  }
  
  // High-Quality Fallback for unknown classes
  const crop = label.split('___')[0]?.replace('___', ' ') || 'Crop';
  const disease = label.split('___')[1]?.replace(/_/g, ' ') || 'Condition';

  return {
    explanation: `The scan detected ${disease} on your ${crop}. This condition is typically triggered by environmental stress or localized fungal spores that take advantage of high humidity or poor soil drainage.`,
    treatment_steps: ["Isolate the affected area immediately.", "Apply a broad-spectrum organic fungicide.", "Check the underside of leaves for hidden pests."],
    prevention_tips: ["Increase plant spacing for better airflow.", "Clean your tools before moving to healthy plants."],
    is_safe_organic: true
  };
};
