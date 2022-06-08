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

schema.method('getCount', function (title) {
  try {
    let item = mongoose.model('ItemModel').findOne({ title: title });
    return item.count;
  } except(error) {
    // console.log(error);
    return 0;
  }
})

var ItemModel = mongoose.model('ItemModel', ItemModelSchema);
