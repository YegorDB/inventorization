const Session = require('../models/session');
const { setSessionCookie } = require('../utils');

const sessionMiddleware = (req, res, next) => {
  Session
  .findOne({ _id: req.signedCookies.sessionId })
  .exec((err, session) => {
    if (err) {
      return next(err);
    }

    if (session) {
      session.refreshExpired(session => {
        setSessionCookie(res, session);
        next();
      });
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
