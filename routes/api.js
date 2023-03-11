
const express = require('express')
const axios = require('axios')
const config = require('../config.js')
const router = express.Router()
const { QuickDB } = require('quick.db')
const db = new QuickDB({ filePath: "./data/db/monitoring.sqlite" });

async function checks() {
  const service = await db.all()
  
service.forEach(element => {
  router.get(`/status/${element.id}`, async (req, res) => {
    try {
      const start = Date.now();
      const response = await axios.post(`${element.value}/heartbeat`);
      const end = Date.now();
      res.json({ status: 'Online', ping: `${end - start}ms` });
    } catch (error) {
      res.json({ status: 'Offline', ping: 'Offline' });
    }
  });
});

}

setInterval(checks, 5000)


var appkey = config.settings.api_key || "hotdog"

router.post('/admin/new', async (req, res) => {
  if (req.headers.authorization === `Bearer ${appkey}`) {
    if (!req.body.name) {
      return res.json({ success: false, alert: { message: "You forgot to put the name", type: "error", title: "Oops!" } });
    }

    if (!req.body.url) {
      return res.json({ success: false, alert: { message: "You forgot to put the url", type: "error", title: "Oops!" } });
    }

    db.set(req.body.name, req.body.url);
    res.json({ success: true, alert: { message: "Success! Added it to the database", type: "success", title: "Success!" } });
  } else {
    res.json({ message: "Invalid apikey" });
  }
});

module.exports = router
