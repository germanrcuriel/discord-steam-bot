const config = {
  bot: {
    id: '', // Your bot id
    token: '' // Your bot user token
  },
  discord: {
    channel: 'general' // Your discord channel
  },
  steam: {
    token: '', // Your steam token
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
    players: [
      'germanrcuriel' // An array of user names
    ]
  }
}

module.exports = config
