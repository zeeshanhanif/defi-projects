import { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { ShapeNFT, ShapeNFT__factory } from '../typechain';

describe("ShapeNFT", function () {
  it("Should Owner's correct address", async function () {

    const [owner] = await ethers.getSigners();
    const ShapeNFT:ShapeNFT__factory = await ethers.getContractFactory("ShapeNFT");
    const shapeNFT:ShapeNFT = await ShapeNFT.deploy();
    await shapeNFT.deployed();
    
    console.log(await shapeNFT.owner());

    expect(await shapeNFT.owner()).to.equal(await owner.getAddress());
  });
});
