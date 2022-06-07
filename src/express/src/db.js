var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/inventorization');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var Schema = mongoose.Schema;

var ItemModelSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    title: { type: String, maxlength: 100 },
    count: { type: Number, min: 0 }
});

var ItemModel = mongoose.model('ItemModel', ItemModelSchema);
