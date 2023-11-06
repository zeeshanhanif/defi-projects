import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { encodeFunctionData, getAddress, parseUnits } from "viem";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import { BigNumber } from "ethers";
const addresses = require("./testcase-addresses.json");


async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner/Signer: ",owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.attach(addresses[network.name].demoNFT);
  console.log("DemoNFT address:", await demoNFT.address);

  //const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  

  const txt1 = await demoNFT["safeTransferFrom(address,address,uint256)"](owner.address, addresses[network.name].tbaWallet1, 2);
  const receipt1 = await txt1.wait();
  
  console.log("receipt = ", receipt1);


const txt2 = await demoNFT["safeTransferFrom(address,address,uint256)"](owner.address, addresses[network.name].tbaWallet2, 1);
const receipt2 = await txt2.wait();

console.log("receipt = ", receipt2);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
