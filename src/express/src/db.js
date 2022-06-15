var mongoose = require('mongoose');

mongoose.connect('mongodb://root:example@mongo:27017/');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// var createTestData = require('./test_data');
// createTestData();

module.exports = db;
