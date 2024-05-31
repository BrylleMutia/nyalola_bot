import TelegramBot from "node-telegram-bot-api";
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

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on("message", (msg) => {
//    const chatId = msg.chat.id;
//    console.log(chatId);

//    // send a message to the chat acknowledging receipt of their message
//    bot.sendMessage(chatId, `Received your message: ${msg.text}`);
// });
