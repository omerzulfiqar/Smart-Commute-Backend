'use strict';

const ms = require('ms');
const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const index = require('./route/index');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(setConnectionTimeout('30s'));

function setConnectionTimeout(time) {
  const delay = typeof time === 'string'
    ? ms(time)
    : Number(time || 5000);

  return function (req, res, next) {
    res.connection.setTimeout(delay, () => {
    res.err = `timeout ${delay}.`;
    });
    next();
  };
}

// Enable ALL CORS Requests
const corsOptions = {
  origin: '*',
  methods: [ 'GET', 'PUT', 'DELETE', 'POST', 'PATCH', 'OPTIONS' ],
  allowedHeaders: [ 'Content-Type']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);


app.use((req, res, next) => {
  if (!res.headersSent) {
    const err = new Error('Route Not Found');
    err.status = 404;
    res.err = err.stack;
    next(err);
    res.sendStatus(404);
  }
});

app.use((err, req, res) => {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    return;
  }
  const statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }

  if (req.timedout) {
    console.error(`request timeout: url=${req.originalUrl}, timeout=${err.timeout}`);
  }

  res.status(statusCode);
  let error = {};
  if (app.get('env') === 'development') {
    error = err;
  }

  res.render('error', {
    message: err.message,
    error: error
  });


});


module.exports = app;
