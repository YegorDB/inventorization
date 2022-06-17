var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('group', {
    pageTitle: "Inventorization | Group",
    title: "Group"
  });
});


module.exports = router;
