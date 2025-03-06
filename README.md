# Meeting Summarization & Action Item Extraction

This project processes meeting recordings from **Microsoft Teams** and **Google Meet** to generate **transcripts, summaries, and action items**. It uses **OpenAI Whisper** for transcription and **LLM-based NLP models** for summarization.

## Features
- 📌 Upload meeting recordings (**m4a, mp3, wav, etc.**)
- 🎙️ Convert speech to text using **OpenAI Whisper**
- 📝 Generate concise **summaries** of meetings
- ✅ Extract **action items** from discussions

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/sustile/Meeting-Summarization.git
   cd Meeting-Summarization
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   OPENAI_API_KEY=API OPENAI_API_KEY
   TRELLO_API_KEY=TRELLO_API_KEY
   TRELLO_TOKEN=TRELLO_TOKEN
   TRELLO_LIST_ID=TRELLO_LIST_ID
   ```

## Usage

### Start the server
Run the following command:
```sh
npm run server
```
This will start the server on `http://localhost:3000`.

### Upload a Meeting Recording
Use an API testing tool like **Postman** or **cURL** to send a `POST` request to:
