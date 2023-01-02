const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  expired: {
    type: Date
  }
}, {
  methods: {
    refreshExpired(callback) {
      this.expired = new Date(Date.now() + 24 * 60 * 60 * 1000);
      return this.save().then(callback);
    }
  }
});

module.exports = mongoose.model('Session', sessionSchema);
