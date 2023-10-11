import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { encodeFunctionData, getAddress, parseUnits } from "viem";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import { BigNumber } from "ethers";
const addresses = require("./testcase-addresses.json");

// This script is used after '09_test-initial-setup' and '10_test3-step1'
// With this test case we want to verify that token minted by TBA can be transfered to the owner
// wallet of TBA
// Example: Exectued by Wallet 1
// Testcase 3 and 4 together, Step 2
async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner/Signer: ",owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.attach(addresses[network.name].demoNFT);
  console.log("DemoNFT address:", await demoNFT.address);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  

  console.log(`TBA: ${addresses[network.name].tbaWallet1}`);

  // We need to replace token id that is minted in last step in script '10_test3-step1'
  const tokenIdGeneratedInLastStep = "11"; 
  // Transfer minted token to wallet that holds TBA
  const transferNFT = await tokenboundClient.transferNFT({
    account: addresses[network.name].tbaWallet1,
    tokenType: "ERC721",
    tokenContract: addresses[network.name].demoNFT,
    tokenId: tokenIdGeneratedInLastStep.toString(),
    //recipientAddress: getAddress(owner.address), // Testcase 3 -- use this when testing to transfer owner wallet of TBA
    recipientAddress: getAddress(addresses[network.name].wallet2Address),  // Testcase 4 -- use this when testing to transfer to wallet that is not the owner of TBA
  })

  console.log("transferNFT = ",transferNFT);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
