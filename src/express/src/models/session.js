const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    expired: {
      type: Date
    }
});

module.exports = mongoose.model('Session', sessionSchema);
