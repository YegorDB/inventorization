var express = require("express");
var logger = require('morgan');

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');


var PORT = 3000;


var app = express();


app.set("views", "./views");
app.set("view engine", "pug");

app.use(logger('dev'));

app.use('/', indexRouter);
app.use('/profile', profileRouter);


app.listen(PORT, () => {
  console.log(`App listening on port ${ PORT }`);
});
