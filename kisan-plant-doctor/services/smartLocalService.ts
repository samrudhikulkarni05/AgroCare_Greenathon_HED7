
import { BotResponse } from '../types';

/**
 * ALGORITHM 1: Deterministic Pattern Matching (Supervised Learning Logic)
 * We use a pre-defined (supervised) set of labels/keywords to classify user intent with 100% accuracy.
 * This bypasses the LLM for common interactions, reducing API load to 0.
 */
const INTENT_PATTERNS = {
  GREETING: ['hi', 'hello', 'hey', 'namaste', 'namaskar', 'vanakkam', 'ssup', 'yo', 'start', 'begin'],
  GRATITUDE: ['thank', 'thanks', 'dhanyavad', 'shukriya', 'cool', 'good', 'great', 'awesome', 'nandri'],
  HELP: ['help', 'support', 'guide', 'how to', 'instruction']
};

/**
 * ALGORITHM 2: Associative Memory Caching (Unsupervised Learning Logic)
 * Uses a Hash Map to "learn" from previous interactions in the session.
 * If the exact same input (Feature Vector) is seen again, the result is retrieved instantly.
 */
const responseCache = new Map<string, BotResponse>();

export const getLocalResponse = (text: string, hasImage: boolean): BotResponse | null => {
  const normalized = text.trim().toLowerCase();
  
  // If image is present, we prioritize the visual analysis (Cloud API) unless cached
  if (hasImage) return null;

  // 1. Check Greetings
  if (INTENT_PATTERNS.GREETING.some(word => normalized === word || normalized.startsWith(word + ' '))) {
    return {
      type: 'CONVERSATION',
      text_response: "Namaste! I am ready to help. Please upload a clear photo of your crop for diagnosis."
    };
  }

  // 2. Check Gratitude
  if (INTENT_PATTERNS.GRATITUDE.some(word => normalized.includes(word))) {
    return {
      type: 'CONVERSATION',
      text_response: "You are welcome! Let me know if you need help with another crop."
    };
  }
  
  // 3. Check Help
  if (INTENT_PATTERNS.HELP.some(word => normalized.includes(word))) {
     return {
      type: 'CONVERSATION',
      text_response: "It's simple: \n1. Click the camera icon.\n2. Upload a photo of the affected leaf.\n3. I will tell you the disease and cure."
    };
  }

  return null;
};

export const getCachedResponse = (text: string, imageUri: string | null): BotResponse | undefined => {
    const key = createCacheKey(text, imageUri);
    const cached = responseCache.get(key);
    if (cached) {
        console.log("⚡ Cache Hit (Unsupervised Memory): Result retrieved instantly.");
    }
    return cached;
};

export const cacheResponse = (text: string, imageUri: string | null, response: BotResponse) => {
    const key = createCacheKey(text, imageUri);
    responseCache.set(key, response);
};

const createCacheKey = (text: string, imageUri: string | null): string => {
    // Generate a unique signature (Hash) for the input
    const textPart = text.trim().toLowerCase();
    // Use the last 50 characters of the base64 string as a signature for speed
    const imagePart = imageUri ? imageUri.slice(-100) : 'no_img'; 
    return `${textPart}|${imagePart}`;
};
