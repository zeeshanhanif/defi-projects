# Project 2D Create NFT Project and Deploy on OpenSea

Compile and Deploy
```shell
npx hardhat compile
tsc
npx hardhat run dist/scripts/deploy.js
```

## Upload Images or any Art on IPFS
We will use [Pinata](https://www.pinata.cloud/) to upload images on IPFS

1) Create Account on Pinata
2) Upload Images on Pinata
3) Update `data.ts` file for your data and image files
4) Run create-metadata.ts, assuming you have only two properites, otherwise change in this file
5) Upload json files generated in previous step
6) Add deployed NFT address in `generate-nfts.ts` file
7) Add address for initial owner for NFTs in `generate-nfts.ts` file
8) Run generate-nfts.ts to initialize nfts with metadata generated
9) Go to [opensea.io](https://testnets.opensea.io/get-listed/step-two) Testnet
10) Provide your contract address
11) Result will be something like [this](https://testnets.opensea.io/collection/shapenft)



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
