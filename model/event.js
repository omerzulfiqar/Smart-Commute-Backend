const db = require('../model/database.js');

const EventModel = {};

EventModel.removeEntry = async (e) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.db('twitter').collection('Incident').updateOne({ 
        TweetID: e.TweetID,
      }, {
        $set: { IsDeleted: true },
      });
      resolve(e);
    } catch (error) {
      reject(error);
    }
  });
};

EventModel.addEntry = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.db('twitter').collection('Incident').insertOne(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = EventModel;
