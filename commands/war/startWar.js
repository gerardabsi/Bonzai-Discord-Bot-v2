const { getVoiceConnection } = require('@discordjs/voice');
const helper = require('../../src/utils/helper');
const intervals = require('../../src/utils/intervals');
const War = require('../../src/wars/war');

module.exports = {
  name: 'startwar',
  description: 'Starts the war interval which calls out respawn waves',

  async execute(client, interaction) {
    const connection = getVoiceConnection(interaction.guild.id);

    if (!helper.botConnected(connection)) {
      return interaction.reply({
        content: 'Bot is not connected to a voice channel',
        ephemeral: true
      });
    }

    const intervalList = intervals.getIntervals();

    if (intervalList.length > 0) {
      return interaction.reply({
        content: 'An interval is already running',
        ephemeral: true
      });
    }

    const totalSeconds = helper.getRemainingSeconds(new Date());
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    interaction.reply(`Starting respawn timer in **${minutes}m ${seconds}s**`);

    await helper.pauseExecution(totalSeconds * 1000);

    const war = new War(connection);

    war.startRespawnInterval();
  }
};
