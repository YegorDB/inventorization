var async = require('async');
var express = require('express');

var Group = require('../models/group');
var Item = require('../models/item');

var router = express.Router();

router.get('/:groupId/', function(req, res, next) {
  console.log('groupId', req.params.groupId);

  async.parallel({
      group: function(callback) {
          Group.findOne({ _id: req.params.groupId }).exec(callback);
      },
      items: function(callback) {
          Item.find({ group: req.params.groupId }).exec(callback);
      },
  }, function(err, results) {
      if (err) { return next(err); }

      res.render('group', {
        pageTitle: "Inventorization | Group",
        title: "Group",
        data: results,
      });
  });
});


module.exports = router;
