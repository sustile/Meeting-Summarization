const axios = require("axios");
require("dotenv").config();

async function summarizeText(transcript) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Summarize the following meeting transcript:\n${transcript}`,
          },
        ],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Summarization failed:", error);
    throw new Error("Failed to summarize transcript.");
  }
}

async function extractActionItems(transcript) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Extract action items from the following meeting transcript:\n${transcript}`,
          },
        ],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    return response.data.choices[0].message.content
      .split("\n")
      .filter((item) => item.trim() !== "");
  } catch (error) {
    console.error("Action item extraction failed:", error);
    throw new Error("Failed to extract action items.");
  }
}

module.exports = { summarizeText, extractActionItems };
