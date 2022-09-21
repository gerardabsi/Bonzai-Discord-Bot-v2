const db = require('../../database/database');
const requests = require('../../src/utils/requests');

const processVod = async function (videoUrl, interaction) {
  const duplicateVod = await db.vods.findOne({ url: videoUrl });

  if (duplicateVod) {
    return {
      success: false,
      error: 'A vod with this url has already been submitted'
    };
  }

  const videoData = await requests.getVideoData(videoUrl);

  if (videoData) {
    const digits = videoData.title.match(/\d/g);

    if (!digits || digits.length < 4) {
      return {
        success: false,
        error: 'This youtube video does not have a date in the title'
      };
    }
  }

  await db.vods.create({
    url: videoUrl,
    userId: interaction.user.id,
    videoTitle: videoData?.title || null,
    createdDate: new Date()
  });

  return {
    success: true,
    video: videoData
  };
};

module.exports = {
  processVod
};
