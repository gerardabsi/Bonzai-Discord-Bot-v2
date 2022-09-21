const {
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow
} = require('discord.js');
const helper = require('../../src/utils/helper');
const db = require('../../database/database');

module.exports = {
  name: 'requestvod',
  description: 'Sends a vod request to the leadership team',
  options: [
    {
      type: 'MENTIONABLE',
      name: 'user',
      description: 'The vod owner you want to see a vod from',
      required: true
    },
    {
      type: 'STRING',
      name: 'type',
      description: 'The type of vod you want to see',
      required: false
    }
  ],

  async execute(client, interaction) {
    const member = interaction.options.getMentionable('user');
    const type = interaction.options.getString('type');
    const vods = await db.vods.find({ userId: member.user.id });

    const targetUsername = helper.getUsername(member);

    if (vods.length === 0) {
      return interaction.reply({
        content: `${targetUsername} has not submitted any vods`,
        ephemeral: true
      });
    }

    if (interaction.user.id === member.id) {
      return interaction.reply({
        content: 'You cannot request a vod from yourself',
        ephemeral: true
      });
    }

    const userVods = vods
      .sort((a, b) => b.createdDate - a.createdDate)
      .slice(0, 20);

    const formattedVods = [];
    const requesterUsername = helper.getUsername(interaction);

    const selectMenu = new MessageSelectMenu()
      .setCustomId('vod-select-menu')
      .setPlaceholder(`Select a vod to send to ${requesterUsername}`);

    userVods.forEach((vod, index) => {
      formattedVods.push(
        `**${index + 1}.** [${vod.videoTitle || 'N/A'}](${vod.url})`
      );

      selectMenu.addOptions([
        {
          label: `${index + 1}. ${vod.videoTitle || 'N/A'}`,
          value: `${vod.url} ${interaction.user.id}`
        }
      ]);
    });

    const embed = new MessageEmbed();
    embed.setTitle(`Vod Request from ${requesterUsername}`);
    embed.setThumbnail(interaction.user.avatarURL());
    embed.addField('Requester', `<@${interaction.user.id}>`, true);
    embed.addField('Target', `<@${member.id}>`, true);
    embed.addField('Status', 'Not Completed', true);
    embed.addField('Request Type', `${type || 'Not provided'}`, true);

    const row = new MessageActionRow().addComponents(selectMenu);

    await client.channels.cache
      .get('993448690826104892')
      .send({ embeds: [embed], components: [row] });

    interaction.reply({
      content: `Successfully sent your vod request to the leadership team\n\nYou will be sent 1 vod out of **${vods.length}** vods that ${targetUsername} has submitted`,
      ephemeral: true
    });
  }
};
