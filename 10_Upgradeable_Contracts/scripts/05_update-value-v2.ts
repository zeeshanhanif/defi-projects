import { ethers, upgrades } from 'hardhat';
import { MyContractV1__factory, MyContractV1 } from '../typechain-types'
const addresses = require("./address.json");

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MyContractV2 = await ethers.getContractFactory("MyContractV2");
  const myContractV2 = await MyContractV2.attach(addresses.myContractAddress);
  console.log("MyContractV2 deployed to:", myContractV2.address);

  const txt1 = await myContractV2.setValue(21);
  console.log("setValue txt.hash = ",txt1.hash);
  const txtReceipt1 = await txt1.wait();

  const txt2 = await myContractV2.setName("TestName");
  console.log("setName txt2.hash = ",txt2.hash);
  const txtReceipt2 = await txt2.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
