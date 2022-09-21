const { getVoiceConnection } = require('@discordjs/voice');
const helper = require('../../src/utils/helper');
const voice = require('../../src/utils/voice');

module.exports = {
  name: 'leave',
  description: 'Disconnects the bot from a voice channel',

  async execute(client, interaction) {
    const connection = getVoiceConnection(interaction.guild.id);

    if (!helper.botConnected(connection)) {
      return interaction.reply({
        content: 'Bot is not connected to a voice channel',
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

    interaction.reply(`Disconnecting from <#${voiceChannel}> voice channel`);

    voice.destroyConnection(connection);
  }
};
