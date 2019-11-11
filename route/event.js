const express = require('express');
const _ = require('lodash');
const HTTPStatus = require('http-status');
const db = require('../model/database.js');

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

// router.post('/', async (req, res) => {
//   const event = req.body;
//   const result = await db.db('gmap').collection('event').insertOne(event);
//   res.status(HTTPStatus.CREATED).json({ id: result.insertedId });
// });

module.exports = router;
