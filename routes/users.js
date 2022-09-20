var express = require('express');
const axios = require("axios");
const settings = require("../settings.json.example");
var router = express.Router();

router.get('/:userId', function(req, res, next) {
  res.setHeader('content-type', 'application/json');
  axios.get('https://discord.com/api/users/' + req.params.userId, {
    headers: {
      'Authorization': settings.auth
    }
  }).then(response => {
    res.send(response.data);
  });
});

module.exports = router;
