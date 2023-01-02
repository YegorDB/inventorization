const async = require('async');
const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Group = require('../models/group');
const Item = require('../models/item');
const Session = require('../models/session');
const User = require('../models/user');
const {
  parentGroupsAggregation, jsonCallback, setSessionCookie,
} = require('../utils');

const router = express.Router();

router.get('/auth/check/', (req, res, next) => {
  Session
  .findOne({
    _id: req.signedCookies.sessionId,
    expired: { $gte: new Date }
  })
  .exec((err, session) => {
    if (err) {
      return next(err);
    }

    res.json({ success: new Boolean(session) });
  });
});

router.get('/groups/', (req, res, next) => {
  Group
  .find({group: null}, '_id name')
  .exec(jsonCallback(res, next));
});

router.get('/groups/:groupId/', (req, res, next) => {
  async.parallel({
    group: callback => {
      Group
      .findOne({ _id: req.params.groupId })
      .populate('group')
      .exec(callback);
    },
    groups: callback => {
      Group.find({ group: req.params.groupId }).exec(callback);
    },
    items: callback => {
      Item.find({ group: req.params.groupId }).exec(callback);
    },
    parentGroups: parentGroupsAggregation(Group, req.params.groupId),
  }, jsonCallback(res, next));
});

router.get('/items/:itemId/', (req, res, next) => {
  async.parallel({
    item: callback => {
      Item
      .findOne({ _id: req.params.itemId })
      .populate('group')
      .exec(callback);
    },
    parentGroups: parentGroupsAggregation(Item, req.params.itemId),
  }, jsonCallback(res, next));
});

const nameValidator = body('name').isLength({ min: 3, max: 50 });

function postRouter(url, validators, handler) {
  router.post(url, ...validators, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    handler(req, res, next);
  });
}

postRouter('/groups/add/:parentGroupId/', [nameValidator], (req, res, next) => {
  const group = new Group({
    name: req.body.name,
    group: req.params.parentGroupId == '_' ? null : req.params.parentGroupId,
  });

  group.save().then(group => res.json(group));
});

postRouter('/items/add/:parentGroupId/', [nameValidator], (req, res, next) => {
  const item = new Item({
    name: req.body.name,
    count: req.body.count,
    group: req.params.parentGroupId,
  });

  item.save().then(item => res.json(item));
});

postRouter('/auth/login/', [], (req, res, next) => {
  User
  .findOne({
    username: req.body.username,
    password: req.body.password
  })
  .exec((err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.json({ success: false });
      return;
    }

    const session = new Session({
      user: user._id
    });
    session.refreshExpired(session => {
      setSessionCookie(res, session);
      res.json({ success: true });
    });
  });
});

module.exports = router;
