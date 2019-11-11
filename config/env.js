
const env = process.env.NODE_ENV;

let config = {};
if (env === 'HEROKU') {
  config.mongodbUrl = process.env.mongodbUrl;
} else {
  config = require('./local.js');
}

module.exports = config;
