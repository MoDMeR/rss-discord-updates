
const settings   = require("./settings-rss.json"),
  rssBot         = require("./rssBot.js"),
  mongoClient    = require('mongodb').MongoClient,
  Discord        = require("discord.js"),
  discordClient  = new Discord.Client({fetchAllMembers: true}),
  discordBot     = require("./discordBot.js"),
  //Database communication
  monk           = require('monk'),
  db             = monk(settings.mongoDbUrl);

//Logs into Discord & Redirects Messages to Discord Channel
discordBot.run(settings, mongoClient, Discord, discordClient, db);

//Listens for RSS Feeds
rssBot.rssFeed1(settings, mongoClient, Discord, discordClient, discordBot, db);
// rssBot.rssFeed2(settings, mongoClient, Discord, discordClient, discordBot, db);

//Tests the database client connection
mongoClient.connect(settings.mongoDbUrl, function(err, mongoDB) {
  console.log("Connection to MongoDB verified!");
  mongoDB.close();
});
