var express = require('express');
var router = express.Router();


router.get('/:groupId/', function(req, res, next) {
  console.log('groupId', req.params.groupId);
  res.render('group', {
    pageTitle: "Inventorization | Group",
    title: "Group"
  });
});


module.exports = router;
