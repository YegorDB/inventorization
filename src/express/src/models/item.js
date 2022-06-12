var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: {
      type: String,
      maxlength: 100,
      unique: true
    },
    count: {
      type: Number,
      min: 0
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    }
});

itemSchema.static('getCount', function(name) {
  try {
    let item = this.findOne({ name: name });
    return item.count;
  } except(error) {
    // console.log(error);
    return 0;
  }
});

itemSchema.query.byName = function(name) {
  return this.where({
    name: new RegExp(name, 'i')
  });
};

module.exports = mongoose.model('Item', itemSchema);
