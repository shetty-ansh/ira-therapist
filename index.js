  // import express from "express";
  // import dotenv from "dotenv";
  // import { getGeminiResponse, getSpeech } from "./ira.js";


  // dotenv.config();

  // const app = express();
  // const PORT = process.env.PORT || 3000;
  // const TTS = ''
  // app.use(express.json());

  // app.listen(PORT, () => {
  //   console.log(`Server running at http://localhost:${PORT}`);
  // });

  // app.post("/", async (req, res) => {

  //   try {

  //     const {prompt} = req.body;
  //     const geminiText = await getGeminiResponse(prompt);
  //     console.log("Gemini Response successful \n", geminiText);
  //     this.TTS = geminiText
  //   } catch (error) {

  //     console.error("Error, Invalid / No response from Gemini", error);
  //     res.status(500).send("Error generating Gemini response");

  //   }

  //   if(TTS){

  //     try {
  //       const audio = await getSpeech(TTS);
  //       console.log("ElevenLabs Response successful \n");
    
  //   } catch (error) {

  //     console.error("Error, Invalid / No response from ElevenLabs", error);
  //     res.status(500).send("Error generating ElevenLabs response");

  //   }

  //   }

  // });
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

    // Get audio from ElevenLabs
    const audioBuffer = await getSpeech(geminiText);
    console.log("ElevenLabs Response successful");

    // Convert audio buffer to base64
    const audioBase64 = audioBuffer.toString("base64");

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

// Keep the old endpoint for backward compatibility
// app.post("/", async (req, res) => {
//   try {
//     const { prompt } = req.body;
    
//     if (!prompt || prompt.trim() === '') {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     const geminiText = await getGeminiResponse(prompt);
//     console.log("Gemini Response successful:", geminiText);

//     const audioBuffer = await getSpeech(geminiText);
//     console.log("ElevenLabs Response successful");

//     res.json({
//       success: true,
//       text: geminiText,
//       audio: audioBuffer.toString("base64"),
//       timestamp: new Date().toISOString()
//     });

//   } catch (error) {
//     console.error("Error in root endpoint:", error);
//     res.status(500).json({ 
//       success: false,
//       error: error.message || "Internal server error",
//       timestamp: new Date().toISOString()
//     });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  // console.log(`Health check: http://localhost:${PORT}/health`);
});
