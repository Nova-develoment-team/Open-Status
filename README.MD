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
<h2 style="text-align:center"><strong> Directory tree </strong></h2>


```j
├─ config.js
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
      └─ login.ejs

```