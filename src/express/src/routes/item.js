var express = require('express');
var router = express.Router();


router.get('/:itemId/', function(req, res, next) {
  console.log('itemId', req.params.itemId);
  res.render('item', {
    pageTitle: "Inventorization | Item",
    title: "Item"
  });
});


module.exports = router;
