import { ethers, network } from "hardhat";
import { ERC6551Registry, ERC6551Registry__factory } from "../typechain-types";

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const ERC6551Registry:ERC6551Registry__factory = await ethers.getContractFactory("ERC6551Registry");
  const erc6551Registry:ERC6551Registry = await ERC6551Registry.deploy();
  await erc6551Registry.deployed();

  console.log("ERC6551Registry deployed to:", await erc6551Registry.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
