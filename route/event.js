const express = require('express');
const HTTPStatus = require('http-status');
const db = require('../model/database.js');

const router = express.Router();


router.get('/', async (_req, res) => {
  try {
    const events = await db.db('gmap').collection('event').find({}).toArray();
    console.info(events);
    res.status(HTTPStatus.OK).json(events);
  } catch (err) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
  }
});

router.post('/', async (req, res) => {
  const event = req.body;
  const result = await db.db('gmap').collection('event').insertOne(event);
  res.status(HTTPStatus.CREATED).json({ id: result.insertedId });
});

module.exports = router;
