const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('noscript');
});

module.exports = router;
