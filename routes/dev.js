const express = require('express');
const session = require('express-session');
const config = require('../config');
const crypto = require('crypto');
const DiscordOauth2 = require('discord-oauth2');
const { QuickDB } = require('quick.db')
const db = new QuickDB({ filePath: "./data/db/monitoring.sqlite" })

// Util
function removehttp(string) {
  if (string.startsWith("http://")) {
    string = string.slice("http://".length);
  } else if (string.startsWith("https://")) {
    string = string.slice("https://".length);
  }
  return string;
}


const oauth = new DiscordOauth2({
  clientId: config.discord.clientId,
  clientSecret: config.discord.clientSecret,
  redirectUri: config.settings.domain + '/dev/callback',
});

const router = express.Router();

router.use(session({
  secret: config.cookie.sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

router.get('/login', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  const url = oauth.generateAuthUrl({
    scope: ['identify'],
    state,
  });
  req.session.state = state;
  req.session.redirect = req.query.redirect
  if (!req.query.redirect){
    req.session.redirect = "/dev"
  }
  res.redirect(url);
});

router.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  if (state !== req.session.state) {
    res.status(403).send('Invalid state parameter');
    return;
  }
    if (!req.session.redirect) {
    res.redirect('/');;
  }
  try {
    const tokenData = await oauth.tokenRequest({
      code,
      scope: 'identify',
      grantType: 'authorization_code',
    });
    req.session.accessToken = tokenData.access_token;
    req.session.refreshToken = tokenData.refresh_token;
    res.redirect(req.session.redirect)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting token');
  }
});


router.get('/', async (req, res) => {
  try {
 services = db.all()
if (!db.all()[0]) {
  services = [{ name: "example", url: "https://example.com"}]
}

    if (req.session.accessToken) {
          if (oauth.getUser(req.session.accessToken).id !== config.discord.ownerId) {
    const user = await oauth.getUser(req.session.accessToken);
res.render(__dirname+'/pages/index.ejs', {
  title: "Home",
  user,
  req,
  res,
  services
})
    } else {
     res.redirect('/') 
    }
    }else{
     res.redirect('/dev/login?redirect=') 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting data');
  }
});
var appkey = config.settings.api_key || "hotdog"

router.get('/new', async (req, res) => {
  try {

    if (req.session.accessToken) {
          if (oauth.getUser(req.session.accessToken).id !== config.discord.ownerId) {
    const user = await oauth.getUser(req.session.accessToken);
res.render(__dirname+'/pages/new.ejs', {
  title: "Home",
  user,
  req,
  res,
  config,
  appkey
})
    } else {
     res.redirect('/') 
    }
    }else{
     res.redirect(`/dev/login?redirect=new`) 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting data');
  }
});

router.get('/auth/logout', async (req, res) => {
   req.session.destroy(function(err) {
      if (err) {
        console.log(err);
      } // cannot access session here
      else {
        console.log("Logged Out");
      }
    });
  res.redirect('/')
})


module.exports = router;
