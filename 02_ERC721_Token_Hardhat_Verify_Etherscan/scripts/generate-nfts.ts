import { ethers } from "hardhat";
import { NewNFT__factory } from "../typechain";

async function main() {
    
    const newNFTAddress = "0xCB55d1e54b10c42Fc1548AfE7DBca8c895DDa85C";
    const NewNFT:NewNFT__factory = await ethers.getContractFactory("NewNFT");
    const newnft = await NewNFT.attach(newNFTAddress);

    const addressToAwardToken = "<ETH address to which we want to send NFT>";

    // At this moment these URI does not exists we are just using dummy URIs
    const txt1 = await newnft.createNFT(addressToAwardToken,"http://www.vnftdemorinkebynft.com/21.json");
    const txt2 = await newnft.createNFT(addressToAwardToken,"http://www.vnftdemorinkebynft.com/22.json");
    const txt3 = await newnft.createNFT(addressToAwardToken,"http://www.vnftdemorinkebynft.com/23.json");
    const txt4 = await newnft.createNFT(addressToAwardToken,"http://www.vnftdemorinkebynft.com/24.json");

    console.log("New NFTs Generated");

  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  