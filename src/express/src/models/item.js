const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      maxlength: 100
    },
    count: {
      type: Number,
      min: 0
    },
    neededCount: {
      type: Number,
      min: 0
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group'
    }
});

itemSchema.static('getCount', function(name) {
  try {
    let item = this.findOne({ name: name });
    return item.count;
  } catch(error) {
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
