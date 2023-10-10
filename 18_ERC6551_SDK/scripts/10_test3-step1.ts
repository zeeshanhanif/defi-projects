import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { encodeFunctionData, getAddress, parseUnits } from "viem";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import { BigNumber } from "ethers";
const addresses = require("./testcase-addresses.json");

// This script is used after '09_test-initial-setup', so should be run after '09_test-initial-setup'
// With this test case we want to verify that token minted by TBA can be transfered to the owner
// wallet of TBA
// Example: Exectued by Wallet 1
// Testcase 3 and 4 together, Step 1
async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner/Signer: ",owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.attach(addresses[network.name].demoNFT);
  console.log("DemoNFT address:", await demoNFT.address);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  

  console.log(`TBA: ${addresses[network.name].tbaWallet1}`);

  // Mint token on TBA 1
  const totalSupply = await demoNFT.totalSupply();
  console.log('Total Supply before = ',totalSupply );
  
  const encodedMintFunctionData = encodeFunctionData({
    abi: DemoNFT__factory.abi,
    functionName:"mint",
    args:[addresses[network.name].tbaWallet1]
  });
  const executedCall = await tokenboundClient.executeCall({
    account: addresses[network.name].tbaWallet1,
    to: addresses[network.name].demoNFT,
    value: 0n,
    data: encodedMintFunctionData,
  })

  console.log("executedCall = ",executedCall);
  
  // Mint ends
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
