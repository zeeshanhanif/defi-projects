import { TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers, run } from 'hardhat';
import { DelegatorContract, DelegatorContract__factory, MainCreator, MainCreatorProxy, MainCreatorProxy__factory, MainCreator__factory, MainDeployer, MainDeployer__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MainCreatorProxy:MainCreatorProxy__factory = await ethers.getContractFactory("MainCreatorProxy");
  const mainCreatorProxy:MainCreatorProxy = await MainCreatorProxy.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
  console.log("MainCreatorProxy deployed to:", mainCreatorProxy.address);

  //const data = mainCreatorProxy.interface.encodeFunctionData("setData",[24]);
  //mainCreatorProxy.interface.encodeFunctionData("hello",[23]);

  //https://ethereum.stackexchange.com/questions/114783/solidity-0-8-delegatecall-does-not-mutate-contracts-storage
  const ABI = ["function setData(uint256) public"];
  const iface = new ethers.utils.Interface(ABI);


  const txt1:TransactionRequest = {
    from:owner.address,
    to: mainCreatorProxy.address,
    data: iface.encodeFunctionData("setData",[33])
  }
  const tx1 = await owner.sendTransaction(txt1);
  console.log("txt1 = ",tx1);
  const receipt = await tx1.wait();
  console.log("txt1 receipt = ",receipt);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
