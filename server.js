const express = require("express");
const multer = require("multer");
const fs = require("fs").promises;
const path = require("path");
const mime = require("mime-types");

const { transcribeAudio } = require("./transcription");
const { summarizeText, extractActionItems } = require("./nlpUtils");
const { createTrelloTask } = require("./trelloIntegration");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());

app.post("/upload", upload.single("meeting"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let filePath = req.file.path;
    const detectedExt = mime.extension(req.file.mimetype) || "m4a";
    const newFilePath = `${filePath}.${detectedExt}`;

    await fs.rename(filePath, newFilePath);
    filePath = path.resolve(newFilePath);

    const transcript = await transcribeAudio(filePath);

    // console.log("Transcript : " + transcript);

    const summary = await summarizeText(transcript);

    // console.log("Summary : " + summary);

    const actionItems = await extractActionItems(transcript);

    // console.log("ActionItems : " + actionItems);

    const trelloTasks = await Promise.all(actionItems.map(createTrelloTask));

    await fs.unlink(filePath);

    res.json({ transcript, summary, actionItems, trelloTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
