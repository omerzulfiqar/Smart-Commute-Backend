const express = require('express');
const _ = require('lodash');
const HTTPStatus = require('http-status');
const db = require('../model/database.js');
const { requiredAuth } = require('../middleware/auth.js');
const { removeEntry, addEntry } = require('../model/event.js');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const data = await db.db('twitter').collection('station').find({ 
    }).toArray();
    const events = await db.db('twitter').collection('threatevent').find({ 
    }).toArray();
    _.each(events, event => {
      const station = _.find(data[0].Stations, {'Code': event.code});
      if (!_.isEmpty(event.code) && !_.isNil(station)) {
        station.stories.push(event);
      }
      station.stories = _.sortBy(station.stories, ['date']);
    });
    _.each(data[0].Stations, station => {
      station.stories = _.sortBy(station.stories, ['date']);
    });

    res.status(HTTPStatus.OK).json(data[0]);
  } catch (err) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
  }
});
module.exports = router;
