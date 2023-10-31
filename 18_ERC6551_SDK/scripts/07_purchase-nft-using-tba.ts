import { artifacts, ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { encodeFunctionData, getAddress, parseUnits } from "viem";
import { DemoNFT__factory } from "../typechain-types";
const addresses = require("./address.json");

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });

  //console.log("test = ",tokenboundClient);

  const contractArtifacts = await artifacts.readArtifact("DemoNFT");

  /*
  // Using function ABI directly
  const encodedMintFunctionData = encodeFunctionData({
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName:"mint",
    args:[addresses[network.name].tbaGeneratedAccount1]
  });
  */
  
  /*
  // For mint function that is not payable and take one input parameter
  const encodedMintFunctionData = encodeFunctionData({
    abi: DemoNFT__factory.abi,
    functionName:"mint",
    args:[addresses[network.name].tbaGeneratedAccount1]
  });
  const executedCall = await tokenboundClient.executeCall({
    account: addresses[network.name].tbaGeneratedAccount1,
    to: addresses[network.name].demoNFT,
    value: 0n,
    data: encodedMintFunctionData,
  })
  */

  // For payable mint function and does not take input parameters
  const encodedMintFunctionData = encodeFunctionData({
    abi: DemoNFT__factory.abi,
    functionName:"mint2",
  });
  const executedCall = await tokenboundClient.executeCall({
    account: addresses[network.name].tbaGeneratedAccount1,
    to: addresses[network.name].demoNFT,
    value: parseUnits("0.07",18),
    data: encodedMintFunctionData,
  })

  /*
  
  const executedCall = await tokenboundClient.executeCall({
    account: addresses[network.name].tbaGeneratedAccount1,
    //to: getAddress(owner.address),
    to: addresses[network.name].demoNFT,
    value: parseUnits("0.05",18),
    data: '0x',
  })
  */

  console.log("executedCall = ",executedCall);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
