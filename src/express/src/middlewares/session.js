const Session = require('../models/session');

const sessionMiddleware = (req, res, next) => {
  console.log('req.cookies.sessionId', req.cookies.sessionId);

  Session
  .findOne({ _id: req.cookies.sessionId })
  .exec((err, session) => {
    if (err) {
      return next(err);
    }

    if (session) {
      next();
    } else {
      next({
        status: 401,
        message: 'Unauthorized.',
        client: true
      });
    }
  });
}

module.exports = sessionMiddleware;
