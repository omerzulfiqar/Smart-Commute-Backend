
const env = process.env.NODE_ENV;
const local = require('./local.js');

let config = {};
if (env === 'HEROKU') {
  config.mongodbUrl = process.env.mongodbUrl;
} else {
  config = local;
}

module.exports = config;
