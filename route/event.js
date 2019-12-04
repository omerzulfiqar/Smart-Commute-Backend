const express = require('express');
const _ = require('lodash');
const HTTPStatus = require('http-status');
const db = require('../model/database.js');
const { requiredAuth } = require('../middleware/auth.js');

const router = express.Router();


router.get('/', async (_req, res) => {
  try {
    const data = await db.db('gmap').collection('event').find({}).toArray();
    const events = { events: [] };
    _.each(data, d => {
      const event = {};
      // eslint-disable-next-line no-underscore-dangle
      event.id = d._id;
      event.name = d.name;
      event.description = d.description;
      event.lat = d.lat;
      event.lng = d.lng;
      events.events.push(event);
    });
    console.info(events);
    res.status(HTTPStatus.OK).json(events);
  } catch (err) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
  }
});

router.put('/', requiredAuth(), async (req, res) => {
  const events = req.body;
  _.each(events, async e => {
    console.log(e);
    // const result = await db.db('twitter').collection('User').insertOne(e);
  });
  
  res.status(HTTPStatus.CREATED).json({ id: 'id' });
});

module.exports = router;
