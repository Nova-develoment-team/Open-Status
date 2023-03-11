// Docs

module.exports = {
  settings: {
    devpanel: true,
    port: "4334",
    api_only: false, //false
    mongo_uri: process.env.mongo,
        domain: process.env.domain,
    api_key: "" // Default is hotdog
  },
  /*
  // Deprecated
  services: [
    { name: "Nova-api", url: "https://Nova-api.nova-team.repl.co"},
    { name: "cbos1", url: "https://cbos.nova-team.repl.co"}, 
    { name: "cbos2", url: "https://cbos-2.nova-team.repl.co"}
  ],*/

    
  /*
   Currently admin panel in development so discord oauth is not required 
  */

  discord: { 
    clientId: process.env.ci,
    clientSecret: process.env.cs,
    ownerId: [845312519001342052, 120341634327117824], 
  },

  cookie: {
    sessionSecret: "Shawty"
  }
};
