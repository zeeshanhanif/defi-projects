import { ethers, run } from 'hardhat';
import { ShapeNFT, ShapeNFT__factory } from '../typechain';
import { shapes } from './data';

async function main() {
    // Replace this address with your deployed Contract Address
    const shapeNFTAddress = "0x201a0b4953EB69adA20d92b34e8f1a17BbCc8602";
    const ShapeNFT:ShapeNFT__factory = await ethers.getContractFactory("ShapeNFT");
    const shapeNFT:ShapeNFT = await ShapeNFT.attach(shapeNFTAddress);

    //const addressToAwardToken = "<ETH address to which we want to send NFT>";
    const addressToAwardToken = "0xb11846818Eda46eCa2E0481A4A4AFEBB4CAC18d5";
    
    const shapeMetadata = {
        name:"Triangle",
        color: "Rose",
        imageName: "13_triangle_rose.png"
    }   

    let tokenURI = `ipfs://QmXsMLpKjznF3z1KsVm5tNs3E94vj4BFAyAHvD5RTWgQ1J`;
        const txt1 = await shapeNFT.createNFT(addressToAwardToken,shapeMetadata.name,shapeMetadata.color,tokenURI);
        console.log(txt1);
        console.log("New Shape NFT Generated - Counter = ", txt1);
        console.log("-----");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
