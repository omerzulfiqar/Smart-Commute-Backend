const express = require('express');
const _ = require('lodash');
const HTTPStatus = require('http-status');
const db = require('../model/database.js');
const { requiredAuth } = require('../middleware/auth.js');
const { removeEntry, addEntry } = require('../model/event.js');

const router = express.Router();


router.get('/', async (_req, res) => {
  try {
    const data = await db.db('twitter').collection('Incident').find({ IsDeleted: { $eq: false } }).toArray();
    const events = { events: [] };
    _.each(data, d => {
      const event = {};
      // eslint-disable-next-line no-underscore-dangle
      event.id = d._id;
      event.name = d.name;
      event.description = d.Description;
      event.lat = d.CoordinateX;
      event.lng = d.CoordinateY;
      event.isIncidentTweet = d.IsIncidentTweet;
      event.category = d.Category;
      events.events.push(event);
    });
    res.status(HTTPStatus.OK).json(events);
  } catch (err) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
  }
});


// two conditions:
// if description contains "cleared", then remove that record
// if not, add that record
router.put('/', requiredAuth(), async (req, res) => {
  const events = req.body;
  const removeArray = [];
  const addArray = [];
  _.each(events, async e => {
    if (e.Tokens[0] === 'cleared' || e.Tweet_Text.startsWith('Cleared:')) {
      removeArray.push(removeEntry(e.Tweet_ID));
    } else {
      const data = {};
      data.Tweet_ID = e.Tweet_ID;
      data.Created_at = e.created_at;
      data.Username = e.User_Screen_Name;
      data.Description = e.Tweet_Text;
      data.CoordinateX = e.Longitude;
      data.CoordinateY = e.Latitude;
      data.IsIncidentTweet = e.isIncidentTweet;
      data.Category = e.Category;
      data.IsDeleted = false;
      addArray.push(addEntry(data));
    }
    // const result = await db.db('twitter').collection('User').insertOne(e);
  });
  try {
    await Promise.all([
      removeArray,
      addArray,
    ]);
    res.status(HTTPStatus.OK).json({ status: 'ok' });
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ error });
  }
});

module.exports = router;
