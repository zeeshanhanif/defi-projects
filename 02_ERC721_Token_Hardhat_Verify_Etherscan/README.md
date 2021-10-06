# Project 2C Create NFT and verify contract on Etherscan with Hardhat

For TypeScript Configuration use this [link](https://hardhat.org/guides/typescript.html)

[Interacting Programmatically with Contract](https://docs.openzeppelin.com/learn/deploying-and-interacting#interacting-programmatically)

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
