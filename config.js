// Docs

module.exports = {
  settings: {
    devpanel: true,
    port: "4334",
    api_only: false //false
  },
  services: [
    { name: "Nova-api", url: "https://Nova-api.nova-team.repl.co"},
    { name: "cbos1", url: "https://cbos.nova-team.repl.co"}, 
    { name: "cbos2", url: "https://cbos-2.nova-team.repl.co"}
  ],

    
  /*
   Currently admin panel in development so discord oauth is not required 
  */

  discord: { 
    domain: process.env.domain,
    clientId: process.env.ci,
    clientSecret: process.env.cs
  },

  cookie: {
    sessionSecret: "Shawty"
  }
};
