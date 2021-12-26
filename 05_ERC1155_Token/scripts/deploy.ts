import { ethers, run } from 'hardhat';
import { MultiTokenNFT, MultiTokenNFT__factory } from '../typechain';

async function main() {

  const MultiTokenNFT:MultiTokenNFT__factory = await ethers.getContractFactory("MultiTokenNFT");
  const multiTokenNFT:MultiTokenNFT = await MultiTokenNFT.deploy("https://game.example/api/item/{id}.json");
  await multiTokenNFT.deployed();

  console.log("MultiTokenNFT deployed to:", multiTokenNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
