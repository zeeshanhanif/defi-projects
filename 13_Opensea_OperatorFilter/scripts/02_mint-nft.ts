import { ethers, network } from 'hardhat';
import { SampleFilterNFT, SampleFilterNFT__factory } from '../typechain';
const addresses = require("./address.json");

async function main() {

    const [owner, addr1, addr2,addr3] = await ethers.getSigners();
    console.log("Network = ",network.name);

    const SampleFilterNFT: SampleFilterNFT__factory = await ethers.getContractFactory("SampleFilterNFT");
    const sampleFilterNFT:SampleFilterNFT = await SampleFilterNFT.attach(addresses[network.name].sampleFilterNFT);
    console.log("SampleFilterNFT Address: ", sampleFilterNFT.address);

    const txt1 = await sampleFilterNFT.mint(owner.address,3);
    console.log("sampleFilterNFT.mint hash ",txt1.hash);
    const txtReceipt1 = txt1.wait();

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
