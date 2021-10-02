# Project 2C Create NFT and verify contract on Etherscan

1) Create file named .env
2) Add account secret and infura key in it, then in truffle-config.js use process.env.{entrykey}

# Deployed Conract Address -- (Rinkeby)
1) Demo NFT - 0x3F71b3Bf5419C151A131D36c523333bE5AbdD10e

# Contract Verifcation on Etherscan
1) Install verify plugin 
```sh
npm install truffle-plugin-verify
```
2) Get API key from Etherscan
[Etherscan API Key](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics)
3) Add Etherscan API key in truffle-config.js
```js
module.exports = {
  /* ... rest of truffle-config */

  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
}
```
4) Add plugin in truffle-config.js
```js
module.exports = {
  /* ... rest of truffle-config */

  plugins: [
    'truffle-plugin-verify'
  ]
}

```
5) Run verify command
```sh
truffle run verify DemoNFT --network rinkeby --license MIT
``` 
6) After running above command you will receive below link and your contract will show as verified contract on etherscan
https://rinkeby.etherscan.io/address/0x3F71b3Bf5419C151A131D36c523333bE5AbdD10e#code



