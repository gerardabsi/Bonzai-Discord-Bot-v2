const { Client, Collection } = require('discord.js');
const config = require('./config');
const fs = require('fs');

const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_PRESENCES',
    'GUILD_MEMBERS',
    'GUILD_VOICE_STATES'
  ]
});

client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

const events = fs
  .readdirSync('./events/')
  .filter((file) => file.endsWith('.js'));

for (const event of events) {
  const eventFile = require('./events/' + event);
  const eventName = event.split('.')[0];

  client.on(eventName, eventFile.bind(null, client));
}

client.login(config.token);
