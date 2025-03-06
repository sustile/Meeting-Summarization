const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
require("dotenv").config();

async function transcribeAudio(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found: " + filePath);
    }

    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));
    formData.append("model", "whisper-1");

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );

    return response.data.text;
  } catch (error) {
    console.error("Transcription failed:", error.response?.data || error);
    throw new Error("Failed to transcribe audio.");
  }
}

module.exports = { transcribeAudio };
