import { ethers, run } from 'hardhat';
import {  NewMainCreator, NewMainCreatorProxy, NewMainCreatorProxy__factory, NewMainCreator__factory, NewNFT, NewNFT__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();
  
  const NewNFT:NewNFT__factory = await ethers.getContractFactory("NewNFT");
  const newNFT:NewNFT = await NewNFT.deploy();
  await newNFT.deployed();
  console.log("NewNFT deployed to:", newNFT.address);

  const txt2 = await newNFT.initialize(
    "AAAA",
    "BBBB",
    owner.address,
    owner.address,
    20,
    20);
  console.log("txt2 = ",txt2);
  const receipt2 = await txt2.wait();
  console.log("txt2 receipt = ",receipt2);
  

  const NewMainCreator:NewMainCreator__factory = await ethers.getContractFactory("NewMainCreator");
  const newMainCreator:NewMainCreator = await NewMainCreator.deploy(newNFT.address);
  await newMainCreator.deployed();
  console.log("NewMainCreator deployed to:", newMainCreator.address);
  
  const txt1 = await newMainCreator.initialize();
  console.log("txt1 = ",txt1);
  const receipt = await txt1.wait();
  console.log("txt1 receipt = ",receipt);


  const NewMainCreatorProxy:NewMainCreatorProxy__factory = await ethers.getContractFactory("NewMainCreatorProxy");
  const newMainCreatorProxy:NewMainCreatorProxy = await NewMainCreatorProxy.deploy(newMainCreator.address, "0x");
  await newMainCreatorProxy.deployed();
  console.log("NewMainCreatorProxy deployed to:", newMainCreatorProxy.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
