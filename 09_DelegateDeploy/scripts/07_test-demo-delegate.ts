import { TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers, run } from 'hardhat';
import { DemoDelegate, DemoDelegateSub, DemoDelegateSub__factory, DemoDelegate__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const DemoDelegateSub:DemoDelegateSub__factory = await ethers.getContractFactory("DemoDelegateSub");
  const demoDelegateSub:DemoDelegateSub = await DemoDelegateSub.deploy();
  console.log("DemoDelegateSub deployed to:", demoDelegateSub.address);

  const DemoDelegate:DemoDelegate__factory = await ethers.getContractFactory("DemoDelegate");
  const demoDelegate:DemoDelegate = await DemoDelegate.deploy(demoDelegateSub.address);
  console.log("DemoDelegate deployed to:", demoDelegate.address);

  /*
  const tx1 = await owner.sendTransaction({
    to: demoDelegate.address,
    value: ethers.utils.parseEther("1")
  })
  */
  /*
  const data = demoDelegate.interface.encodeFunctionData()
  const tx1 = await owner.sendTransaction({
    to: demoDelegate.address,
    data: 
  })
*/
  const tx1 = await demoDelegate.doWork(34);
  console.log("txt1 = ",tx1);
  const receipt = await tx1.wait();
  console.log("txt1 receipt = ",receipt);


  /*
  const tx1 = await demoDelegate.doWork(45);
  console.log("txt1 = ",tx1);
  const receipt = await tx1.wait();
  console.log("txt1 receipt = ",receipt);
  */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
