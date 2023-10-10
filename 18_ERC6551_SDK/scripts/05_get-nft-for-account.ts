import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
const addresses = require("./address.json");

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });

  //console.log("test = ",tokenboundClient);

  const nft = await tokenboundClient.getNFT({
    accountAddress: addresses[network.name].tbaGeneratedAccount1,
  })
   
  const { tokenContract, tokenId, chainId } = nft
  
  console.log({ tokenContract, tokenId, chainId })

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
