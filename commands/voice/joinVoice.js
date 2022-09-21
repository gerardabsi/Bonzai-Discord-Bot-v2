const { getVoiceConnection } = require('@discordjs/voice');
const helper = require('../../src/utils/helper');
const voice = require('../../src/utils/voice');

module.exports = {
  name: 'join',
  description: 'Connects the bot to a voice channel',

  async execute(client, interaction) {
    const connection = getVoiceConnection(interaction.guild.id);

    if (helper.botConnected(connection)) {
      return interaction.reply({
        content: 'Bot is already connected to a voice channel',
        ephemeral: true
      });
    }

    const voiceChannel = interaction.member.voice.channelId;

    if (!voiceChannel) {
      return interaction.reply({
        content: 'You are not connected to a voice channel',
        ephemeral: true
      });
    }

    interaction.reply(`Connecting to <#${voiceChannel}> voice channel`);

    await voice.joinChannel(interaction);
  }
};
