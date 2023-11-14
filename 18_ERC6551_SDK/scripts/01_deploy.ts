import { ethers, network } from "hardhat";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  console.log("add = ", owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.deploy("DemoNFT", "DNFT22");
  await demoNFT.deployed();

  console.log("DemoNFT deployed to:", demoNFT.address);

  /*
  Triangle contract address
0xE1620d9323fCc7158A93338825a98E75fb7A79d6

Pentagon contract address
0x6200C0b69459706fA2d122Ac6b9fe3686242076c

Hexagon contract address
0x053ed3a2003dDbb56afc974BeA405b11e78980f9

Diamond contract address
0x57b2d50D67EEbfBdb5017f5F4050F5275f7FcbFA
  */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
