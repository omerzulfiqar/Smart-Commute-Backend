const express = require('express');
const db = require('../model/database.js');
const HTTPStatus = require('http-status');

const router = express.Router();


router.get('/', async function mainHandler (req, res) {
  try {
    const events = await db.db('gmap').collection('event').find({}).toArray();
    console.log(events);
    res.status(HTTPStatus.OK).json(events);
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
  }
});

router.post('/', async function mainHandler (req, res) {
    const event = req.body;
    const result = await db.db('gmap').collection('event').insertOne(event);
    res.status(HTTPStatus.CREATED).json({"id":result.insertedId});
  });

module.exports = router;
