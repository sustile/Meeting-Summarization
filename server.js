const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { transcribeAudio } = require("./transcription");
const { summarizeText, extractActionItems } = require("./nlpUtils");
const { createTrelloTask } = require("./trelloIntegration");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());

app.post("/upload", upload.single("meeting"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const transcript = await transcribeAudio(filePath);

    const summary = summarizeText(transcript);
    const actionItems = extractActionItems(transcript);

    const trelloTasks = await Promise.all(
      actionItems.map((item) => createTrelloTask(item))
    );

    fs.unlinkSync(filePath);

    res.json({ transcript, summary, actionItems, trelloTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
