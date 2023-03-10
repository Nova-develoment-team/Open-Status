/* --------- Packages ---------*/
const express = require('express')
const {
  Client
} = require('nova-log.js')
const {
  QuickDB
} = require('quick.db')
const { grey, green, bgBlue, bgGreen, bgRed, blue, red} = require('chalk')
const schedule = require('node-schedule')
const ip = require('ip');
const chalk = require('chalk')
const config = require('./config.js')
const figlet = require('figlet')
const dayjs = require('dayjs')
const ejs = require('ejs')
const formatted = dayjs().format("YYYY-MM-DD H:m:s");
port = config.settings.port || 8080



/* --------- Init --------- */
const log = new Client({
  logPath: "./data/logs",
  color: true
})
const db = new QuickDB({
  filePath: "./data/db/response-times.sqlite"
})
const app = express()

if (config.settings.devpanel == true){
  if (!process.env.ci) {
   log.error(`You forgot to add the bot's clientId for oauth. Exiting to stop further errors.`)
process.exit(1)
  }

    if (!process.env.cs) {
   log.error(`You forgot to add the bot's clientSecret for oauth. Exiting to stop further errors.`)
process.exit(1)
  }

    if (!process.env.domain) {
   log.error(`You forgot to add the domain for oauth. Exiting to stop further errors.`)
process.exit(1)
  }
}

/* --------- Express Config --------- */
app.set('view engine', ejs)

/* --------- Router locations --------- */
const api = require('./routes/api.js')
const home = require('./routes/home.js')
const dev = require('./routes/dev.js')
/* --------- Routes --------- */
app.use('/api', api)
if (config.settings.devpanel == true){
app.use('/dev', dev)
}

app.get('/*', async (req, res) => {
  res.json({
    message: "Error! Please only access from /api"
  })
})

/* --------- Port Listener --------- */
app.listen(port, () => {
  console.log(`${chalk.red(figlet.textSync("<<< SSC >>>", { font: "ANSI Shadow" }))}`);
  log.debug('Starting up on'+` ${ip.address()}:${port} `)
    if (!config.settings.port){
log.debug('Port not defined. Using default')
    }
  if (config.settings.devpanel == true){
log.debug('[ ✔ ] Dev panel')
  } else {
log.debug('[ ❌ ] Dev panel')
  }
    if (config.settings.api_only == true){
log.debug('[ ✔ ] Api only')
  } else {
log.debug('[ ❌ ] Api only')
  }
});
