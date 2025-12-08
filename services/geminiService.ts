import { GoogleGenAI, Type, Schema } from "@google/genai";
import { KISAN_SYSTEM_INSTRUCTION } from "../constants";
import { BotResponse, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Comprehensive Schema covering all response types
const mainSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    type: { 
      type: Type.STRING, 
      enum: ["CONVERSATION", "DIAGNOSIS", "ASK_LOCATION_FOR_EXPERTS", "EXPERT_LIST"],
      description: "The type of response based on user input."
    },
    text_response: { type: Type.STRING, description: "The conversational text to display to the farmer." },
    diagnosis_data: {
      type: Type.OBJECT,
      nullable: true,
      properties: {
        disease_name: { type: Type.STRING },
        confidence: { type: Type.STRING, enum: ["HIGH", "LOW"] },
        crop_detected: { type: Type.STRING },
        explanation: { type: Type.STRING },
        treatment_steps: { type: Type.ARRAY, items: { type: Type.STRING } },
        prevention_tips: { type: Type.ARRAY, items: { type: Type.STRING } },
        is_safe_organic: { type: Type.BOOLEAN }
      }
    },
    experts_data: {
      type: Type.ARRAY,
      nullable: true,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          role: { type: Type.STRING },
          contact: { type: Type.STRING },
          address: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["GOVT", "PRIVATE", "NGO"] }
        }
      }
    }
  },
  required: ["type", "text_response"]
};

export const sendChatMessage = async (
  history: ChatMessage[],
  newImage: string | null,
  newAudio: string | null,
  newText: string,
  selectedLanguage: string,
  audioMimeType: string = "audio/webm"
): Promise<BotResponse> => {
  try {
    const parts: any[] = [];
    
    // 1. Build context from history (last 5 messages to save tokens)
    const recentHistory = history.slice(-5);
    let historyContext = "PREVIOUS CONVERSATION:\n";
    recentHistory.forEach(msg => {
      if (msg.role === 'user') {
        historyContext += `User: ${msg.content.text || '[Sent Media]'}\n`;
      } else {
        historyContext += `Bot: ${msg.content.botResponse?.text_response}\n`;
      }
    });

    // 2. Add current inputs
    if (newImage) {
      const base64Data = newImage.split(',')[1] || newImage;
      parts.push({
        inlineData: { mimeType: "image/jpeg", data: base64Data }
      });
    }

    if (newAudio) {
      const base64Data = newAudio.split(',')[1] || newAudio;
      // Ensure we use a valid mime type even if empty string is passed
      const validMime = (audioMimeType && audioMimeType.length > 0) ? audioMimeType : "audio/webm";
      parts.push({
        inlineData: { mimeType: validMime, data: base64Data }
      });
    }

    // Combine history and new text
    const promptText = `${historyContext}\n\nCURRENT USER INPUT: ${newText || (newAudio ? "[Audio Message]" : "[Image Message]")}`;
    parts.push({ text: promptText });

    // 3. Add Language Instruction
    const languageDirective = `\n\nIMPORTANT: The user has selected the language: "${selectedLanguage}". All 'text_response' and JSON string fields MUST be in ${selectedLanguage}.`;

    // 4. Call Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        systemInstruction: KISAN_SYSTEM_INSTRUCTION + languageDirective,
        responseMimeType: "application/json",
        responseSchema: mainSchema,
        temperature: 0.4, 
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    
    return JSON.parse(jsonText) as BotResponse;

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    // Fallback response if JSON parsing fails or API errors
    return {
      type: "CONVERSATION",
      text_response: "Sorry, I am having trouble connecting right now. Please try again."
    };
  }
};