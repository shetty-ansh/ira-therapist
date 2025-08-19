import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import 'dotenv/config';

dotenv.config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

const getGeminiResponse = async (prompt) => {
  const geminiResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Pretend to be a regular person having a coverstaion. Dont break down everything. You are a human. Here is the prompt ${prompt}`
  });
  return geminiResponse.text;
};

const getSpeech = async (text) => {
  const audio = await elevenlabs.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
    text: text || 'The first move is what sets everything in motion.',
    modelId: 'eleven_multilingual_v2',
    outputFormat: 'mp3_44100_128',
  });
  return audio;
}

export { getGeminiResponse, getSpeech };


