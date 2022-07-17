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

router.post('/add/:groupId/', function(req, res, next) {
  console.log('groupId', req.params.groupId);

  let group = new Group({
    name: req.body.name,
    group: req.params.groupId == '_' ? null : req.params.groupId,
  });

  group.save()
  .then(g => res.redirect(301, `/group/${g._id}/`));
});

module.exports = router;
