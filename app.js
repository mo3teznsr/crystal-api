var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config()
const config = process.env;
//require("./config/db").connect();
require("./config/server")
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');


var app = express();


var cors = require('cors');
app.use(cors());
var corsMiddleware = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

  next();
}
app.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

app.use(corsMiddleware);
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json({limit: '10000kb'}))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
res.status(err.status || 500);
  res.send(err);
});
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});
module.exports = app;
