const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { treasuryChannelTypes } = require('../src/constants');
const helper = require('../src/utils/helper');

module.exports = async (client, message) => {
  const treasuryType = treasuryChannelTypes[message.channel.id];
  if (treasuryType === undefined || message.author.bot) return;

  const content = message.content.split('-').map((item) => item.trim());

  await message.delete();

  if (content && content.length !== 2) {
    return message.author.send(
      'Incorrect treasury message format. Please use: `{amount} - {reason}`'
    );
  }

  const embed = new MessageEmbed();
  embed.setThumbnail(message.author.displayAvatarURL());
  embed.addField('Author', `<@${message.author.id}>`, true);
  embed.addField('Amount', content[0], true);
  embed.addField('Reason', content[1], true);
  embed.addField('Date Created', helper.getDateWithoutTime(), true);

  const completed = new MessageButton()
    .setCustomId('completed')
    .setLabel(treasuryType === 'Loan' ? 'Paid Back?' : 'Taken Back?')
    .setStyle('PRIMARY');

  const buttonRow = new MessageActionRow().addComponents(completed);
  const isLoanOrStore = treasuryType === 'Loan' || treasuryType === 'Storing';

  await message.channel.send({
    embeds: [embed],
    components: isLoanOrStore ? [buttonRow] : null
  });
};
