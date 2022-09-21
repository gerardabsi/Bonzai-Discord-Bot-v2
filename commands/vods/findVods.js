const db = require('../../database/database');
const helper = require('../../src/utils/helper');

module.exports = {
  name: 'findvods',
  description: 'Displays the latest vods a user has submitted',
  options: [
    {
      type: 'MENTIONABLE',
      name: 'user',
      description: 'The user you want to lookup',
      required: true
    }
  ],

  async execute(client, interaction) {
    const permissions = interaction.member.permissions;
    const hasCoach = interaction.member._roles.includes('992796354801840218');

    if (!permissions.has('MANAGE_MESSAGES') && !hasCoach) {
      return interaction.reply({
        content: 'You do not have the required permissions to run this command',
        ephemeral: true
      });
    }

    const member = interaction.options.getMentionable('user');
    const vods = await db.vods.find({ userId: member.user.id });

    const username = helper.getUsername(member);

    if (vods.length === 0) {
      return interaction.reply({
        content: `${username} has not submitted any vods`,
        ephemeral: true
      });
    }

    const userVods = vods
      .sort((a, b) => b.createdDate - a.createdDate)
      .slice(0, 15);

    const formattedVods = [];

    userVods.forEach((vod, index) => {
      formattedVods.push(
        `**${index + 1}.** <${vod.url}> (\`${vod.videoTitle || 'N/A'}\`)`
      );
    });

    const message = `Showing **${
      formattedVods.length
    }** vods for ${username}:\n\n${formattedVods.join('\n')}`;

    interaction.reply({
      content: message,
      ephemeral: true
    });
  }
};
