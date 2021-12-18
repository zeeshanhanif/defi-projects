
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { metadata_template, shapes } from './data';

async function main() {
    if(!existsSync("metadata")){
        mkdirSync("metadata");
    }
    for(let i=0;i<shapes.length;i++){
        let shapeMetadata = metadata_template;
        //console.log("Shapes = ",shapes[i]);
        shapeMetadata.name = shapes[i].name;
        shapeMetadata.description= `${shapes[i].name} Shape with ${shapes[i].color} color`;
        
        // According to this documentation https://docs.opensea.io/docs/metadata-standards#ipfs-and-arweave-uris
        // We will provide image like ipfs://<hash>
        // Replace this hash with your hash
        shapeMetadata.image=`ipfs://QmfFDBWoVQc1X5Lzdqv9XsbzdrHtvp4uAHNjqJq1gPqcNV/${shapes[i].imageName}`;
        shapeMetadata.attributes[0].value = shapes[i].name;
        shapeMetadata.attributes[1].value = shapes[i].color;

        console.log(shapeMetadata);

        let filename = "metadata/"+shapes[i].imageName.toLowerCase().replace(/\s/g, '-').replace("png","json");
        console.log("filename = ",filename);
        console.log("==============");
        let data = JSON.stringify(shapeMetadata);
        writeFileSync(filename,data);
        
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
