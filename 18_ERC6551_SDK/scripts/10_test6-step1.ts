import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { getAddress, parseUnits } from "viem";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import { BigNumber } from "ethers";
const addresses = require("./testcase-addresses.json");

// No need to run '09_test-initial-setup' for this example
// Case 7 - Wallet A is the owner of Token 0, but Wallet B creates TBA0 for Token 0, even 
//          then only wallet A should be able to access TBA0
// Example: Exectued by Wallet 1
async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner/Signer: ",owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.attach(addresses[network.name].demoNFT);
  console.log("DemoNFT address:", await demoNFT.address);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  

  console.log('Total Supply before = ', await demoNFT.totalSupply());
  const txt1 = await demoNFT.mint(owner.address);
  const receipt1 = await txt1.wait();
  const totalSupply = await demoNFT.totalSupply();
  console.log('Total Supply after = ',totalSupply );
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
