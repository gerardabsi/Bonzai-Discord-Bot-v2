const {
  joinVoiceChannel,
  createAudioResource,
  AudioPlayer,
  StreamType
} = require('@discordjs/voice');

const audioPlayer = new AudioPlayer();

const joinChannel = async function (interaction) {
  const connection = joinVoiceChannel({
    channelId: interaction.member.voice.channelId,
    guildId: interaction.guildId,
    adapterCreator: interaction.guild.voiceAdapterCreator,
    selfMute: false,
    selfDeaf: false
  });

  connection.subscribe(audioPlayer);
};

const destroyConnection = function (connection) {
  connection.disconnect();
  connection.destroy();
};

const playFile = function (source) {
  const audioResource = createAudioResource(source, {
    inputType: StreamType.Arbitrary,
    inlineVolume: true
  });

  audioPlayer.play(audioResource);
};

module.exports = {
  joinChannel,
  destroyConnection,
  playFile
};
