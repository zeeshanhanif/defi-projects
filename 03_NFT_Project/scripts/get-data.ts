import { ethers, run } from 'hardhat';
import { ShapeNFT, ShapeNFT__factory } from '../typechain';
import { shapes } from './data';

async function main() {
    // Replace this address with your deployed Contract Address
    const shapeNFTAddress = "0x201a0b4953EB69adA20d92b34e8f1a17BbCc8602";
    const ShapeNFT:ShapeNFT__factory = await ethers.getContractFactory("ShapeNFT");
    const shapeNFT:ShapeNFT = await ShapeNFT.attach(shapeNFTAddress);

    const address = "<ETH address which has NFT token>";
    
    console.log("Token Counter = ",(await shapeNFT.tokenCounter()).toString());
    console.log(`Balance of ${address} = `,(await shapeNFT.balanceOf(address)).toString());
    console.log("Get Shape = ",await shapeNFT.getShape(0));
    console.log("Token URI = ",await shapeNFT.tokenURI(0));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
