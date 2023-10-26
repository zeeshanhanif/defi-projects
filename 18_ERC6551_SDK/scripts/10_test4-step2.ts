import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { encodeFunctionData, getAddress, parseUnits } from "viem";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import { BigNumber } from "ethers";
const addresses = require("./testcase-addresses.json");

// This script is used after '09_test-initial-setup', so should be run after '09_test-initial-setup'
// With this test case we want to verify token can be transfered from 1 TAB to another TBA
// Example: Exectued by Wallet 1
// Testcase 5, Step 2
async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner/Signer: ",owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.attach(addresses[network.name].demoNFT);
  console.log("DemoNFT address:", await demoNFT.address);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  

  console.log(`TBA: ${addresses[network.name].tbaWallet1}`);

  // We need to replace token id that is minted in last step in script '10_test4-step1'
  const tokenIdGeneratedInLastStep = "14"; 
  // Transfer minted token to wallet that holds TBA
  const transferNFT = await tokenboundClient.transferNFT({
    account: addresses[network.name].tbaWallet1,
    tokenType: "ERC721",
    tokenContract: addresses[network.name].demoNFT,
    tokenId: tokenIdGeneratedInLastStep.toString(),
    recipientAddress: getAddress(addresses[network.name].tbaWallet2),
  })

  console.log("transferNFT = ",transferNFT);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
