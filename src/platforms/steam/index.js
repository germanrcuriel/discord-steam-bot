const _ = require('lodash')
const async = require('async')
let request = require('request')

const config = require('../../../config')
request = request.defaults({ json: true })

class SteamPlatform {

  constructor (sendMessage = () => {}) {
    this.sendMessage = sendMessage
    this.config = config.steam
    this.players = []
    this.timeout = null
    this.setToken()
    this.start()
  }

  start () {
    console.info(`Registering Steam Platform with the following players:\r\n- ${this.config.players.join('\r\n- ')}`)
    this.getPlayers(this.getOnlinePlayers.bind(this))
  }

  setToken () {
    _.map(this.config.urls, (url, key) => {
      this.config.urls[key] = url.replace('{{TOKEN}}', this.config.token)
    })
  }

  getMessage (type, options) {
    let message = this.config.messages[type]

    _.each(options, (value, key) => {
      message = message.replace(`{{${key.toUpperCase()}}}`, value)
    })

    return message
  }

  getPlayers (done) {
    async.map(this.config.players, this.getUser.bind(this), (err, players) => {
      this.players = players
      done()
    })
  }

  getUser (player, callback) {
    request(`${this.config.urls.playerid}${player}`, (err, res, body) => {
      if (err) return callback(err)

      callback(null, {
        id: body.response.steamid,
        name: player,
        game: '',
        state: 0
      })
    })
  }

  getOnlinePlayers () {
    const playersIds = _.map(this.players, 'id')
    let messages = []
    let players = []

    request(`${this.config.urls.players}${playersIds.join(',')}`, (err, res, body) => {
      _.each(body.response.players, (player) => {
        player = {
          id: player.steamid,
          name: player.personaname,
          game: player.gameextrainfo || '',
          state: player.personastate
        }

        messages.push(this.processPlayer(player))
        players.push(player)
      })

      this.sendMessage(messages)
      this.players = players

      setTimeout(this.getOnlinePlayers.bind(this), this.config.timeout)
    })
  }

  processPlayer (player) {
    let storedPlayer = _.find(this.players, { id: player.id })

    if (storedPlayer.game !== player.game) {
      if (player.game !== '') {
        return this.getMessage('playing', player)
      } else {
        return this.getMessage('idle', player)
      }
    }

    if (storedPlayer.state !== player.state) {
      if (player.state === 0) {
        return this.getMessage('offline', player)
      }
      if (storedPlayer.state === 0) {
        return this.getMessage('online', player)
      }
    }

    return false
  }

  getStoredPlayers (player) {
    let messages = []

    _.map(this.players, (player) => {
      if (player.state === 0) return false

      if (player.game) {
        messages.push(this.getMessage('playing', player))
      } else {
        messages.push(this.getMessage('online', player))
      }
    })

    this.sendMessage(messages)
  }
}

module.exports = SteamPlatform
