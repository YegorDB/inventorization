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

router.post('/add/:groupId/', function(req, res, next) {
  console.log('groupId', req.params.groupId);

  let item = new Item({
    name: req.body.name,
    count: req.body.count,
    group: req.params.groupId,
  });

  item.save()
  .then(i => res.redirect(301, `/item/${i._id}/`));
});


module.exports = router;
