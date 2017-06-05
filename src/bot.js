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
    if (this.shouldReply(message)) {
      this.processReply(message)
    }
  }

  shouldReply (message) {
    if (message.author.bot) return false

    const isDm = message.channel.type === 'dm'
    const isMention = message.mentions.users.findAll('id', config.bot.id).length

    return isDm || isMention
  }

  processReply (message) {
    switch (message.content) {
      case `<@!${config.bot.id}> !`:
        return this.replyWithStatus(message)
      case `<@!${config.bot.id}> love`:
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
