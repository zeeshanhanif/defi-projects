import { ethers, network } from "hardhat";
import { ERC6551Registry, ERC6551Registry__factory, MyERC6551Account, MyERC6551Account__factory } from "../typechain-types";

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const MyERC6551Account:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
  const myERC6551Account:MyERC6551Account = await MyERC6551Account.deploy();
  await myERC6551Account.deployed();

  console.log("MyERC6551Account deployed to:", await myERC6551Account.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
