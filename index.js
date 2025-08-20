import express from "express";
import dotenv from "dotenv";
import { getGeminiResponse, getSpeech } from "./ira.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Test ElevenLabs endpoint
app.get("/test-tts", async (req, res) => {
  try {
    console.log("Testing ElevenLabs TTS...");
    const testText = "Hello, this is a test of the text to speech system.";
    const audioBuffer = await getSpeech(testText);
    
    if (audioBuffer && audioBuffer.length > 0) {
      const audioBase64 = audioBuffer.toString('base64');
      res.json({
        success: true,
        message: "ElevenLabs TTS is working",
        audioLength: audioBuffer.length,
        audioBase64Length: audioBase64.length
      });
    } else {
      res.json({
        success: false,
        message: "ElevenLabs returned empty audio buffer"
      });
    }
  } catch (error) {
    console.error("ElevenLabs test failed:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "ElevenLabs TTS test failed"
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("Received prompt:", prompt);

    // Get text response from Gemini
    const geminiText = await getGeminiResponse(prompt);
    console.log("Gemini Response successful:", geminiText);

    // Try to get audio from ElevenLabs, but don't fail if it doesn't work
    let audioBase64 = null;
    try {
      const audioBuffer = await getSpeech(geminiText);
      console.log("ElevenLabs Response successful, audio buffer length:", audioBuffer.length);

      // Ensure we have a valid buffer and convert to base64
      if (audioBuffer && audioBuffer.length > 0) {
        audioBase64 = audioBuffer.toString('base64');
        console.log("Audio converted to base64, length:", audioBase64.length);
      } else {
        console.log("No audio data received from ElevenLabs");
      }
    } catch (audioError) {
      console.error("ElevenLabs error (non-critical):", audioError.message);
      // Continue without audio - don't fail the entire request
    }

    // Always send the text response, with or without audio
    res.json({
      success: true,
      text: geminiText,
      audio: audioBase64,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ 
      success: false,
      error: error.message || "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
  console.log(`TTS test: http://localhost:${PORT}/test-tts`);
});
