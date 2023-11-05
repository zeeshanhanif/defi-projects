import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { encodeFunctionData, getAddress, parseUnits } from "viem";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import { BigNumber } from "ethers";
const addresses = require("./testcase-addresses.json");

// No need to run '09_test-initial-setup' for this example
// This script will be executed after '10_test6-step2'
// Case 7 - Wallet A is the owner of Token 0, but Wallet B creates TBA0 for Token 0, even 
//          then only wallet A should be able to access TBA0
// Example: Exectued by Wallet 2 -- This will not work, because token owner is Wallet 1
// Example: Exectued by Wallet 1 -- This will work, because token owner is Wallet 1
// be carefull in switching Wallet in this example

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner/Signer: ",owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.attach(addresses[network.name].demoNFT);
  console.log("DemoNFT address:", await demoNFT.address);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  

  const totalSupply = await demoNFT.totalSupply();
  const tokenIdForTBA = totalSupply.sub(1).toString();

  const account = tokenboundClient.getAccount({
    tokenContract: addresses[network.name].demoNFT,
    tokenId:tokenIdForTBA
  })

  console.log(`TBA: ${account}`);
  console.log(`And contract ${addresses[network.name].demoNFT} - TokenId: ${tokenIdForTBA}`);
  console.log(`Owner of Token = ${await demoNFT.ownerOf(tokenIdForTBA)}`);

  const encodedMintFunctionData = encodeFunctionData({
    abi: DemoNFT__factory.abi,
    functionName:"mint",
    args:[account]
  });
  const executedCall = await tokenboundClient.executeCall({
    account: account,
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
