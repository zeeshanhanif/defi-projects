import { ethers, run } from 'hardhat';
import { DelegatorContract, DelegatorContract__factory, MainCreator, MainCreatorProxy, MainCreatorProxy__factory, MainCreator__factory, MainDeployer, MainDeployer__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MainCreator:MainCreator__factory = await ethers.getContractFactory("MainCreator");
  const mainCreator:MainCreator = await MainCreator.deploy();
  await mainCreator.deployed();
  console.log("MainCreator deployed to:", mainCreator.address);
  
  const txt1 = await mainCreator.initialize();
  console.log("txt1 = ",txt1);
  const receipt = await txt1.wait();
  console.log("txt1 receipt = ",receipt);


  const MainCreatorProxy:MainCreatorProxy__factory = await ethers.getContractFactory("MainCreatorProxy");
  const mainCreatorProxy:MainCreatorProxy = await MainCreatorProxy.deploy(mainCreator.address, "0x");
  await mainCreatorProxy.deployed();
  console.log("MainCreatorProxy deployed to:", mainCreatorProxy.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
