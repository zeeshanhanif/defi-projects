import { ethers, upgrades } from 'hardhat';
import { MyContractV1__factory, MyContractV1 } from '../typechain-types'
const addresses = require("./address.json");

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MyContractV1 = await ethers.getContractFactory("MyContractV1");
  const myContractV1 = await MyContractV1.attach(addresses.myContractAddress);
  console.log("MyContractV1 deployed to:", myContractV1.address);

  const value = await myContractV1.getValue();
  console.log("Value = ",value.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
