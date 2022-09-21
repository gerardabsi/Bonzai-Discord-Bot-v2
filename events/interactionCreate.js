module.exports = async (client, interaction) => {
  const command = await client.commands.get(interaction.commandName);

  if (interaction.isSelectMenu()) {
    const channel = await client.channels.cache.get(
      interaction.message.channelId
    );

    const message = await channel.messages.fetch(interaction.message.id);

    if (interaction.customId === 'vod-select-menu') {
      const interactionValues = interaction.values[0].split(' ');
      const user = await client.users.fetch(interactionValues[1]);
      user.send(`Your vod request has been approved:\n${interactionValues[0]}`);
    }

    message.embeds[0].fields.find((f) => f.name === 'Status').value =
      'Completed';

    await message.edit({ embeds: [message.embeds[0]], components: [] });
  }

  if (interaction.isButton()) {
    const channel = await client.channels.cache.get(
      interaction.message.channelId
    );
    
    const message = await channel.messages.fetch(interaction.message.id);

    await message.delete();
  }

  if (interaction.isCommand()) {
    await command.execute(client, interaction);
  }
};
