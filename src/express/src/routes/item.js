var express = require('express');

var Item = require('../models/item');

var router = express.Router();


router.get('/:itemId/', function(req, res, next) {
  console.log('itemId', req.params.itemId);

  Item.findOne({ _id: req.params.itemId })
    .exec(function (err, item) {
      if (err) { return next(err); }

      res.render('item', {
        pageTitle: "Inventorization | Item",
        title: "Item",
        item: item,
      });
    });
});


module.exports = router;
