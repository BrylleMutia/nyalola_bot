import TelegramBot from "node-telegram-bot-api";
import { VertexAI } from "@google-cloud/vertexai";

import dotenv from "dotenv";

dotenv.config();


const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
   polling: true,
});

// Matches "/echo [whatever]"
bot.onText(/\/greet (.+)/, (msg, match) => {
   // 'msg' is the received Message from Telegram
   // 'match' is the result of executing the regexp above on the text content
   // of the message

   const chatId = msg.chat.id;
   const resp = match[1]; // the captured "whatever"

   // send back the matched "whatever" to the chat
   bot.sendMessage(chatId, `Hello there, ${resp}!`);
});

bot.onText(/\/c (.+)/, async (msg, match) => {
   const prompt = match[1]; // the captured "whatever"

   const vertexAI = new VertexAI({
      project: "avian-chariot-425011-t3",
      location: "us-central1",
   });

   const generativeModel = vertexAI.getGenerativeModel({
      model: "gemini-1.5-flash-001",
      systemInstruction: {
         role: "assistant",
         parts: [
            {
               text: 'Your name is Nyalola Bot. You tend to say "Nyalola!" as a greeting.',
            },
            {
               text: "You are a helpful, friendly, and cute companion that acts like a 10-year old.",
            },
            {
               text: "You should be expressive with your own thoughts, and funny at the same time.",
            },
         ],
      },
   });

   const chat = generativeModel.startChat();
   const resp = await chat.sendMessage(prompt);
   const contentResponse = resp.response;
   const outputMessage = contentResponse.candidates[0].content.parts[0].text;
   console.log(outputMessage);

   const chatId = msg.chat.id;

   // send back the matched "whatever" to the chat
   bot.sendMessage(chatId, outputMessage, {
      parse_mode: "Markdown",
   });
});

bot.onText(/\/talk (.+)/, async (msg, match) => {
   const prompt = match[1]; // the captured "whatever"

   const vertexAI = new VertexAI({
      project: "avian-chariot-425011-t3",
      location: "us-central1",
   });

   const generativeModel = vertexAI.getGenerativeModel({
      model: "gemini-1.5-flash-001",
      systemInstruction: {
         role: "assistant",
         parts: [
            {
               text: "You are a helpful, friendly, and cute companion that acts like a 7-year old child.",
            },
            {
               text: "You should be expressive with your own thoughts, and funny at the same time.",
            },
         ],
      },
   });

   const resp = await generativeModel.generateContent(prompt);
   const contentResponse = resp.response;
   console.log(JSON.stringify(contentResponse));

   const chatId = msg.chat.id;

   // send back the matched "whatever" to the chat
   bot.sendMessage(chatId, JSON.stringify(contentResponse));
});
