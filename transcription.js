const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

async function transcribeAudio(filePath) {
  try {
    const audioData = fs.createReadStream(filePath);

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      { file: audioData, model: "whisper-1" },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    return response.data.text;
  } catch (error) {
    console.error("Transcription failed:", error);
    throw new Error("Failed to transcribe audio.");
  }
}

module.exports = { transcribeAudio };
