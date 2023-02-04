module.exports = async (client) => {
  client.user.setPresence({
    activities: [{ name: '/help', type: 'LISTENING' }],
    status: 'online'
  });

  const commands = [];

  client.commands.forEach((cmd) => {
    commands.push({
      name: cmd.name,
      description: cmd.description,
      options: cmd.options
    });
  });

  client.application.commands.set(commands);

  console.log(`Logged in as ${client.user.tag}`);
};
