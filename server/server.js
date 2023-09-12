import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";

import { google } from "googleapis";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
// allows us to make cross origin requests
app.use(cors());
//allow us to pass json from frontend to backend
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from your Assistant",
  });
});

const messageHistory = [
  {
    role: "system",
    content:
      "You are a personal assistant, make up a name for yourself. Introduce yourself when I give any prompt, only answer the prompt after introducing yourself",
  },
];

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log("Prompt is " + prompt);

    messageHistory.push({
      role: "user",
      content: `${prompt}`,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messageHistory,
      temperature: 0.25,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 0,
    });

    console.log(response);

    const botResponse = response.choices[0].message;

    // Add the bot's response to the conversation history
    messageHistory.push({
      role: "assistant",
      content: botResponse.content,
    });

    console.log(messageHistory);
    res.status(200).send({
      bot: response.choices[0].message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () =>
  console.log("Server is running on port http://localhost:5000")
);
