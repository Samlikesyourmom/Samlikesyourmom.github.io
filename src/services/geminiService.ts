import { GoogleGenAI } from "@google/genai";

const FALLBACK_POEM = `In every universe, the stars align,
To say that you are wholly mine.
Across the void, my soul takes flight,
To find you, my eternal light.`;

export const generateLovePoem = async (name: string): Promise<string> => {
  // If no API key is set in .env.local, return the fallback immediately to prevent errors
  if (!process.env.API_KEY) {
    console.warn("API Key not found, using fallback poem.");
    return FALLBACK_POEM;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a very short, deeply romantic, cosmic-themed poem (max 4 lines) for a girl named ${name}. It should be about destiny, timelines, and eternal love. Do not use a title.`,
    });
    
    return response.text || FALLBACK_POEM;
  } catch (error) {
    console.error("Error generating poem:", error);
    return FALLBACK_POEM;
  }
};