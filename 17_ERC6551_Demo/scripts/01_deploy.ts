import { ethers, network } from "hardhat";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  //const demoNFT:DemoNFT = await ethers.getContractAt("DemoNFT","0xA28D950e1017f71b181caFc3e93ED54664f7eF41");
  const demoNFT:DemoNFT = await DemoNFT.deploy("DemoNFT", "DFT1");
  await demoNFT.deployed();

  console.log("DemoNFT deployed to:", await demoNFT.address);

  //console.log("data totalSupply = ", await demoNFT.totalSupply());
  //console.log("data defaultURI = ", await demoNFT.defaultURI());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
