"use strict";

const express = require('express');
require('dotenv').config();
const createError = require('http-errors');
const expressFileUpload = require('express-fileupload');
const boom = require('express-boom');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./src/routes');
const helmet = require("helmet"); 
const xss = require('xss-clean');
const app = express();
app.enable("trust proxy");
app.use(helmet());
app.use(expressFileUpload());

const db = require('./libs/mysqlDB');
(async () => {
  try {
    const connection = await db.getConnection(process.env.DOMAINID);
    await connection.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
  }
})();
// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));


app.use(bodyParser.urlencoded({
  limit: '110mb',
  extended: true
}));

app.use(bodyParser.json({
  limit: '110mb',
  extended: true
}));
app.use(express.json({ limit: '110mb' }));

// Data Sanitization against XSS
app.use(xss());
app.use(cookieParser());
app.use(boom());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/views', express.static(__dirname + '/views'));

// API routes
app.use(router());

app.use('/uploads', express.static(__dirname + '/uploads'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // console.error(err);

  console.error('Not found::', req.originalUrl);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
