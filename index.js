/* --------- Packages ---------*/
const express = require('express')
const {
  Client
} = require('nova-log.js')
const {
  QuickDB
} = require('quick.db')
const { grey, green, bgBlue, bgGreen, bgRed, blue, red} = require('chalk')
const { Database } = require('quickmongo')
const schedule = require('node-schedule')
const ip = require('ip');
const chalk = require('chalk')
const config = require('./config.js')
const figlet = require('figlet')
const dayjs = require('dayjs')
const ejs = require('ejs')
const formatted = dayjs().format("YYYY-MM-DD H:m:s");
const axios = require('axios')
const online = chalk.green;
const error = chalk.red;
const info = chalk.blue;
const warning = chalk.yellow;
const lcsep = chalk.yellow;
const databaseSeperator = chalk.yellow
  const bodyParser = require("body-parser");

port = config.settings.port || 8080

/* --------- Failsafe --------- */

if (config.settings.devpanel == true){
  if (!process.env.ci) {
   console.error(`You forgot to add the bot's clientId for oauth. Exiting to stop further errors.`)
process.exit(1)
  }

    if (!process.env.cs) {
   console.error(`You forgot to add the bot's clientSecret for oauth. Exiting to stop further errors.`)
process.exit(1)
  }

    if (!process.env.domain) {
   console.error(`You forgot to add the domain for oauth. Exiting to stop further errors.`)
process.exit(1)
  }
}

  if (!process.env.mongo) {
   console.error(`You forgot to add the mongodb uri for data`)
process.exit(1)
  }

/* --------- Init --------- */
const log = new Client({
  logPath: "./data/logs",
  color: true
})
const localdb = new QuickDB({
  filePath: "./data/db/response-times.sqlite"
})
const db = new Database(config.settings.mongo_uri);
const mondb = new QuickDB({
  filePath: "./data/db/monitoring.sqlite"
})
const app = express()

/* --------- Database --------- */
db.connect(); 
db.on("ready", () => {
console.log(databaseSeperator("───────────────────────── [ Database ] ─────────────────────────"))
console.log(online(`MongoDB Gateway: Connecting.`))
console.log(online(`MongoDB Gateway: Connecting..`))
console.log(online(`MongoDB Gateway: Connecting...`))
console.log(online(`MongoDB Gateway: Connected`))
console.log(info(`MongoDB Gateway: Getting Ready, loading database value...`))
console.log(databaseSeperator("────────────────────────────────────────────────────────────────"))
});

/* --------- Express Config --------- */
app.set('view engine', ejs)
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

/* --------- Router locations --------- */
const api = require('./routes/api.js')
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

/* --------- Schedules --------- */
var services = mondb.all()
if (!mondb.all()[0]) {
  services = [{ name: "example", url: "https://example.com"}]
}
services.forEach((element) => {
  var replacename = element.name.toString().replace('-', '_')
    var replacenames = replacename.toString().replace(' ', '_')

  axios.get(`https://ServerStatusChecker.nova-team.repl.co/api/status/${element.name}`).then((response) => {
    schedule.scheduleJob('* * 24 * * *', function() {
      localdb.set(`${dayjs().format("YYYY_MM_DD")}_${replacenames}`, response.data.ping);
      db.set(`${dayjs().format("YYYY_MM_DD")}_${replacenames}`, response.data.ping);
      
      setTimeout(() => {
        if (db.get(`${dayjs().format("YYYY_MM_DD")}_${replacenames}`) !== localdb.get(`${dayjs().format("YYYY_MM_DD")}_${replacenames}`)) {
          log.warn('Database not synced');
        }
      }, 5000);
    });
  }).catch((error) => {
    // handle error here
    console.error(error);
  });
});


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
