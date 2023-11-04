import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { getAddress, parseUnits } from "viem";
const addresses = require("./address.json");

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });

  /*
  const transferNFT = await tokenboundClient.transferNFT({
    account: addresses[network.name].tbaGeneratedAccount1,
    tokenType: "ERC721",
    tokenContract: addresses[network.name].demoNFT,
    tokenId: "2",
    recipientAddress: "0xb11846818Eda46eCa2E0481A4A4AFEBB4CAC18d5",
  })
  */
  const transferNFT = await tokenboundClient.transferNFT({
    account: getAddress(owner.address),
    tokenType: "ERC721",
    tokenContract: addresses[network.name].demoNFT,
    tokenId: "2",
    recipientAddress: addresses[network.name].tbaGeneratedAccount1,
  })

  console.log(transferNFT);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
