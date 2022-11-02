import { ethers, upgrades } from 'hardhat';
import { MyContractV1__factory, MyContractV1 } from '../typechain-types'


async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();
  console.log("test");

  const MyContractV1 = await ethers.getContractFactory("MyContractV1");
  const myContractV1 = await upgrades.deployProxy(MyContractV1);
  await myContractV1.deployed();
  console.log("MyContractV1 deployed to:", myContractV1.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
