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
  }, function(err, results) {
      res.render('index', {
        pageTitle: "Inventorization | Index",
        title: "Index",
        data: results,
        error: err
      });
  });
});

module.exports = router;
