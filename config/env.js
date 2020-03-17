
const env = process.env.NODE_ENV;

let config = {};
config.mongodbUrl = "mongodb+srv://cs5614:PKVrJTfnwxKW6o3b@cs5614-ckoux.gcp.mongodb.net/test?retryWrites=true&w=majority"
// if (env === 'HEROKU') {
//   config.mongodbUrl = process.env.mongodbUrl;
// } else {
//   config = require('./local.js');
// }

module.exports = config;
