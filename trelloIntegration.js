const axios = require("axios");
require("dotenv").config();

const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const TRELLO_LIST_ID = process.env.TRELLO_LIST_ID;

async function createTrelloTask(task) {
  try {
    const response = await axios.post(`https://api.trello.com/1/cards`, {
      name: task,
      idList: TRELLO_LIST_ID,
      key: TRELLO_API_KEY,
      token: TRELLO_TOKEN,
    });

    return { id: response.data.id, name: response.data.name };
  } catch (error) {
    console.error("Trello task creation failed:", error);
    throw new Error("Failed to create Trello task.");
  }
}

module.exports = { createTrelloTask };
