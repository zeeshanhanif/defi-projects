import { ethers, run } from 'hardhat';
import { ShapeNFT, ShapeNFT__factory } from '../typechain';
import { shapes } from './data';

async function main() {
    // Replace this address with your deployed Contract Address
    const shapeNFTAddress = "0x201a0b4953EB69adA20d92b34e8f1a17BbCc8602";
    const ShapeNFT:ShapeNFT__factory = await ethers.getContractFactory("ShapeNFT");
    const shapeNFT:ShapeNFT = await ShapeNFT.attach(shapeNFTAddress);

    const addressToAwardToken = "<ETH address to which we want to send NFT>";
    
    for(let i=0;i<shapes.length;i++){
        // hash of metadata's uploaded folder
        // Assuming the file name pattern will be same for image and json both
        // So if image name is '01_shap1.png' then json name will be '01_shap1.json'
        let tokenURI = `ipfs://QmST7mVJVShNpsxZSHq86RRymshSj8PmSbQkAr4VHvFFrM/${shapes[i].imageName.replace("png","json")}`;
        const txt1 = await shapeNFT.createNFT(addressToAwardToken,shapes[i].name,shapes[i].color,tokenURI);
        console.log(txt1);
        console.log("Shape NFT Generated - Counter = ",i);
        console.log("-----");
    }

    console.log("All NFTs Generated");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
