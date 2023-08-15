import { ethers, run } from 'hardhat';
import { MockOperator, MockOperator__factory, SampleFilterNFT, SampleFilterNFT__factory } from '../typechain';

async function main() {

    const [owner, addr1, addr2,addr3] = await ethers.getSigners();

    const SampleFilterNFT: SampleFilterNFT__factory = await ethers.getContractFactory("SampleFilterNFT");
    const sampleFilterNFT:SampleFilterNFT = await SampleFilterNFT.deploy();
    await sampleFilterNFT.deployed();
    // Will add this address in address.json so that other scripts can use this address
    console.log("SampleFilterNFT deployed to:", sampleFilterNFT.address);

/*
    const MockOperator: MockOperator__factory = await ethers.getContractFactory("MockOperator");
    const mockOperator:MockOperator = await MockOperator.deploy(sampleFilterNFT.address);
    await mockOperator.deployed();
    // Will add this address in address.json so that other scripts can use this address
    console.log("MockOperator deployed to:", mockOperator.address);
    */
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
