import { ethers, network } from "hardhat";
import { DemoNFT__factory, ERC6551Registry, ERC6551Registry__factory, MyERC6551Account, MyERC6551Account__factory } from "../typechain-types";
import { encodeFunctionData } from 'viem'
const addresses = require("./address.json");


async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const MyERC6551Account:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
  const myERC6551Account:MyERC6551Account = await MyERC6551Account.attach(addresses[network.name].tba1);

  console.log("MyERC6551Account address:", await myERC6551Account.address);

  const txt1 = await myERC6551Account.token();

  console.log("token = ",txt1);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
