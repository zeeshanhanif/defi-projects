import { ethers, run } from 'hardhat';
import { MainDeployer, MainDeployer__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MainDeployer:MainDeployer__factory = await ethers.getContractFactory("MainDeployer");
  const mainDeployer:MainDeployer = await MainDeployer.attach("0x2C443dbCF5E53092e12404D1DF746fB5E86aB63C");

  //const txt1 = await mainDeployer.deployContract("NFTName1","NFT1");
  //const txt1 = await mainDeployer.doCallDeploy("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
  //const txt1 = await mainDeployer.demoCallTest("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

  const txt1 = await mainDeployer.testDeploy();
  console.log("txt.hash = ",txt1.hash);
  const txtReceipt = await txt1.wait();
  //console.log("txt.hash = ",txtReceipt); 
  //ethers.provider.

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
