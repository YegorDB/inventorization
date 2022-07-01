var express = require('express');
var router = express.Router();

var Group = require('../models/group');


router.get('/:groupId/', function(req, res, next) {
  console.log('groupId', req.params.groupId);

  Group.findOne({ _id: req.params.groupId })
    .exec(function (err, group) {
      if (err) { return next(err); }

      res.render('group', {
        pageTitle: "Inventorization | Group",
        title: "Group",
        group: group
      });
    });
});


module.exports = router;
