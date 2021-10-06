import { BigNumber } from '@ethersproject/bignumber';
import { expect } from 'chai';
import { ethers, waffle } from 'hardhat';
import { ShanCoin__factory } from '../typechain/factories/ShanCoin__factory';
import { ShanCoin } from '../typechain/ShanCoin';

describe("TotalSupply", function () {
  it("Should return the Total Supply", async function () {
    //ethers.getSigners returns array of 20 addresses, first one from the list will be used as owner for deployment
    const [owner,addr1] = await ethers.getSigners();
    
    const ShanCoin: ShanCoin__factory = await ethers.getContractFactory("ShanCoin");
    const shanCoin: ShanCoin = await ShanCoin.deploy(1000);
    await shanCoin.deployed();

    const balance:BigNumber = await shanCoin.balanceOf(await owner.getAddress());
    console.log("owner address = ",await owner.getAddress());
    console.log("owner balance = ",balance);
    console.log("Balance of second address = ",(await shanCoin.balanceOf(await addr1.getAddress())).toString());

    const supply:BigNumber = BigNumber.from("1000000000000000000000");
    console.log("total supply = ",supply);
    
    expect(await shanCoin.totalSupply()).to.equal(supply);
  });
});
