import { ethers, run } from 'hardhat';
import { DelegatorContract, DelegatorContract__factory, MainDeployer, MainDeployer__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MainDeployer:MainDeployer__factory = await ethers.getContractFactory("MainDeployer");
  const mainDeployer:MainDeployer = await MainDeployer.deploy();
  await mainDeployer.deployed();
  console.log("MainDeployer deployed to:", mainDeployer.address);

  const DelegatorContract:DelegatorContract__factory = await ethers.getContractFactory("DelegatorContract");
  const delegatorContract:DelegatorContract = await DelegatorContract.deploy();
  await delegatorContract.deployed();
  console.log("DelegatorContractr deployed to:", delegatorContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
