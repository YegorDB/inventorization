var mongoose = require('mongoose');

// var Group = require('./models/group');

mongoose.connect('mongodb://root:example@mongo:27017/');
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// var group = new Group({
//   name: 'test',
// });
//
// group.save()
//   .then(doc => {
//     console.log('SAVED', doc);
//   })
//   .catch(err => {
//     console.error('ERROR', err);
//   });

module.exports = db;
