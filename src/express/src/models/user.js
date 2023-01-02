const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      maxlength: 100,
      unique: true
    },
    password: {
      type: String,
      select: false
    },
});

module.exports = mongoose.model('User', userSchema);
