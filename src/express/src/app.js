var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var path = require('path')

var db = require('./db');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var groupRouter = require('./routes/group');
var itemRouter = require('./routes/item');
var profileRouter = require('./routes/profile');


var PORT = 3000;


var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/group', groupRouter);
app.use('/item', itemRouter);
app.use('/profile', profileRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${ PORT }`);
});


module.exports = app;
