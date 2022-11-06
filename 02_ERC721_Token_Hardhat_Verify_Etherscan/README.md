# Project 2C Create NFT and verify contract on Etherscan with Hardhat

For TypeScript Configuration use this [link](https://hardhat.org/guides/typescript.html)

[Verify Etherscan with Hardhat](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)

Get API key from Etherscan
[Etherscan API Key](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics)

Below command will compile the contract and generates Typescript typings for contracts
```shell
npx hardhat compile
```

Below command will run TypeScript compiler and convert all TypeScript files to JS and placed them in dist folder
```shell
tsc
```

Below command will deploy contracts on hardhat network
```shell
npx hardhat run dist/scripts/deploy.js --network rinkeby
```

Below command will generate few initial NFTs
```shell
npx hardhat run dist/scripts/generate-nfts.js --network rinkeby
```

Below command will Verify Contract
```shell
npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS
```

## Deployed Conracst Address -- (Rinkeby)
VNFT - 0xCB55d1e54b10c42Fc1548AfE7DBca8c895DDa85C

After running above command you will receive below link and your contract will show as verified contract on etherscan
https://rinkeby.etherscan.io/address/0xCB55d1e54b10c42Fc1548AfE7DBca8c895DDa85C#code


Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
