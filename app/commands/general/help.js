const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Lists all the commands for the bot',

  async execute(client, interaction) {
    const embed = new MessageEmbed();
    embed.setTitle('Command List');
    embed.setThumbnail(client.user.displayAvatarURL());

    const commandList = [];

    client.commands.forEach((cmd) => {
      if (cmd.name !== 'help') {
        commandList.push(`/${cmd.name} - \`${cmd.description}\``);
      }
    });

    embed.addField('Commands', `${commandList.join('\n')}`);

    interaction.reply({ embeds: [embed] });
  }
};
