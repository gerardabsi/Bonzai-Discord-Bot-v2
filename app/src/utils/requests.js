const axios = require('axios');

const noembed_api = 'https://www.youtube.com/oembed';

const getVideoData = async function (videoUrl) {
  let videoData = null;

  await axios
    .get(noembed_api, {
      params: {
        url: videoUrl
      }
    })
    .then((res) => {
      videoData = {
        title: res.data.title,
        thumbnail: res.data.thumbnail_url
      };
    })
    .catch((err) => {});

  return videoData;
};

module.exports = { getVideoData };
