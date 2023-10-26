import { ethers, network } from "hardhat";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  console.log("add = ", owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.deploy("D Diamond", "DDIA");
  await demoNFT.deployed();

  console.log("DemoNFT deployed to:", demoNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
