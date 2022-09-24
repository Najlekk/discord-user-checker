const express = require('express');
const axios = require("axios");
const settings = require("../settings.json");
const router = express.Router();
const moment = require('moment');

router.get('/:userId', function(req, res, next) {
  res.setHeader('content-type', 'application/json');
  const resp_data = {}
  //console.log(req.params.userId.toString().length);
  if(req.params.userId.toString().length < 17){
    resp_data['error'] = "Invalid id";
    res.send(resp_data)
    return;
  }
  axios.get('https://discord.com/api/users/' + req.params.userId, {
    headers: {
      'Authorization': settings.auth
    }
  }).then(response => {
    if(response.status !== 200){
      resp_data['error'] = "Invalid id";
      res.send(resp_data)
      return;
    }
    for(const key in response.data){
      resp_data[key] = response.data[key];
    }
    const unix = convertSnowflakeToUnix(resp_data['id']);
    const timestamp = moment.unix(unix/1000);
    resp_data['formatted_timestamp'] = timestamp.utc().format('MM-DD-YYYY, HH:mm:ss');
    if(resp_data['avatar'] != null) resp_data['avatar_url'] = 'https://cdn.discordapp.com/avatars/' + resp_data['id'] + '/' + resp_data['avatar'];
    if(resp_data['banner'] != null) resp_data['banner_url'] = 'https://cdn.discordapp.com/banners/' + resp_data['id'] + '/' + resp_data['banner'];
    res.send(resp_data)
  });
});

/*
router.get('/users/me', function(req, res, next) {
  res.setHeader('content-type', 'application/json');
  const resp_data = {}
  axios.get('https://discord.com/api/users/@me', {
    headers: {
      'Authorization': settings.auth
    }
  }).then(response => {
    if(response.status !== 200){
      resp_data['error'] = "Invalid id";
      res.send(resp_data)
      return;
    }
    for(const key in response.data){
      resp_data[key] = response.data[key];
    }
    const unix = convertSnowflakeToUnix(resp_data['id']);
    const timestamp = moment.unix(unix/1000);
    resp_data['formatted_timestamp'] = timestamp.utc().format('MM-DD-YYYY, HH:mm:ss');
    if(resp_data['avatar'] != null) resp_data['avatar_url'] = 'https://cdn.discordapp.com/avatars/' + resp_data['id'] + '/' + resp_data['avatar'];
    if(resp_data['banner'] != null) resp_data['banner_url'] = 'https://cdn.discordapp.com/banners/' + resp_data['id'] + '/' + resp_data['banner'];
    res.send(resp_data)
  });
});*/

//Convert discord id to unix
function convertSnowflakeToUnix(snowflake) {
  return snowflake / 4194304 + 1420070400000;
}

module.exports = router;
