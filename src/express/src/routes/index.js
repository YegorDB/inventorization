var async = require('async');
var express = require('express');

var Group = require('../models/group');
var Item = require('../models/item');

var router = express.Router();

router.get('/', function(req, res, next) {
  async.parallel({
      group_count: function(callback) {
          Group.countDocuments({}, callback);
      },
      item_count: function(callback) {
          Item.countDocuments({}, callback);
      },
      groups: function(callback) {
          Group.find({group: null}, '_id name').exec(callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }

      res.render('index', {
        pageTitle: "Inventorization | Index",
        title: "Index",
        data: results,
      });
  });
});

module.exports = router;
