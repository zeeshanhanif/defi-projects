import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { getAddress, parseUnits } from "viem";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import { BigNumber } from "ethers";
const addresses = require("./testcase-addresses.json");

// This script should be used setup contract, token and tokenbound account
// Example: Executed by Wallet 1

// For Testcase 5 -- run it second time to generate another tokenbound account
// For testcase 5 Example executed by Wallet 2
// Run twice for Testcase 6
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
       
  const tokenIdForTBA = totalSupply.sub(1).toString();
  console.log('TokenId to be used for TBA = ',tokenIdForTBA);
  const account = await tokenboundClient.createAccount({
    tokenContract: addresses[network.name].demoNFT,
    tokenId: tokenIdForTBA,
  })

  console.log(`TBA: ${account} for signer: ${owner.address}`);
  console.log(`And contract ${addresses[network.name].demoNFT} - TokenId: ${tokenIdForTBA}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
