import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { OpenAI } from "openai";

import { google } from "googleapis";

// const { OAuth2 } = google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URL
// )

// const oAuth2Client = new OAuth2(
//   "952721833893-7jabu4ao987ll9aqkftm7atj66ra670l.apps.googleusercontent.com",
//   "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"
// );

// oAuth2Client.setCredentials({
//   refresh_token:
//     "1//04ZMmR1PnaDD6CgYIARAAGAQSNwF-L9IrN-iqfOGEpG4-uA1IZt3qDC6Pv8smFA23-VPBAgJBDSLvZufc_w4MhgqgQGioiBcEz9w",
// });

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
