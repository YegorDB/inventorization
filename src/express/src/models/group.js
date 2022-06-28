var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: {
      type: String,
      maxlength: 100,
      unique: true
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    },
    // items : [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'Item'
    // }]
});

module.exports = mongoose.model('Group', groupSchema);
