var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/inventorization');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var Schema = mongoose.Schema;

var ItemModelSchema = new Schema({
    _id: Number,
    title: String,
    count: Number
});

var ItemModel = mongoose.model('ItemModel', ItemModelSchema);
