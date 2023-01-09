const Session = require('../../../models/session');
const User = require('../../../models/user');
const { callbackWrapper, setSessionCookie } = require('../../../utils');

const loginHandler = (req, res, next) => {
  User
  .findOne({
    username: req.body.username,
    password: req.body.password
  })
  .exec(callbackWrapper(next, user => {
    if (!user) {
      res.json({ success: false });
      return;
    }

    const session = new Session({
      user: user._id
    });
    session.refreshExpired(session => {
      setSessionCookie(res, session);
      res.json({ success: true });
    });
  }));
};

module.exports = loginHandler;
