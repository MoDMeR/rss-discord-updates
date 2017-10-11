
exports.run = function (settings, mongoClient, Discord, discordClient, db) {

  //Is the bot in Discord?
  discordClient.on('ready', () => {
    console.log("Logged Into Discord!");
  });

  //The command to log in
  discordClient.login(settings.discordToken);
};

exports.rss = function (settings, discordClient, Discord, rssTitle, rssDate, rssLink, rssImage) {

  var gChannel = discordClient.guilds.get(settings.guildID).channels.get(settings.guildPrimaryChannel);

  var rssEmbed = new Discord.RichEmbed()
    .setTitle(`***${rssTitle}***`)
    .setThumbnail(`${rssImage}`)
    .setColor(3447003)
    .addField("Update URL:", `${rssLink}`)
    .addField("Published:", `${rssDate}`);


  gChannel.send({embed: rssEmbed});

};
