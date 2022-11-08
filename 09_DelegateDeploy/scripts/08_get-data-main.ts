import { TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers, run } from 'hardhat';
import { DemoDelegate, DemoDelegate__factory, MainCreator, MainCreator__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MainCreator:MainCreator__factory = await ethers.getContractFactory("MainCreator");
  const mainCreator:MainCreator = await MainCreator.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");
  console.log("MainCreator deployed to:", mainCreator.address);

  const tx1 = await mainCreator.getData();
  console.log("txt1 = ",tx1);
  console.log("txt1 = ",tx1.toString());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
