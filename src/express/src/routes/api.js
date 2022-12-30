const async = require('async');
const express = require('express');
const { body, validationResult } = require('express-validator');

const Group = require('../models/group');
const Item = require('../models/item');

const router = express.Router();

router.get('/groups/', (req, res, next) => {
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

router.get('/groups/:groupId/', (req, res, next) => {
  async.parallel({
    group: function(callback) {
      Group
      .findOne({ _id: req.params.groupId })
      .populate('group')
      .exec(callback);
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

router.get('/items/:itemId/', (req, res, next) => {
  Item
  .findOne({ _id: req.params.itemId })
  .populate('group')
  .exec(function (err, item) {
    if (err) {
      return next(err);
    }

    res.json(item);
  });
});

const validators = [
  body('name').isLength({ min: 3, max: 50 }),
];

function postRouter(url, validators, handler) {
  router.post(url, ...validators, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    handler(req, res, next);
  });
}

postRouter('/groups/add/:parentGroupId/', validators, (req, res, next) => {
  const group = new Group({
    name: req.body.name,
    group: req.params.parentGroupId == '_' ? null : req.params.parentGroupId,
  });

  group.save().then(group => res.json(group));
});

postRouter('/items/add/:parentGroupId/', validators, (req, res, next) => {
  const item = new Item({
    name: req.body.name,
    count: req.body.count,
    group: req.params.parentGroupId,
  });

  item.save().then(item => res.json(item));
});

module.exports = router;
