const express = require('express');
const router = express.Router();
const {app_name} = require('../settings.json')

router.get('/', function(req, res, next) {
  res.render('index', {'title': app_name});
});

module.exports = router;
