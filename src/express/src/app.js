const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');

const db = require('./db');
const sessionMiddleware = require('./middlewares/session');
const apiRouter = require('./routes/api');

const PORT = 3000;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));

app.use(sessionMiddleware);

app.use('/api', apiRouter);

app.use((req, res, next) => {
  next({
    status: 401,
    message: 'Not found.',
    client: true
  });
})

app.use((err, req, res, next) => {
  console.log('Error', err);

  res.status(err.client ? err.status : 500);
  res.json({
    message: err.client ? err.message : 'Server error.'
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${ PORT }`);
});

module.exports = app;
