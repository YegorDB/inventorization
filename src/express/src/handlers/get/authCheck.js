const Session = require('../../models/session');
const { callbackWrapper } = require('../../utils');

const authCheckHandler = (req, res, next) => {
  Session
  .findOne({
    _id: req.signedCookies.sessionId,
    expired: { $gte: new Date }
  })
  .exec(callbackWrapper(next, session => {
    res.json({
      success: new Boolean(session)
    });
  }));
};

module.exports = authCheckHandler;
