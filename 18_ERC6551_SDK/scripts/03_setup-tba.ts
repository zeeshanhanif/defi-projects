import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
const addresses = require("./address.json");

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });

  console.log("test = ",tokenboundClient);

  /*
  const tokenBoundAccount = tokenboundClient.getAccount({
    tokenContract: "0x1F393AD8dA846e2488FF94e3330325B3cc4b6dc7",
    tokenId: "0",
  })
   
  console.log(tokenBoundAccount) //0x1a2...3b4cd
  */
 
  const account = await tokenboundClient.createAccount({
    tokenContract: addresses[network.name].demoNFT,
    //tokenContract: "0xC6B0Fc287aBaf25B60bBC60035b1b06dEAF01a5D",
    tokenId: "2",
  })

  console.log(account) //0x1a2...3b4cd
  
  // Token 0 -- TBA 0
  // Wallet A - holds token 0
  // Wallet A controls TBA 0

  // Verify
  // Wallet B can not use TBA 0
  // Verify 
  // When transfer token 0 from wallet A to wallet B, Wallet A can no longer use TAB 0
  // make sure wallet B which holds token 0, it can use TBA 0
  //   
// cases for Transfer NFT from TBA
 // case 1
 // from TBA to wallet that holds TBA
 // case 2 - from TBA to wallet that does not control TBA
 // case 3 - from TBA to another TBA
 // case 4 - transfer token 0 that controls TBA0 to TBA1 and make sure we can use TBA0 from TBA1

 // token 2 and 3 in TBA 0
 // me move token 0 to TBA 1 and then try to transfer token 2 from TBA 1
 // then after we move token 0 to TBA 1, token 1 tba 0

 // testing on gorli and optimisum
 
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
