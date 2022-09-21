const { MessageEmbed } = require('discord.js');
const vodStore = require('../../src/management/vods');
const helper = require('../../src/utils/helper');

module.exports = {
  name: 'submitvod',
  description: 'Sends a vod to the leadership team',
  options: [
    {
      type: 'STRING',
      name: 'video_url',
      description: 'The url of the vod',
      required: true
    }
  ],

  async execute(client, interaction) {
    const videoURL = interaction.options.getString('video_url');
    const response = await vodStore.processVod(videoURL, interaction);

    if (!response.success) {
      return interaction.reply({
        content: response.error,
        ephemeral: true
      });
    }

    const embed = new MessageEmbed();
    embed.setTitle('Vod Submission');
    embed.setThumbnail(response.video?.thumbnail);
    embed.setDescription(`Title: \`${response.video?.title || 'N/A'}\``);
    embed.addField('User', `<@${interaction.user.id}>`, true);
    embed.addField('Vod URL', `[**Link**](${videoURL})`, true);
    embed.addField('Role', `<@&${interaction.member.roles.highest.id}>`, true);
    embed.addField('Date Submitted', `${helper.getDateWithoutTime()}`);

    await client.channels.cache.get('986560786505793557').send({
      embeds: [embed]
    });

    interaction.reply({
      content: 'Successfully sent your vod to the leadership team',
      ephemeral: true
    });
  }
};
