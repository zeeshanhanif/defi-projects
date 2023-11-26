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

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  

  console.log(`TBA: ${addresses[network.name].tbaWallet1}`);
  console.log(`TBA: ${addresses[network.name].tbaWallet2}`);
  console.log(`Owner of Token = ${await demoNFT.ownerOf(1)}`);
  console.log(`Owner of Token = ${await demoNFT.ownerOf(2)}`);

  const encodedMintFunctionData = encodeFunctionData({
    abi: DemoNFT__factory.abi,
    functionName:"mint",
    args:[addresses[network.name].tbaWallet2]
  });
  const executedCall = await tokenboundClient.executeCall({
    account: addresses[network.name].tbaWallet2,
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
