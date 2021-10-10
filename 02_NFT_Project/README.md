# Project 2D Create NFT Project and Deploy on OpenSea



We will follow below steps:

1) Compile and Deploy NFT Contract
2) Create Account on Pinata
3) Upload your NFT images or Art work on Pinata
4) Update `data.ts` file for your data and image files
5) Run create-metadata.ts, assuming you have only two properites, otherwise change in this file
6) Upload json files generated in previous step
7) Add deployed NFT address in `generate-nfts.ts` file
8) Add address for initial owner for NFTs in `generate-nfts.ts` file
9) Run generate-nfts.ts to initialize nfts with metadata generated
10) Go to [opensea.io](https://testnets.opensea.io/get-listed/step-two) Testnet
11) Provide your contract address
12) Result will be something like [this](https://testnets.opensea.io/collection/shapenft)


### 1) Compile and Deploy
```shell
npx hardhat compile
tsc
npx hardhat run dist/scripts/deploy.js
```

### 2) Create Account on Pinata
We will use [Pinata](https://www.pinata.cloud/) to upload images on IPFS

### 3) Upload your NFT images or Art work on Pinata
![Pinata Home Screen](./images/01_pinata.jpg)
![Click Upload Button](./images/02_pinata.jpg)
![Upload Popup](./images/03_pinata.jpg)
![Name and CID after uploading folder](./images/04_pinata.jpg)
![List of Files inside folder on Pinata](./images/05_pinata.jpg)
![Individual file on Pinata](./images/06_pinata.jpg)



### 4) 
### 5) 
### 6) 
### 7) 
### 8) 
### 9) 
### 10) 
### 11) 
### 12) 

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
