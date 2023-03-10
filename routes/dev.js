const express = require('express');
const session = require('express-session');
const config = require('../config');
const crypto = require('crypto');
const DiscordOauth2 = require('discord-oauth2');

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
  redirectUri: config.discord.domain + '/dev/callback',
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
  res.redirect(url);
});

router.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  if (state !== req.session.state) {
    res.status(403).send('Invalid state parameter');
    return;
  }
  try {
    const tokenData = await oauth.tokenRequest({
      code,
      scope: 'identify',
      grantType: 'authorization_code',
    });
    req.session.accessToken = tokenData.access_token;
    req.session.refreshToken = tokenData.refresh_token;
    res.redirect('/dev');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting token');
  }
});


router.get('/', async (req, res) => {
  try {
    var services = config.services
    if (req.session.accessToken) {
    const user = await oauth.getUser(req.session.accessToken);
res.render(__dirname+'/pages/index.ejs', {
  title: "Home",
  user,
  req,
  res,
  services,
})
    } else {
     res.redirect('/dev/login') 
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting data');
  }
});

module.exports = router;
