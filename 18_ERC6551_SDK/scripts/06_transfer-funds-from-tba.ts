import { ethers, network } from "hardhat";
import { TokenboundClient } from "@tokenbound/sdk";
import { getAddress, parseUnits } from "viem";
const addresses = require("./address.json");

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });

  //console.log("test = ",tokenboundClient);

  const executedCall = await tokenboundClient.executeCall({
    account: addresses[network.name].tbaGeneratedAccount1,
    to: getAddress(owner.address),
    value: parseUnits("0.3",18),
    data: '0x',
  })

  console.log("executedCall = ",executedCall);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
