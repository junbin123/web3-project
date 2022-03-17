require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.4',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/9lP3-nGwTXJjX4xtCAEUriKttyNKKKqQ',
      accounts: ['e13b3b74bfbab4b3651b18d2084a2285a36a29f1b399b73f2e1a1118f452bae6'],
    },
  },
}
