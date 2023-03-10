const express = require('express')
const axios = require('axios')
const config = require('../config.js')
const router = express.Router()
const service = config.services

service.forEach( (element) => {
  router.get('/status/' + element.name, async (req, res) => {
    var start = Date.now();
  axios.post(element.url+'/heartbeat', { timeout: element.timeout || 5})
    .then(response => {
      var end = Date.now();
     res.json({ status: "Online", ping: end - start+"ms" })
    })
    .catch(error => {
      res.json({ status: "Offline", ping: "Offline"})

    });
});
})

module.exports = router
