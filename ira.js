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
    
    console.log('Generating speech for text:', text.substring(0, 100) + '...');
    
    const audio = await elevenlabs.textToSpeech.convert('jsCqWAovK2LkecY7zXl4', {
      text: text,
      modelId: 'eleven_multilingual_v2',
      outputFormat: 'mp3_44100_128',
    });
    // JBFqnCBsd6RMkjVDRZzb
    console.log('ElevenLabs response type:', typeof audio);
    console.log('ElevenLabs response:', audio);
    
    // Convert the audio to a proper Buffer
    let audioBuffer;

    // Handle Web ReadableStream (shown in logs)
    if (audio && typeof audio.getReader === 'function') {
      console.log('Handling Web ReadableStream from ElevenLabs');
      const reader = audio.getReader();
      const chunks = [];
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) chunks.push(Buffer.from(value));
      }
      audioBuffer = Buffer.concat(chunks);
      console.log('Concatenated ReadableStream to Buffer, length:', audioBuffer.length);
    } else if (audio instanceof ArrayBuffer) {
      audioBuffer = Buffer.from(audio);
      console.log('Converted ArrayBuffer to Buffer, length:', audioBuffer.length);
    } else if (audio instanceof Buffer) {
      audioBuffer = audio;
      console.log('Audio is already a Buffer, length:', audioBuffer.length);
    } else if (audio instanceof Uint8Array) {
      audioBuffer = Buffer.from(audio);
      console.log('Converted Uint8Array to Buffer, length:', audioBuffer.length);
    } else if (audio && typeof audio === 'object' && audio.data) {
      // Handle case where ElevenLabs returns { data: ArrayBuffer | Uint8Array }
      if (audio.data instanceof ArrayBuffer) {
        audioBuffer = Buffer.from(audio.data);
        console.log('Extracted data(ArrayBuffer) to Buffer, length:', audioBuffer.length);
      } else {
        audioBuffer = Buffer.from(audio.data);
        console.log('Extracted data to Buffer, length:', audioBuffer.length);
      }
    } else {
      // Try to convert whatever we got
      audioBuffer = Buffer.from(audio);
      console.log('Converted unknown type to Buffer, length:', audioBuffer.length);
    }
    
    if (!audioBuffer || audioBuffer.length === 0) {
      throw new Error('Failed to create valid audio buffer');
    }
    
    return audioBuffer;
  } catch (error) {
    console.error('Error getting speech:', error);
    throw new Error(`Failed to generate speech: ${error.message}`);
  }
};

export { getGeminiResponse, getSpeech };


