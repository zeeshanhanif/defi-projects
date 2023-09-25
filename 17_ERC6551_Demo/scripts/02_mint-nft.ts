import { ethers, network } from "hardhat";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
const addresses = require("./address.json");

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.attach(addresses[network.name].demoNFT);

  console.log("DemoNFT address:", await demoNFT.address);

  const txt1 = await demoNFT.mint(owner.address);
  const receipt1 = await txt1.wait();
  
  console.log('Mint 1 done = ', receipt1);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
