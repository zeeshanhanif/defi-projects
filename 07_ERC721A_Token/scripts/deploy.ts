import { ethers, run } from 'hardhat';
import { ANFT, ANFT__factory } from '../typechain';

async function main() {

  //https://game.example/api/item/{id}.json
  const ANFT:ANFT__factory = await ethers.getContractFactory("ANFT");
  
  const anft:ANFT = await ANFT.deploy();
  await anft.deployed();

  console.log("ANFT deployed to:", anft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
