const MongoClient = require('mongodb').MongoClient;
const config = require('../config/env.js');

const client = new MongoClient(config.mongodbUrl, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(err => {
  if (err) throw err;
//   client.close();
});


module.exports = client;
