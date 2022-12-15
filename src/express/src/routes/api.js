var async = require('async');
var express = require('express');

var Group = require('../models/group');
var Item = require('../models/item');

var router = express.Router();

router.get('/groups/', function(req, res, next) {
  async.parallel({
    groups: function(callback) {
      Group.find({group: null}, '_id name').exec(callback);
    },
  }, function(err, data) {
    if (err) {
      return next(err);
    }

    res.json(data.groups);
  });
});

router.get('/groups/:groupId/', function(req, res, next) {
  async.parallel({
    group: function(callback) {
      Group.findOne({ _id: req.params.groupId }).exec(callback);
    },
    groups: function(callback) {
      Group.find({ group: req.params.groupId }).exec(callback);
    },
    items: function(callback) {
      Item.find({ group: req.params.groupId }).exec(callback);
    },
  }, function(err, data) {
    if (err) {
      return next(err);
    }

    res.json(data);
  });
});

router.get('/items/:itemId/', function(req, res, next) {
  console.log('itemId', req.params.itemId);

  Item.findOne({ _id: req.params.itemId })
    .exec(function (err, item) {
      if (err) {
        return next(err);
      }

      res.json(item);
    });
});

module.exports = router;
