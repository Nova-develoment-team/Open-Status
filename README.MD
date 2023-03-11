<h1 style="text-align:center"><strong>✨ Open-status ✨</strong></h1>

<h2><strong> Features 👇</strong></h2> 
<strong>
<li> Supports both api and GUI</li>
<li> Options between api and gui</li> 
<li> Customize everything </li> 
</strong>
<br>
<h2><strong> Documentation 👇</strong></h2> 
<h2 style="text-align:center"><strong> Setup </strong></h2>

<h3 style="text-align:center"> <strong>Notes</strong> </h3>

<p style="text-align:center">The db is checked every 5s for api</p>

<h3 style="text-align:center"><strong> Agent </strong></h3>
<li> The agent <strong>NEEDS</strong> to be a post route and ONLY and ONLY json!!!
</br></br>
<li> Example: </li>

```js 
const express = require('express')
const app = express()

app.post('/heartbeat', async (req, res) = {
    res.json({ message: "OK 200" })
})
```
<br>

<h3 style="text-align:center"><strong> Start </strong></h3>
<li> Before starting go to <strong>config.js</strong> fill out ever field. Port is exceptional. Default 8080</li>
<li> To start the server do <strong>"node index.js"</strong></li>
<li>After starting go to localhost:8080/dev/new <span style="font-size: 12px; font-weight: bold">*if default</span></li>
<li> Setup the urls for monitoring</li>
<li> Visit /api/status/Your url name</li>
<h2> For issues visit <a style="color: #325ca8" href="https://discord.gg/BASBGn7Gwh">Nova support</a></h2>
<br>
<h2 style="text-align:center"><strong> Api </strong></h2>
<li> <strong>To get the data do a get request to one of the names you put in the config.js. Example:</strong></li>
<br>

```js
/*
 in config.js it would look like this
  { name: "example", url: "https://example.com"
*/
axios.get('/api/status/example', {
    /*Your options*/
    }).then((response) => {
        console.log(response.data.status response.data.ping) /* returns "Online 1ms" */
    }).catch( (err) => {
        console.log(err) /*Logs out error*/
    })

```

<br>

<h2 style="text-align:center"><strong> Directory tree </strong></h2>

```
Openstatus
├─ config.js
├─ data
│  ├─ db
│  │  ├─ monitoring.sqlite
│  │  └─ response-times.sqlite
│  └─ logs
│     ├─ debug.log
│     └─ warning.log
├─ index.js
├─ package-lock.json
├─ package.json
├─ README.MD
└─ routes
   ├─ api.js
   ├─ dev.js
   └─ pages
      ├─ components
      │  └─ Dashboard
      │     ├─ foot.ejs
      │     └─ head.ejs
      ├─ index.ejs
      ├─ login.ejs
      └─ new.ejs

```