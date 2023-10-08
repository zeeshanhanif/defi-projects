import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { encodeFunctionData, getAddress, parseUnits } from "viem";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import { BigNumber } from "ethers";
const addresses = require("./testcase-addresses.json");

// This script is used after '09_test-initial-setup' and '10_test2-step1', so should be run after '10_test2-step1'
// This script will use same signer than '09_test-initial-setup' and '10_test2-step1', so that
// we can verify that if Wallet 1 Transfered TBA 1 to to Wallet 2 so wallet 1 now can not do any action
// on TBA 1 
// Example: Executed by Wallet 1
// Testcase 2
async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner/Signer: ",owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.attach(addresses[network.name].demoNFT);
  console.log("DemoNFT address:", await demoNFT.address);

  // Change privte key to change the signer to see if differnt account can call function
  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  

  console.log(`TBA: ${addresses[network.name].tbaWallet1}`);

  const encodedMintFunctionData = encodeFunctionData({
    abi: DemoNFT__factory.abi,
    functionName:"mint",
    args:[addresses[network.name].tbaWallet1]
  });

  // This should give error if signer is the one who was initial owner of TBA but now
  // transfered the token to another wallet using script '10_test2-step1'
  const executedCall = await tokenboundClient.executeCall({
    account: addresses[network.name].tbaWallet1,
    to: addresses[network.name].demoNFT,
    value: 0n,
    data: encodedMintFunctionData,
  })

  console.log("executedCall = ",executedCall);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
