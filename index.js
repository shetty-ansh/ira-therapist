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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    // 1. Get Gemini response
    const geminiText = await getGeminiResponse(prompt);
    console.log("Gemini Response successful \n", geminiText);

    // 2. Get ElevenLabs speech from Gemini text
    const audioBuffer = await getSpeech(geminiText);
    console.log("ElevenLabs Response successful \n");

    // 3. Send audio file back to client
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Disposition": 'attachment; filename="response.mp3"',
    });
    res.send(audioBuffer);

  } catch (error) {
    console.error("Error in flow:", error);
    res.status(500).send("Error generating response");
  }
});
