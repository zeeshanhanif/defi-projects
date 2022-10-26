import { ethers, run } from 'hardhat';
import { MainDeployer, MainDeployer__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MainDeployer:MainDeployer__factory = await ethers.getContractFactory("MainDeployer");
  const mainDeployer:MainDeployer = await MainDeployer.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

  const addressList = await mainDeployer.getUsersNFTContracts(owner.address);
  console.log("addressList = ",addressList);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
