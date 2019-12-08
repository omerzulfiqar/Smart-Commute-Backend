const _ = require('lodash');
const db = require('../model/database.js');

const EventModel = {};

EventModel.removeEntry = async (e) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.db('twitter').collection('Incident').findOneAndUpdate({ 
        Tweet_ID: { $eq: e },
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
      const e = await db.db('twitter').collection('Incident').findOne({
        Tweet_ID: { $eq: data.Tweet_ID },
      });
      if (_.isEmpty(e)) {
        await db.db('twitter').collection('Incident').insertOne(data);
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = EventModel;
