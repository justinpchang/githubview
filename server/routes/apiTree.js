var express = require('express');
var router = express.Router();

router.get('/:user/:repo', function(req, res, next) {
  res.render('tree', req.body);
});

module.exports = router;
