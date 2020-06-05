const express = require('express');
const _ = require('lodash');
const HTTPStatus = require('http-status');
const db = require('../model/database.js');

const router = express.Router();

/**
 * @api {get} /api/v1/station Get Stations
 * @apiVersion 1.0.0
 * @apiName Get Station
 * @apiDescription Get all the stations infomations with their events
 * @apiPermission anyone
 * @apiGroup Station
 *
 *
 *
 * @apiSuccessExample {json} Success-Response
 *     HTTP/1.1 200 OK
 * {
 * "_id": "5e72879f1c9d440000fadf88",
 *  "Stations": [
 *    {
 *      "Code": "A01",
 *      "Name": "Metro Center",
 *      "StationTogether1": "C01",
 *      "StationTogether2": "",
 *      "LineCode1": "RD",
 *      "LineCode2": null,
 *      "LineCode3": null,
 *      "LineCode4": null,
 *      "Lat": 38.898303,
 *      "Lon": -77.028099,
 *      "Address": {
 *        "Street": "607 13th St. NW",
 *        "City": "Washington",
 *        "State": "DC",
 *        "Zip": "20005"
 *      },
 *     "stories": []
 *     }
 *   ]
 * }
 *
 * @apiErrorExample {json} Error-Response
 *     HTTP/1.1 400 Bad Request
 */
router.get('/', async (_req, res) => {
    try {
        const data = await db.db('twitter').collection('station').find({}).toArray();
        console.log(data);
        
        const events = await db.db('twitter').collection('threatevent').find({ code: { $ne: null } }).toArray();
        
        _.each(events, event => {
            const station = _.find(data[0].Stations, { Code: event.code });
            if (!_.isEmpty(event.code) && !_.isNil(station)) {
                station.stories.push(event);
            }
            station.stories = _.sortBy(station.stories, ['date']);
        });
        console.log(data);
        _.each(data[0].Stations, station => {
            // eslint-disable-next-line no-param-reassign
            station.stories = _.sortBy(station.stories, ['date']);
            
        });
        console.log(data);
        res.status(HTTPStatus.OK).json(data[0]);
    } catch (err) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
    }
});
module.exports = router;
