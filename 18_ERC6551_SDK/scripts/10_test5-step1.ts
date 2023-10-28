import { ethers, network } from "hardhat";
import { TokenboundClient, erc6551AccountAbi } from "@tokenbound/sdk";
import { encodeFunctionData, getAddress, parseUnits } from "viem";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import { BigNumber } from "ethers";
const addresses = require("./testcase-addresses.json");

// No need to run '09_test-initial-setup' for this example
// With this test case we want to verify token 0 which holds TBA 1 can be transfered to 
// TBA 2 and now TBA2 is owner of both Token 0 and TBA1
// Example: Exectued by Wallet 1
// Testcase 6, Step 1
async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);
  console.log("Owner/Signer: ",owner.address);

  const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT");
  const demoNFT:DemoNFT = await DemoNFT.attach(addresses[network.name].demoNFT);
  console.log("DemoNFT address:", await demoNFT.address);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  

  console.log("-- Minting token and Generating Account for Wallet 1");
  console.log('Total Supply 1 before = ', await demoNFT.totalSupply());
  const txt1 = await demoNFT.mint(owner.address); // Assumping Example executed by Wallet 1
  console.log("Transaction = ",txt1.hash);
  const receipt1 = await txt1.wait();
  const totalSupply1 = await demoNFT.totalSupply();
  console.log('Total Supply 1 after = ',totalSupply1 );
       
  const tokenIdForTBA1 = totalSupply1.sub(1).toString();
  console.log('TokenId to be used for TBA1 = ',tokenIdForTBA1);
  const account1 = await tokenboundClient.createAccount({
    tokenContract: addresses[network.name].demoNFT,
    tokenId: tokenIdForTBA1,
  })

  console.log(`TBA: ${account1} for signer: ${owner.address}`);
  console.log(`And contract ${addresses[network.name].demoNFT} - TokenId: ${tokenIdForTBA1}`);

  console.log("-- Minting token and Generating Account for Wallet 2");
  console.log('Total Supply 2 before = ', await demoNFT.totalSupply());
  const txt2 = await demoNFT.mint(addresses[network.name].wallet2Address); // Assumping Example executed by Wallet 1
  console.log("Transaction = ",txt2.hash);
  const receipt2 = await txt2.wait();
  const totalSupply2 = await demoNFT.totalSupply();
  console.log('Total Supply 2 after = ',totalSupply2 );
       
  const tokenIdForTBA2 = totalSupply2.sub(1).toString();
  console.log('TokenId to be used for TBA2 = ',tokenIdForTBA2);
  const account2 = await tokenboundClient.createAccount({
    tokenContract: addresses[network.name].demoNFT,
    tokenId: tokenIdForTBA2,
  })

  console.log(`TBA: ${account2} for signer: ${addresses[network.name].wallet2Address}`);
  console.log(`And contract ${addresses[network.name].demoNFT} - TokenId: ${tokenIdForTBA2}`);

  console.log("-- Minting and Account Generation Ends --");

  // After this account2 will be owner of token and acocunt1
  const tokenIdToTransfer = tokenIdForTBA1;
  const txt3 = await demoNFT.transferFrom(owner.address, account2 ,tokenIdToTransfer);
  const receipt3 = await txt1.wait();

  console.log("Transfer Done");

  /*
  // This will not work because we want to transfer token which holds TBA
  const tokenIdGeneratedInLastStep = "15"; 
  const transferNFT = await tokenboundClient.transferNFT({
    account: addresses[network.name].tbaWallet1,
    tokenType: "ERC721",
    tokenContract: addresses[network.name].demoNFT,
    tokenId: tokenIdGeneratedInLastStep.toString(),
    recipientAddress: getAddress(addresses[network.name].tbaWallet2),
  })

  console.log("transferNFT = ",transferNFT);
  */
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
