var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('item', {
    pageTitle: "Inventorization | Item",
    title: "Item"
  });
});


module.exports = router;
