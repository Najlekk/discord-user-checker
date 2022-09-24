const express = require('express');
const axios = require("axios");
const settings = require("../settings.json");
const router = express.Router();

router.get('/:userId', function(req, res, next) {
  res.setHeader('content-type', 'application/json');
  const resp_data = {}
  axios.get('https://discord.com/api/users/' + req.params.userId, {
    headers: {
      'Authorization': settings.auth
    }
  }).then(response => {
    for(const key in response.data){
      resp_data[key] = response.data[key]
    }
    if(resp_data.hasOwnProperty("avatar")) resp_data['avatar_url'] = 'https://cdn.discordapp.com/avatars/' + resp_data['id'] + '/' + resp_data['avatar'];
    if(resp_data.hasOwnProperty("banner")) resp_data['banner_url'] = 'https://cdn.discordapp.com/banners/' + resp_data['id'] + '/' + resp_data['banner'];
    res.send(resp_data)
  });
});

module.exports = router;
