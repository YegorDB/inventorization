const async = require('async');
const express = require('express');
const { body, validationResult } = require('express-validator');

const Group = require('../models/group');
const Item = require('../models/item');

const router = express.Router();

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

const addItemValidations = [
  body('name').isLength({ min: 3, max: 50 }),
];

function addItemHandler(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const item = new Item({
    name: req.body.name,
    count: req.body.count,
    group: req.params.groupId,
  });

  item.save().then(item => res.json(item));
}

router.post('/items/add/:groupId/', ...addItemValidations, addItemHandler);

module.exports = router;
