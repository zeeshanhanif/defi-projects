import { ethers, upgrades } from 'hardhat';
import { MyContractV1__factory, MyContractV1 } from '../typechain-types'
const addresses = require("./address.json");

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MyContractV2 = await ethers.getContractFactory("MyContractV2");
  const myContractV2 = await MyContractV2.attach(addresses.myContractAddress);
  console.log("MyContractV2 deployed to:", myContractV2.address);

  const value = await myContractV2.getValue();
  console.log("Value = ",value.toString());

  const name = await myContractV2.getName();
  console.log("Name = ",name);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
