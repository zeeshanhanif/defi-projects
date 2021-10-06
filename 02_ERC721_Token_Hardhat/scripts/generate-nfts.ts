import { ethers } from "hardhat";
import { NewNFT__factory } from "../typechain";

async function main() {
    
    const newNFTAddress = "<NFT Address after contract deployment>";
    const NewNFT:NewNFT__factory = await ethers.getContractFactory("NewNFT");
    const newnft = await NewNFT.attach(newNFTAddress);

    const addressToAwardToken = "<ETH address to which we want to send NFT>";

    // At this moment these URI does not exists we are just using dummy URIs
    const txt1 = await newnft.createNFT(addressToAwardToken,"http://www.newnftdemorinkebynft.com/11.json");
    const txt2 = await newnft.createNFT(addressToAwardToken,"http://www.newnftdemorinkebynft.com/12.json");
    const txt3 = await newnft.createNFT(addressToAwardToken,"http://www.newnftdemorinkebynft.com/13.json");
    const txt4 = await newnft.createNFT(addressToAwardToken,"http://www.newnftdemorinkebynft.com/14.json");

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
  