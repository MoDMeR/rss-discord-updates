var   RssFeedEmitter    = require('rss-feed-emitter'),
      feeder1           = new RssFeedEmitter(),
      feeder2           = new RssFeedEmitter();

exports.rssFeed1 = function (settings, mongoClient, Discord, discordClient, discordBot, db) {
  console.log("Listening for RSS Updates!");

  feeder1.add({
    url: 'http://lorem-rss.herokuapp.com/feed',
    refresh: 30
  });

  feeder1.on('new-item', function(item) {
    console.log(item.title);
    var rssTitle    = item.title,
        rssDate     = item.pubDate,
        rssLink     = item.link,
        rssImage    = "https://i.imgur.com/0IgdqAU.jpg",
        rssDB       = db.get('rss');

      rssDB.find({},{}, function (err, date){
        var dbDate      = new Date(date[0].lastPost);
        var postDate    = new Date(rssDate);
        if (dbDate < postDate) {
          rssDB.update({lastPost:`${date[0].lastPost}`},{lastPost: `${postDate}`});
          discordBot.rss(settings, discordClient, Discord, rssTitle, rssDate, rssLink, rssImage);
        }
      });
  });
};

//SECOND FEED READY FOR YOU TO CONFIGURE
// exports.rssFeed2 = function (settings, mongoClient, Discord, discordClient, discordBot, db) {
//   console.log("Listening for RSS Updates!");
//
//   feeder2.add({
//     url: 'http://lorem-rss.herokuapp.com/feed',
//     refresh: 30
//   });
//
//   feeder2.on('new-item', function(item) {
//     console.log(item.title);
//     var rssTitle    = item.title,
//         rssDate     = item.pubDate,
//         rssLink     = item.link,
//         rssImage    = "https://i.imgur.com/0IgdqAU.jpg",
//         rssDB       = db.get('rss');
//
//       rssDB.find({},{}, function (err, date){
//         var dbDate      = new Date(date[0].lastPost);
//         var postDate    = new Date(rssDate);
//         if (dbDate < postDate) {
//           rssDB.update({lastPost:`${date[0].lastPost}`},{lastPost: `${postDate}`});
//           discordBot.rss(settings, discordClient, Discord, rssTitle, rssDate, rssLink, rssImage);
//         }
//       });
//   });
// };
