import { ethers, run } from 'hardhat';
import { DemoNFT, DemoNFT__factory, MainDeployer, MainDeployer__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  /*
  const MainDeployer:MainDeployer__factory = await ethers.getContractFactory("MainDeployer");
  const mainDeployer:MainDeployer = await MainDeployer.attach("0x2C443dbCF5E53092e12404D1DF746fB5E86aB63C");
  console.log("MainDeployer deployed to:", mainDeployer.address);

  const addressList = await mainDeployer.getUsersNFTContracts(owner.address);
  console.log("addressList = ",addressList);
  */
  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  //const demoNFT:DemoNFT = await DemoNFT.attach(addressList[0]);
  const demoNFT:DemoNFT = await DemoNFT.attach("0xdcb778f9880d694a42d41d5cc1a99def9d8e6fdf");
  
  console.log("DemoNFT deployed to:", demoNFT.address);

  const nftOwner = await demoNFT.owner();
  console.log("nftOwner :", nftOwner);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
