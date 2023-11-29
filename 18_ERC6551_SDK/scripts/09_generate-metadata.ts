import { ethers, network } from "hardhat";
import { DemoNFT, DemoNFT__factory } from "../typechain-types";
import fs from 'fs';

async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  // Color Names where choosen from this website: https://www.color-name.com/
  
  //Below two are additional complementry sites, but above one is used to chose the names
  //https://chir.ag/projects/name-that-color
  //https://colornamer.robertcooper.me/
  const colors = ["#F08784","#EB3324","#774342","#8E403A","#3A0603","#9FFCFD","#73FBFD","#3282F6","#0023F5","#00129A","#16417C","#000C7B","#FFFE91","#FFFD55","#F09B59","#F08650","#784315","#817F26","#7E84F7","#732BF5","#3580BB","#00023D","#58135E","#3A083E","#A1FB8E","#A1FA4F","#75F94D","#75FA61","#75FA8D","#818049","#EF88BE","#EE8AF8","#EA3FF7","#EA3680","#7F82BB","#75163F","#377D22","#377E47","#367E7F","#507F80","#183E0C","#173F3F","#741B7C","#39107B","#000000","#808080","#C0C0C0","#92C6FF","#E0CB8F","#CF718F"];
  const colorsNames = ["Light Coral","Venetian Red","Deep Coffee","Brandy","Black Bean","Waterspout","Electric Blue","Bleu De France","Bluebonnet","Cadmium Blue","Dark Cerulean","Dark Imperial Blue","Pastel Yellow","Dodie Yellow","Sandy Brown","Mandarin","Sepia","Spanish Bistre","Medium Slate Blue","Blue-Violet","Cyan-Blue Azure","Cetacean Blue","American Purple","Dark Purple","Pale Green","French Lime","Screamin' Green","Screamin' Green","Very Light Malachite Green","Gold Fusion","Persian Pink","Lavender Magenta","Purple Pizzazz","Cerise Pink","Ube","Pansy Purple","Japanese Laurel","Amazon","Celadon Green","Wintergreen Dream","Phthalo Green","MSU Green","Midnight","Persian Indigo","Black","Gray","Argent","Light Sky Blue","Gold","Charm"];
  const shape = "Diamond";
  const imageBaseURI = "https://coral-wasteful-lion-960.mypinata.cloud/ipfs/QmVyBW1weaeJLqmWJUFaeUph3HVZeRbwEvN5pdMDW9hMym/";
  
  for (let index = 0; index < colors.length; index++) {
    //const check = 
    const metadata = {
    "name": `${shape}: ${colors[index]}`,
    "description": `${shape} Shape with ${colorsNames[index]} color`,
    "image": `${imageBaseURI}${(index+1)}.png`,
    "attributes": [
        {
            "trait_type": "Name",
            "value": `${shape}`
        },
        {
            "trait_type": "Color",
            "value": `${colorsNames[index]}`
        },
        {
            "trait_type": "Color Hex",
            "value": `${colors[index]}`
        },
        {
            "trait_type": "Token Id",
            "value": `${(index+1)}`
        }
    ]
  }
    console.log(metadata);
    fs.writeFileSync(`data/${(index+1)}.json`,JSON.stringify(metadata));
  }


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
