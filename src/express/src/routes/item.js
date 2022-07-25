const express = require('express');
const { body, validationResult } = require('express-validator');

const Item = require('../models/item');

const router = express.Router();


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

const addValidations = [
  body('name').isLength({ min: 3, max: 50 }),
];

function addHandler(req, res, next) {
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

router.post('/add/:groupId/', ...addValidations, addHandler);


module.exports = router;
