// Initialize dotenv
const Database = require("./database");
const connectionProperties = require("./db.config.js");
require("dotenv").config();
let db;
let commands;

// Discord.js versions ^13.0 require us to explicitly define client intents
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  db = new Database(connectionProperties);
  console.log("Database connected!");
  commands = await db.query("SELECT * FROM commands");
});

client.on("messageCreate", (msg) => {
  let channel = msg.channel;
  commands.forEach((cmd) => {
    if (cmd.iskeyword == 1) {
      if (msg.content.includes(cmd.cmdtrigger)) {
        channel.send(cmd.response);
      }
    } else {
      if (msg.content.startsWith(cmd.cmdtrigger)) {
        channel.send(cmd.response);
      }
    }
  });
  //   if (msg.content === "Hello") {
  //     msg.reply(`Hello ${msg.author.username}`);
  //   }
});

// Log In our bot
client.login(process.env.CLIENT_TOKEN);
