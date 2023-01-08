const Session = require('../models/session');
const { setSessionCookie } = require('../utils');

const sessionMiddleware = (req, res, next) => {
  if (req.url == '/api/auth/login/' || req.url == '/api/auth/check/') {
    return next();
  }

  Session
  .findOne({
    _id: req.signedCookies.sessionId,
    expired: { $gte: new Date }
  })
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
        messages: ['Unauthorized.'],
        client: true
      });
    }
  });
}

module.exports = sessionMiddleware;
