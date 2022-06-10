var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/inventorization');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var Schema = mongoose.Schema;

var ItemModelSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    title: { type: String, maxlength: 100, unique: true },
    count: { type: Number, min: 0 }
});

ItemModelSchema.static('getCount', function(title) {
  try {
    let item = this.findOne({ title: title });
    return item.count;
  } except(error) {
    // console.log(error);
    return 0;
  }
});

ItemModelSchema.query.byTitle = function(title) {
  return this.where({ title: new RegExp(title, 'i') });
};

var ItemModel = mongoose.model('ItemModel', ItemModelSchema);
