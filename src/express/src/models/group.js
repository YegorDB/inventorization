const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
      type: String,
      maxlength: 100,
      unique: true
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group'
    },
});

module.exports = mongoose.model('Group', groupSchema);
