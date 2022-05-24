const express = require("express");

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');


const PORT = 3000;


const app = express();


app.set("views", "./views");
app.set("view engine", "pug");

app.use('/', indexRouter);
app.use('/profile', profileRouter);


app.listen(PORT, () => {
  console.log(`App listening on port ${ PORT }`);
});
