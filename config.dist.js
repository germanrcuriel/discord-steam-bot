const config = {
  bot: {
    id: '',
    token: ''
  },
  discord: {
    channel: ''
  },
  steam: {
    token: '',
    timeout: 30000,
    messages: {
      idle: '{{NAME}} is at the menus',
      offline: '{{NAME}} went offline',
      online: '{{NAME}} is online',
      playing: '{{NAME}} is playing {{GAME}}'
    },
    urls: {
      base: 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={{TOKEN}}&steamids=',
      userid: 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key={{TOKEN}}&vanityurl='
    },
    players: []
  }
}

module.exports = config
