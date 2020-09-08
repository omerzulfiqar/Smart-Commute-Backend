const express = require('express');
const _ = require('lodash');
const HTTPStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const db = require('../model/database.js');
const { requiredAuth } = require('../middleware/auth.js');
const { addEntry } = require('../model/news.js');


const router = express.Router();


/**
 * @api {get} /api/v1/news Get News
 * @apiVersion 1.0.0
 * @apiName Get All News
 * @apiDescription Get all news
 * @apiPermission anyone
 * @apiGroup News
 *
 *
 * @apiSuccessExample {json} Success-Response
 *     HTTP/1.1 200 OK
 * {
 *      "news": [
 *   ]
 * }
 *
 * @apiErrorExample {json} Error-Response
 *     HTTP/1.1 400 Bad Request
 */
router.get('/', async (_req, res) => {
    try {
        const data = await db.db('news').collection('news').find({
        }).sort({ $natural: -1 }).limit(300).toArray();
        const news = { news: [] };
        news.news = data;
        res.status(HTTPStatus.OK).json(news);
    } catch (err) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(err);
    }
});


/**
 * @api {post} /api/v1/news Create News
 * @apiVersion 1.0.0
 * @apiName Create News
 * @apiDescription UpCreatedate News status
 * @apiPermission apikey
 * @apiGroup News
 *
 * @apiHeader {String} api-key Permission key for this api
 *
 * @apiSuccessExample {json} Success-Response
 *     HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Error-Response
 *     HTTP/1.1 400 Bad Request
 * @apiErrorExample {json} Error-Response
 *     HTTP/1.1 500 INTERNAL_SERVER_ERROR
 */


router.post('/', requiredAuth(), async (req, res) => {
    const events = req.body;
    const addArray = [];
    _.each(events, async e => {
        console.log(e)
        

        const data = {};
        data.source = e.source;
        if (_.isEmpty(e.source)) {
            data.sourceName = e.source.name;
        }
        data.title = e.title;
        data.description = e.description;
        data.url = e.url;
        data.urlToImage = e.urlToImage;
        data.publisedAt = e.publisedAt;
        data.newsId = uuidv4();

        addArray.push(addEntry(data));
    });

    try {
        await Promise.all([
            addArray
        ]);
        res.status(HTTPStatus.OK).json({ status: 'ok' });
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
});


module.exports = router;
