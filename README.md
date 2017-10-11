# rssDiscordUpdates
Monitor RSS feeds and post to Discord channels.

***ABOUT***: This file was previously a part of another, larger project I was working on. However for a myriad of reasons I broke it out on it's on. Really it's just taking [filipedeschamps/rss-feed-emitter](https://github.com/filipedeschamps/rss-feed-emitter) and adding a component to post to a ***Discord*** channel.

***STEP ONE***: Create a Discord Bot
* Log into [Discord](http://www.discordapp.com).
* Click [here](https://discordapp.com/developers/applications/me) to go to the *My Applications* page. Create a ***New App***.
* Add in the bot name, description, etc and create it.
* Once the application has been created ***add a bot user*** to the application.
* **Openning a new tab**, invite the bot to your server by going here **BUT REPLACING*** ```<CLIENT ID>``` with your client ID from the previous page.

```https://discordapp.com/oauth2/authorize?&client_id=<CLIENT ID>&scope=bot&permissions=0```
* Select the server you want this bot to be a part of (**requires 'manage server' permissions**).
* Leave this page open as we'll need it again in a second.

***NOW YOUR BOT IS CREATED AND ABLE TO ACCESS YOUR SERVER, WE ACTUALLY NEED TO GIVE IT SOME CODE TO DO SOMETHING***

***STEP TWO***: Create your **MongoDB** Database
*Why a database? -- This will help ensure duplicate posts don't happen if your bot gets restarted, essentially it's a simple way to track what has and has not been posted to your Discord channel.*
* You can use any number of services or host your own. I use [mLab](https://mLab.com). It's free and easy to access.
* Once the database has been created, add a collection named **rss**.
* Once the collection has been created, **select** the collection and click **add document.**
* On the **Edit Document* screen click and paste the following**:
```{"lastPost": "Wed Oct 11 2017 15:26:00 GMT-0400 (Eastern Daylight Time)"}```

**STEP THREE**: Install and configure *rssDiscordUpdates*.
* If you don't know how to use ***npm*** or are familiar at all with Node, you really should start there.
* Open a command window and go to your chosen directory.
* In your command window type:
```npm install rssDiscordUpdates```

**STEP FOUR**: Enable Developer Mode in Discord
* This is entirely to easily get channel IDs, etc.
* In your ```Discord Settings``` click ```Appearance```
* Find and enable ```Developer Mode```.

**STEP FIVE**: Put the pieces togeter
* Using your favorite editor open the ```settings.json``` file.
* Return to the **Discord** window from **Step One** and, opening your Bot's settings, select ```click to reveal``` in order to get the Bot's token. Copy this token and paste it into the ```settings.json``` as the ```discordToken```.
* Return to your **Database Settings** from step two and on the **[My Databases]**(https://mlab.com/databases/mydb) screen will appear something like: ```mongodb://<dbuser>:<dbpassword>@ds117615.mlab.com:17615/mydb```
* Copy this line, replacing with the pertinent ```dbuser``` and ```dbpassword``` information. Place this information in ```settings.json``` as the ```mongoDbUrl```.
* In **Discord** right-click on the server you earlier invited your bot to. Select ```Copy ID```. Paste this information in ```settings.json``` as your ```guildID```.
* In **Discord** right-click on the specific channel where you want notifications published and select ```Copy ID```. Paste this ID in ```settings.json``` as your ```guildPrimaryChannel```.

**STEP SIX**:
* Start your bot using PM2, Nodemon or just locally using ```node app.js```
