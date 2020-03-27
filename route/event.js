const express = require('express');
const _ = require('lodash');
const HTTPStatus = require('http-status');
const db = require('../model/database.js');
const { requiredAuth } = require('../middleware/auth.js');
const { removeEntry, addEntry, updateWebPush } = require('../model/event.js');

const router = express.Router();


router.get('/', async (_req, res) => {
  try {
    const data = await db.db('twitter').collection('threatevent').find({ 
      // IsDeleted: { $eq: false }
    }).toArray();
    const events = { events: [] };
    events.events = data;
    // _.each(data, d => {
    //   const event = {};
    //   // eslint-disable-next-line no-underscore-dangle
    //   event.id = d._id;
    //   event.name = d.name;
    //   event.description = d.Description;
    //   event.lat = d.CoordinateX;
    //   event.lng = d.CoordinateY;
    //   event.isIncidentTweet = d.IsIncidentTweet;
    //   event.category = d.Category;
    //   events.events.push(event);
    // });
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
    // if (e.Tokens[0] === 'cleared' || e.Tweet_Text.startsWith('Cleared:')) {
    //   removeArray.push(removeEntry(e.Tweet_ID));
    // } else {
      const data = {};
      // data.Tweet_ID = e.Tweet_ID;
      // data.Created_at = e.created_at;
      // data.Username = e.User_Screen_Name;
      // data.Description = e.Tweet_Text;
      // data.CoordinateX = e.Latitude;
      // data.CoordinateY = e.Longitude;
      // data.IsIncidentTweet = e.isIncidentTweet;
      // data.Category = e.Category;
      data.IsDeleted = false;
      // data.code = e.code;
      data.code = e.code;
      data.message = e.tweet_text;
      data.status = 0;
      data.date = e.created_at;
      addArray.push(addEntry(data));
    // }
    // const result = await db.db('twitter').collection('User').insertOne(e);
  });

  try {
    console.log(addArray.length);
    await Promise.all([
      removeArray,
      addArray,
    ]);
    res.status(HTTPStatus.OK).json({ status: 'ok' });
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ error });
  }
});

router.get('/webpush', async (_req, res) => {
  try {
    const data = await db.db('twitter').collection('webpush').find().toArray();
    const returnData = {
      auth: data[0].auth,
      endpoint: data[0].endpoint,
      p256dh: data[0].p256dh,
    };
    res.status(HTTPStatus.OK).json(returnData);
  } catch (err) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
  }
});


router.put('/webpush', requiredAuth(), async (req, res) => {
  try {
    const data = req.body;
    // await db.db('twitter').collection('webpush').find().toArray();
    await updateWebPush(data);
    const e2 = await db.db('twitter').collection('webpush').find().toArray();
    const returnData = {
      auth: e2[0].auth,
      endpoint: e2[0].endpoint,
      p256dh: e2[0].p256dh,
    };
    res.status(HTTPStatus.OK).json(returnData);
  } catch (err) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
  }
});

module.exports = router;
