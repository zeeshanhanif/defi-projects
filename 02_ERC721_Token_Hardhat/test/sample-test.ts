import { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { NewNFT, NewNFT__factory } from '../typechain';

describe("Deploy NFT", function () {
  it("Should check owner address is same", async function () {
    
    const [owner] = await ethers.getSigners();
    const NewNFT:NewNFT__factory = await ethers.getContractFactory("NewNFT");
    const newnft:NewNFT = await NewNFT.deploy();
    await newnft.deployed();

    console.log(await newnft.owner());

    expect(await newnft.owner()).to.equal(await owner.getAddress());


  });
});
