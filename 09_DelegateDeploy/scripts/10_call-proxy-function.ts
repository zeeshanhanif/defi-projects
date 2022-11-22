import { TransactionRequest } from '@ethersproject/abstract-provider';
import { ethers, run } from 'hardhat';
import { NewMainCreatorProxy, NewMainCreatorProxy__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const NewMainCreatorProxy:NewMainCreatorProxy__factory = await ethers.getContractFactory("NewMainCreatorProxy");
  const newMainCreatorProxy:NewMainCreatorProxy = await NewMainCreatorProxy.attach("0xa0a6fBefd8142F08529ffB379b58AC387dE0a279");
  console.log("NewMainCreatorProxy deployed to:", newMainCreatorProxy.address);

  //const data = mainCreatorProxy.interface.encodeFunctionData("setData",[24]);
  //mainCreatorProxy.interface.encodeFunctionData("hello",[23]);

  //https://ethereum.stackexchange.com/questions/114783/solidity-0-8-delegatecall-does-not-mutate-contracts-storage
  const ABI = ["function setData(uint256,address) public"];
  const iface = new ethers.utils.Interface(ABI);


  const txt1:TransactionRequest = {
    from:owner.address,
    to: newMainCreatorProxy.address,
    data: iface.encodeFunctionData("setData",[74, owner.address])
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
