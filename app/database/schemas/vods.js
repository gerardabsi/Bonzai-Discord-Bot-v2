const mongoose = require('mongoose');

const vodSchema = new mongoose.Schema(
  {
    url: String,
    userId: String,
    videoTitle: String,
    createdDate: Date
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('vods', vodSchema, 'vods');
