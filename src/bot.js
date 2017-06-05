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
    this.shouldReply(message, (type) => {
      this.processReply(type, message)
    })
  }

  shouldReply (message, callback) {
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
        return this.replyWithStatus(message, type)
      case `${bot}love`:
        return this.replyWithLove(message)
      default:
        return this.replyWithDefault(message)
    }
  }

  replyWithStatus (message, type) {
    const channel = (type === 'dm') ? message.channel : null
    this.steam.getStoredPlayers(channel)
  }

  replyWithLove (message) {
    message.channel.send(':heart:')
  }

  replyWithDefault (message) {
    message.channel.send('...')
  }

  sendMessage (message, channel) {
    if (_.isArray(message)) message = _.compact(message)

    const defaultChannel = client.guilds.first().channels.find('name', config.discord.channel)
    channel = (channel) ? channel : defaultChannel

    if (message.length) {
      channel.send(message)
    }
  }
}

module.exports = Bot
