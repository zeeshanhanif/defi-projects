import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { encodeFunctionData, getAddress, parseUnits } from "viem";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import { BigNumber } from "ethers";
const addresses = require("./testcase-addresses.json");

// This script is used after '09_test-initial-setup', so should be run after 'test1-step1'
// >>>>>>>This script will use different signer than '09_test-initial-setup', so that
// >>>>.. we can verify that a wallet can not use TAB of another wallet
// Example: Executed by Wallet 1
// Testcase 2
async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner/Signer: ",owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.attach(addresses[network.name].demoNFT);
  console.log("DemoNFT address:", await demoNFT.address);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  

  console.log(`TBA: ${addresses[network.name].tbaWallet1}`);

  const tokenIdToTransfer = 5; // This token id will be avaiable once you run '09_test-initial-setup'
  const txt1 = await demoNFT.transferFrom(owner.address, addresses[network.name].wallet2Address,tokenIdToTransfer);
  const receipt1 = await txt1.wait();

  console.log("Transfer Done");
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
