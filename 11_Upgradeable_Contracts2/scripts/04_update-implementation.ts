import { ethers, upgrades } from 'hardhat';
import { MyContractV1__factory, MyContractV1, MyContractV2__factory } from '../typechain-types'
const addresses = require("./address.json");

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MyContractV2 = await ethers.getContractFactory("MyContractV2");
  const myContractV2 = await upgrades.upgradeProxy(addresses.myContractAddress,MyContractV2);
  console.log("MyContractV1 deployed to:", myContractV2.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
