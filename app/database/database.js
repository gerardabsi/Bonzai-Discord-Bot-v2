const mongoose = require('mongoose');
const config = require('../config.js');

mongoose
  .connect(config.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((e) => {
    console.log('Database connection failed');
    console.error(e);
    process.exit(1);
  });

module.exports = {
  vods: require('./schemas/vods')
};
