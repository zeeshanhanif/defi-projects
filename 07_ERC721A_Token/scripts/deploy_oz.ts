import { ethers, run } from 'hardhat';
import { ONFT__factory } from '../typechain/factories/ONFT__factory';
import { ONFT } from '../typechain/ONFT';

async function main() {

  const ONFT:ONFT__factory = await ethers.getContractFactory("ONFT");
  
  const onft:ONFT = await ONFT.deploy();
  await onft.deployed();

  console.log("ONFT deployed to:", onft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
