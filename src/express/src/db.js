var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/inventorization');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: {
      type: String,
      maxlength: 100,
      unique: true
    },
    items : [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }]
});

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

var Group = mongoose.model('Group', groupSchema);
var Item = mongoose.model('Item', itemSchema);
