const express = require('express');
const _ = require('lodash');
const HTTPStatus = require('http-status');
const db = require('../model/database.js');
const { requiredAuth } = require('../middleware/auth.js');
const { removeEntry, addEntry } = require('../model/event.js');

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const data = require('../model/station');
        const events = await db.db('twitter').collection('threatevent').find({ 
        }).sort({ datefield: 1 })
        .toArray();
        _.each(events, event => {
            const station = _.find(data.Stations, {'Code': event.code});
            if(!_.isEmpty(event.code) && !_.isNil(station)) {
                station.stories.push(event);
            } 
        });
        events.sort(function compare(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            return dateA - dateB;
        });
        res.status(HTTPStatus.OK).json(data);
    } catch (err) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
    }
});
module.exports = router;
