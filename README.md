## Discord Steam Bot

![](http://i.imgur.com/ajuhmG1.png)

Get your friends information in real time.

### Installation

#### Local

```
$ git clone git@github.com:germanrcuriel/discord-steam-bot.git
$ cd discord-steam-bot
$ npm install
```

#### Global

```
$ npm install -g discord-steam-bot
```

or, if you use [yarn](https://yarnpkg.com)

```
$ yarn global add discord-steam-bot
```

### Configuration

Copy `config.dist.js` file to `config.js` and set up your discord and steam information.

- `bot.id` is [Discord's application Client ID](https://discordapp.com/developers/applications/me).
- `bot.token` is [Discord's App Bot User Token](https://discordapp.com/developers/applications/me).
- `discord.channel` is the channel you want to get the "real-time" information.
- `steam.token` is [Steam's API key](https://steamcommunity.com/dev/apikey)
- `steam.players` is an array of Steam nicknames.

### Running

I recommend using [PM2](http://pm2.keymetrics.io/) to reload the bot in case it fails.

```
$ npm install -g pm2
```

or

```
$ yarn global add pm2
```

and run the bot

```
pm2 start discord-steam-bot
```

or, if installed locally

```
pm2 start ./bin/discord-steam-bot.js
```
