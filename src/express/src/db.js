var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/main_db');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
