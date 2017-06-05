const _ = require('lodash')
const Discord = require('discord.js')
const config = require('../config.js')

const SteamPlatform = require('./platforms/steam')

const client = new Discord.Client()

class Bot {

  run () {
    client.on('ready', this.onReady.bind(this))
    client.on('message', this.onMessage.bind(this))
    client.login(config.bot.token)
  }

  onReady () {
    this.steam = new SteamPlatform(this.sendMessage.bind(this))
  }

  onMessage (message) {
    if (this.shouldReply(message, (type) => {
      this.processReply(type, message)
    })
  }

  shouldReply (message) {
    if (message.author.bot) return false

    const isDm = message.channel.type === 'dm'
    const isMention = message.mentions.users.findAll('id', config.bot.id).length

    if (isDm) return callback('dm')
    if (isMention) return callback('mention')
  }

  processReply (type, message) {
    const bot = (type === 'dm') ? '' : `<@!${config.bot.id}> `

    switch (message.content) {
      case `${bot}!`:
        return this.replyWithStatus(message)
      case `${bot}love`:
        return this.replyWithLove(message)
      default:
        return this.replyWithDefault(message)
    }
  }

  replyWithStatus (message) {
    this.steam.getStoredPlayers()
  }

  replyWithLove (message) {
    message.channel.send(':heart:')
  }

  replyWithDefault (message) {
    message.channel.send('...')
  }

  sendMessage (message) {
    if (_.isArray(message)) message = _.compact(message)

    const channel = client.guilds.first().channels.find('name', config.discord.channel)

    if (message.length) {
      channel.send(message)
    }
  }
}

module.exports = Bot
