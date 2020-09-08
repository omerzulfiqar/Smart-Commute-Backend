const _ = require('lodash');
const db = require('./database.js');

const NewsModel = {};

NewsModel.addEntry = (data) => new Promise(async (resolve, reject) => {
    try {
        const e = await db.db('news').collection('news').findOne({
            newsId: {
                $eq: data.newsId,
            },
        });
        if (_.isEmpty(e)) {
            await db.db('news').collection('news').insertOne(data);
        }
        resolve(data);
    } catch (error) {
        reject(error);
    }
});


module.exports = NewsModel;
