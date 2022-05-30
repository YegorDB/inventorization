var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', {
    pageTitle: "Inventorization | Index",
    title: "Index"
  });
});


module.exports = router;
