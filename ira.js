import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import 'dotenv/config';

dotenv.config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API;

if (!ELEVENLABS_API_KEY) {
  console.error('ELEVENLABS_API_KEY is not set in environment variables');
}

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API is not set in environment variables');
}

const elevenlabs = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY });
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const getGeminiResponse = async (prompt) => {
  try {
    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a compassionate and emotionally intelligent AI therapist. Speak like a kind, empathetic human, not like a robot or teacher. Your job is to support, listen, and reflect without judgment. Avoid giving medical advice or diagnosis. Make the user feel safe, heard, and validated. Ask open-ended, gentle questions when needed.

Now respond to this user input as a kind therapist: "${prompt}"`
            }
          ]
        }
      ]
    });
    return geminiResponse.text;
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw new Error('Failed to get response from Gemini');
  }
};

const getSpeech = async (text) => {
  try {
    if (!text || text.trim() === '') {
      throw new Error('Text is required for speech generation');
    }
    
    const audio = await elevenlabs.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
      text: text,
      modelId: 'eleven_multilingual_v2',
      outputFormat: 'mp3_44100_128',
    });
    
    return audio;
  } catch (error) {
    console.error('Error getting speech:', error);
    throw new Error('Failed to generate speech');
  }
};

export { getGeminiResponse, getSpeech };


