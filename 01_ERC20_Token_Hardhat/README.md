# Project 1 Create ERC20 Token

### Run and deploy locally
Run following commands:
```shell
npx hardhat compile
tsc
npx hardhat test
npx hardhat run ./dist/scripts/deploy.js
```

### Run and deploy locally on hardhat local node
Run following commands:
```shell
npx hardhat compile
tsc
npx hardhat test
npx hardhat node (Run this in separate terminal so you can see activity on node)
npx hardhat run ./dist/scripts/deploy.js --network hardhat 
```

### Run and deploy on test network
Run following commands:
```shell
npx hardhat compile
tsc
npx hardhat test
npx hardhat run ./dist/scripts/deploy.js  --network ropsten
npx hardhat run ./dist/scripts/deploy.js  --network rinkeby
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
