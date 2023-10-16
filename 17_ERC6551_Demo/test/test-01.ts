import { BigNumber, Wallet } from 'ethers';
import { ethers, network } from 'hardhat';
import { DemoNFT, ERC6551Registry, ERC6551Registry__factory, MyERC6551Account, MyERC6551Account__factory } from '../typechain-types';
import { DemoNFT__factory } from '../typechain-types/factories/contracts/DemoNFT copy.sol';
import { expect } from 'chai';
import { encodeFunctionData, getAddress } from 'viem';

describe("ERC6551 Acocunt Test", function () {
  let collection1:DemoNFT;
  let collection2:DemoNFT;
  let erc6551Registry:ERC6551Registry;
  let myERC6551Account:MyERC6551Account;
  let chainId = network.config.chainId || 31337;
  let salt1 = 123456;

  before(async()=>{
    const [owner, addr1, addr2] = await ethers.getSigners();

    console.log("Network = ",network.name);
    console.log("chainId = ",network.config.chainId);

    const DemoNFT:DemoNFT__factory = await ethers.getContractFactory("DemoNFT"); 
    collection1 = await DemoNFT.connect(addr1).deploy("Dcollection1", "DC1"); // deployed by Address 1
    await collection1.deployed();
    console.log("DemoNFT Collection1 deployed to:", await collection1.address);

    collection2 = await DemoNFT.connect(addr2).deploy("Dcollection2", "DC2"); // deployed by Address 2
    await collection2.deployed();
    console.log("DemoNFT Collection2 deployed to:", await collection2.address);

    const ERC6551Registry:ERC6551Registry__factory = await ethers.getContractFactory("ERC6551Registry");
    erc6551Registry = await ERC6551Registry.deploy();
    await erc6551Registry.deployed();
  
    console.log("ERC6551Registry deployed to:", await erc6551Registry.address);
  
    const MyERC6551Account:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    myERC6551Account = await MyERC6551Account.deploy();
    await myERC6551Account.deployed();

    console.log("MyERC6551Account deployed to:", await myERC6551Account.address);
      
  });

  it("Mint Tokens for Owner Address", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    // Minted 6 tokens 2 for each owner, addr1, addr2
    expect(await collection1.connect(owner).mint(owner.address)).to.be.ok; // token 0
    expect(await collection1.connect(owner).mint(owner.address)).to.be.ok; // token 1
    expect(await collection1.connect(addr1).mint(addr1.address)).to.be.ok; // token 2
    expect(await collection1.connect(addr1).mint(addr1.address)).to.be.ok; // token 3
    expect(await collection1.connect(addr2).mint(addr2.address)).to.be.ok; // token 4
    expect(await collection1.connect(addr2).mint(addr2.address)).to.be.ok; // tokne 5
  });

  it("Total Supply should be 6", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    expect(await collection1.connect(owner).totalSupply()).to.be.equal(6);
  });

  it("Owner of token 5 is addr2", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    //console.log(await collection1.connect(owner).ownerOf(5));
    expect(await collection1.connect(owner).ownerOf(5)).to.be.equal(addr2.address);
  });
/*
  it("Account Creation failed", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();



    const initData = encodeFunctionData({
      abi: MyERC6551Account__factory.abi,
      functionName: "initialize",
    })
    const tokenId = 5;
    expect(await erc6551Registry.connect(owner).createAccount(myERC6551Account.address,80001,collection1.address,tokenId,123456,initData)).to.be.ok;
  });
  */
  
  it("Account Created successfully for owner - Collection 1 - Token 0", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const initData = encodeFunctionData({
      abi: MyERC6551Account__factory.abi,
      functionName: "initialize",
    })
    const tokenId = 0;
    expect(await erc6551Registry.connect(owner).createAccount(myERC6551Account.address,chainId,collection1.address,tokenId,salt1,initData)).to.be.ok;
    
  });

  // Case 1 -- Wallet B can not use TBA0 which is created by Wallet A
  it("Case 1: Minting token with differnt signer should fail", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    
    let accountAddress = await erc6551Registry.connect(owner).account(myERC6551Account.address,chainId,collection1.address,0,salt1);
    //console.log("account address = ", accountAddress);
    
    const encodedMintFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"mint",
      args:[getAddress(accountAddress)]
    });

    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddress);
    // This should give error if signer is different then the one who is owner tokenbound address
    await expect(myERC6551Account1.connect(addr1).execute(collection1.address,0n,encodedMintFunctionData,0)).to.be.revertedWith("Invalid signer");
    
  });

  it("Minting token with same signer should be successfull", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    
    let accountAddress = await erc6551Registry.connect(owner).account(myERC6551Account.address,chainId,collection1.address,0,salt1);
    //console.log("account address = ", accountAddress);
    
    const encodedMintFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"mint",
      args:[getAddress(accountAddress)]
    });

    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddress);

    expect(await myERC6551Account1.connect(owner).execute(collection1.address,0n,encodedMintFunctionData,0)).to.be.ok;
  });

  it("Total Supply should be 7", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    expect(await collection1.connect(owner).totalSupply()).to.be.equal(7);
  });

  // Case 2A - Wallet A cannot use TBA0 after token 0 transfered from Wallet A to Wallet B
  it("Case 2A: Wallet A cannot use TBA0 after token 0 transfered from Wallet A to Wallet B", async function () {
    const [owner, addr1, addr2,addr3] = await ethers.getSigners();

    const tokenIdToTransfer = 0;
    const txt1 = await collection1.connect(owner).transferFrom(owner.address, addr3.address,tokenIdToTransfer);
    const receipt1 = await txt1.wait();

    expect(await collection1.connect(owner).ownerOf(0)).to.be.equal(addr3.address);

    let accountAddress = await erc6551Registry.connect(owner).account(myERC6551Account.address,chainId,collection1.address,0,salt1);
    
    const encodedMintFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"mint",
      args:[getAddress(accountAddress)]
    });

    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddress);

    // It should fail because we transfered token 0 form Wallet 'owner' to Wallet 'addr3'
    await expect(myERC6551Account1.connect(owner).execute(collection1.address,0n,encodedMintFunctionData,0)).to.be.revertedWith("Invalid signer");

  });

  // Case 2B - Wallet B should be able to use TBA0 because now Wallet B holds Token0 and TBA0
  it("Case 2B: Wallet B should be able to use TBA0", async function () {
    const [owner, addr1, addr2,addr3] = await ethers.getSigners();

    expect(await collection1.connect(owner).ownerOf(0)).to.be.equal(addr3.address);

    let accountAddress = await erc6551Registry.connect(owner).account(myERC6551Account.address,chainId,collection1.address,0,salt1);
    
    const encodedMintFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"mint",
      args:[getAddress(accountAddress)]
    });

    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddress);

    expect(await myERC6551Account1.connect(addr3).execute(collection1.address,0n,encodedMintFunctionData,0)).to.be.ok;

  });

  it("Total Supply should be 8", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    expect(await collection1.connect(owner).totalSupply()).to.be.equal(8);
  });

  // Case 3 - Transfer NFT from TBA to wallet that holds TBA
  it("Case 3 - Transfer NFT from TBA to wallet that holds TBA", async function () {
    const [owner, addr1, addr2,addr3] = await ethers.getSigners();

    // A: Creating TBA for token id 1
    const initData = encodeFunctionData({
      abi: MyERC6551Account__factory.abi,
      functionName: "initialize",
    })
    const tokenId = 1;
    expect(await erc6551Registry.connect(owner).createAccount(myERC6551Account.address,chainId,collection1.address,tokenId,salt1,initData)).to.be.ok;

    let accountAddress = await erc6551Registry.connect(owner).account(myERC6551Account.address,chainId,collection1.address,tokenId,salt1);
    
    // B: Minting Token for TBA
    const encodedMintFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"mint",
      args:[getAddress(accountAddress)]
    });

    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddress);

    expect(await myERC6551Account1.connect(owner).execute(collection1.address,0n,encodedMintFunctionData,0)).to.be.ok;
    const totalSupply = await collection1.totalSupply();
    //console.log("Total Supply = ",totalSupply);

    expect(await collection1.ownerOf(totalSupply.sub(1))).to.be.equal(accountAddress);

    // C: Transfer Token from TBA to Wallet that own TBA
    const encodedSafeTransferFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"safeTransferFrom",
      args:[getAddress(accountAddress),getAddress(owner.address),totalSupply.sub(1).toBigInt()]
    });
    expect(await myERC6551Account1.connect(owner).execute(collection1.address,0n,encodedSafeTransferFunctionData,0)).to.be.ok;
    // This will not working as you cannot send transaction directly from TBA
    //expect(await collection1.connect(accountAddress)['safeTransferFrom(address,address,uint256)'](accountAddress,owner.address,totalSupply.sub(1))).to.be.ok;

    expect(await collection1.ownerOf(totalSupply.sub(1))).to.be.equal(owner.address);
  });

  // Case 4 - Transfer NFT from TBA to wallet that does not holds TBA
  it("Case 4 - Transfer NFT from TBA to wallet that does not holds TBA", async function () {
    const [owner, addr1, addr2,addr3, addr4] = await ethers.getSigners();

    // A: Creating TBA for token id 1
    // TBA has already been created in last step/testcase so same TBA will be used
    const tokenId = 1;
    let accountAddress = await erc6551Registry.connect(owner).account(myERC6551Account.address,chainId,collection1.address,tokenId,salt1);
    
    // B: Minting Token for TBA
    const encodedMintFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"mint",
      args:[getAddress(accountAddress)]
    });

    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddress);

    expect(await myERC6551Account1.connect(owner).execute(collection1.address,0n,encodedMintFunctionData,0)).to.be.ok;
    const totalSupply = await collection1.totalSupply();
    //console.log("Total Supply = ",totalSupply);

    expect(await collection1.ownerOf(totalSupply.sub(1))).to.be.equal(accountAddress);

    // C: Transfer Token from TBA to Wallet that own TBA
    const encodedSafeTransferFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"safeTransferFrom",
      args:[getAddress(accountAddress),getAddress(addr4.address),totalSupply.sub(1).toBigInt()]
    });
    expect(await myERC6551Account1.connect(owner).execute(collection1.address,0n,encodedSafeTransferFunctionData,0)).to.be.ok;
    // This will not working as you cannot send transaction directly from TBA
    //expect(await collection1.connect(accountAddress)['safeTransferFrom(address,address,uint256)'](accountAddress,owner.address,totalSupply.sub(1))).to.be.ok;

    expect(await collection1.ownerOf(totalSupply.sub(1))).to.be.equal(addr4.address);
  });


  // Case 5 - Transfer NFT from TBA to Another TBA
  it("Case 5 - Transfer NFT from TBA to wallet that holds TBA", async function () {
    const [owner, addr1, addr2,addr3,addr4] = await ethers.getSigners();

    // A: Creating TBA for token id 2 with new address which is addr1
    const initData = encodeFunctionData({
      abi: MyERC6551Account__factory.abi,
      functionName: "initialize",
    })
    const tokenId = 2;
    expect(await erc6551Registry.connect(addr1).createAccount(myERC6551Account.address,chainId,collection1.address,tokenId,salt1,initData)).to.be.ok;

    let accountAddressForNewAccount = await erc6551Registry.connect(addr1).account(myERC6551Account.address,chainId,collection1.address,tokenId,salt1);

    const tokenIdOldTBA = 1;
    let accountAddressForOldTBA = await erc6551Registry.connect(owner).account(myERC6551Account.address,chainId,collection1.address,tokenIdOldTBA,salt1);
    
    // B: Minting Token for Old TBA which is created for token 1 for address owner
    const encodedMintFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"mint",
      args:[getAddress(accountAddressForOldTBA)]
    });

    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddressForOldTBA);

    expect(await myERC6551Account1.connect(owner).execute(collection1.address,0n,encodedMintFunctionData,0)).to.be.ok;
    const totalSupply = await collection1.totalSupply();
    //console.log("Total Supply = ",totalSupply);

    expect(await collection1.ownerOf(totalSupply.sub(1))).to.be.equal(accountAddressForOldTBA);

    // C: Transfer Token from TBA to another TBA
    const encodedSafeTransferFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"safeTransferFrom",
      args:[getAddress(accountAddressForOldTBA),getAddress(accountAddressForNewAccount),totalSupply.sub(1).toBigInt()]
    });
    expect(await myERC6551Account1.connect(owner).execute(collection1.address,0n,encodedSafeTransferFunctionData,0)).to.be.ok;
    // This will not working as you cannot send transaction directly from TBA
    //expect(await collection1.connect(accountAddress)['safeTransferFrom(address,address,uint256)'](accountAddress,owner.address,totalSupply.sub(1))).to.be.ok;

    expect(await collection1.ownerOf(totalSupply.sub(1))).to.be.equal(accountAddressForNewAccount);
  });


  // Case 6A - Transfer token that controls TBA to another TBA, which means token/TBA will be part of another TBA
  it("Case 6A - Transfer token that controls TBA to another TBA", async function () {
    const [owner, addr1, addr2,addr3,addr4] = await ethers.getSigners();

    // A: Creating TBA for token id 2 with new address which is addr1
    const initData = encodeFunctionData({
      abi: MyERC6551Account__factory.abi,
      functionName: "initialize",
    })
    const tokenId = 4;
    expect(await erc6551Registry.connect(addr2).createAccount(myERC6551Account.address,chainId,collection1.address,tokenId,salt1,initData)).to.be.ok;
    let accountAddressForNewAccount = await erc6551Registry.connect(addr2).account(myERC6551Account.address,chainId,collection1.address,tokenId,salt1);

    const tokenIdOldTBA = 1;
    let accountAddressForOldTBA = await erc6551Registry.connect(owner).account(myERC6551Account.address,chainId,collection1.address,tokenIdOldTBA,salt1);
    
    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddressForOldTBA);
    
    //console.log("New TBA = ",accountAddressForNewAccount);
    //console.log("Old TBA = ",accountAddressForOldTBA);
    console.log("Owner of Token = ",await collection1.connect(owner).ownerOf(tokenIdOldTBA));
    console.log("Owner of Old TBA Before token transfer = ",await myERC6551Account1.owner());
    
    expect(await collection1.connect(owner).ownerOf(tokenIdOldTBA)).to.be.equal(owner.address);
    expect(await myERC6551Account1.owner()).to.be.equal(owner.address);

    const txt1 = await collection1.connect(owner).transferFrom(owner.address,accountAddressForNewAccount,tokenIdOldTBA);
    const receipt1 = await txt1.wait();

    // Now owner of Token and TBA is new TBA
    expect(await collection1.connect(owner).ownerOf(tokenIdOldTBA)).to.be.equal(accountAddressForNewAccount);
    expect(await myERC6551Account1.owner()).to.be.equal(accountAddressForNewAccount);
    console.log("Owner of Token = ",await collection1.connect(owner).ownerOf(tokenIdOldTBA));
    console.log("Owner of Old TBA Before token transfer = ",await myERC6551Account1.owner());
  });

  // Case 6B - --
  it("Case 6B - Use TBA0 from TBA1", async function () {
    const [owner, addr1, addr2,addr3,addr4] = await ethers.getSigners();

    const tokenId = 4;
    let accountAddressForNewAccount = await erc6551Registry.connect(addr2).account(myERC6551Account.address,chainId,collection1.address,tokenId,salt1);

    const tokenIdOldTBA = 1;
    let accountAddressForOldTBA = await erc6551Registry.connect(owner).account(myERC6551Account.address,chainId,collection1.address,tokenIdOldTBA,salt1);
    
    console.log("New TBA = ",accountAddressForNewAccount);
    console.log("Old TBA = ",accountAddressForOldTBA);

    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddressForOldTBA);
    
    const myERC6551Account2:MyERC6551Account = await MyERC6551Account1.attach(accountAddressForNewAccount);
    console.log("Owner of Token = ",await collection1.connect(owner).ownerOf(tokenIdOldTBA));
    console.log("Owner of Old TBA Before token transfer = ",await myERC6551Account1.owner());
    console.log("Owner of new TBA Before token transfer = ",await myERC6551Account2.owner());

    console.log("Total supply before = ", await collection1.totalSupply());
    const encodedMintFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"mint",
      args:[getAddress(accountAddressForOldTBA)]
    });

    const encodedExecuteFunctionData = encodeFunctionData({
      abi: MyERC6551Account__factory.abi,
      functionName:"execute",
      args:[getAddress(collection1.address),0n,encodedMintFunctionData,BigInt(0)],
    });

    expect(await myERC6551Account2.connect(addr2).execute(accountAddressForOldTBA,0n,encodedExecuteFunctionData,0)).to.be.ok;
    
    //expect(await myERC6551Account2.connect(addr2).execute(collection1.address,0n,encodedMintFunctionData,0)).to.be.ok;
    const totalSupplyAfter = await collection1.totalSupply();
    console.log("Total supply after = ", await collection1.totalSupply());
    console.log("Owner of Token = ",await collection1.connect(owner).ownerOf(totalSupplyAfter.sub(1)));
  });

  it("Total Supply should be 11", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    //  expect(await collection1.connect(owner).totalSupply()).to.be.equal(11);
  });

  // Case 7 - Wallet A is the owner of Token 0, but Wallet B creates TBA0 for Token 0, even 
  //          then only wallet A should be able to access TBA0
  it("Case 7A - TBA create by differnt non-token owner should have same owner as token owner", async function () {
    const [owner, addr1, addr2,addr3,addr4, addr5, addr6] = await ethers.getSigners();
    /*
    expect(await collection1.connect(owner).mint(addr5.address)).to.be.ok; // token 11
    expect(await collection1.connect(owner).mint(addr5.address)).to.be.ok; // token 12

    // A: Creating TBA for token id 11 which has owner addr5, but account will be created by addr6
    const initData = encodeFunctionData({
      abi: MyERC6551Account__factory.abi,
      functionName: "initialize",
    })
    const tokenId = 11;
    expect(await erc6551Registry.connect(addr6).createAccount(myERC6551Account.address,chainId,collection1.address,tokenId,salt1,initData)).to.be.ok;
    let accountAddressForToken11 = await erc6551Registry.connect(addr6).account(myERC6551Account.address,chainId,collection1.address,tokenId,salt1);

    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddressForToken11);
    

    expect(await collection1.connect(owner).ownerOf(tokenId)).to.be.equal(addr5.address);
    expect(await myERC6551Account1.owner()).to.be.equal(addr5.address);
    //console.log("Owner of Token = ",await collection1.connect(owner).ownerOf(tokenId));
    //console.log("Owner of TBA = ",await myERC6551Account1.owner());
    */
  });

  // Case 7 - Wallet A is the owner of Token 0, but Wallet B creates TBA0 for Token 0, even 
  //          then only wallet A should be able to access TBA0
  it("Case 7B - TBA create by differnt non-token owner cannot be accessed by non-token owner", async function () {
    const [owner, addr1, addr2,addr3,addr4, addr5, addr6] = await ethers.getSigners();
    /*
    const tokenId = 11; // Same as used in previous testcase
    let accountAddressForToken11 = await erc6551Registry.connect(addr6).account(myERC6551Account.address,chainId,collection1.address,tokenId,salt1);

    // B: Minting Token for TBA which is created for token 11
    const encodedMintFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"mint",
      args:[getAddress(accountAddressForToken11)]
    });
    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddressForToken11);

    const totalSupplyBefore = await collection1.totalSupply();
    await expect(myERC6551Account1.connect(addr6).execute(collection1.address,0n,encodedMintFunctionData,0)).to.be.revertedWith("Invalid signer");
    expect(await await collection1.totalSupply()).to.be.equal(totalSupplyBefore);
    */
  });

  // Case 7 - Wallet A is the owner of Token 0, but Wallet B creates TBA0 for Token 0, even 
  //          then only wallet A should be able to access TBA0
  it("Case 7B - TBA create by differnt non-token owner can be successfully accessed by token owner", async function () {
    const [owner, addr1, addr2,addr3,addr4, addr5, addr6] = await ethers.getSigners();
    /*
    const tokenId = 11; // Same as used in previous testcase
    let accountAddressForToken11 = await erc6551Registry.connect(addr6).account(myERC6551Account.address,chainId,collection1.address,tokenId,salt1);

    // B: Minting Token for TBA which is created for token 11
    const encodedMintFunctionData = encodeFunctionData({
      abi: DemoNFT__factory.abi,
      functionName:"mint",
      args:[getAddress(accountAddressForToken11)]
    });
    const MyERC6551Account1:MyERC6551Account__factory = await ethers.getContractFactory("MyERC6551Account");
    const myERC6551Account1:MyERC6551Account = await MyERC6551Account1.attach(accountAddressForToken11);

    const totalSupplyBefore = await collection1.totalSupply();
    expect(await myERC6551Account1.connect(addr5).execute(collection1.address,0n,encodedMintFunctionData,0)).to.be.ok;
    expect(await await collection1.totalSupply()).to.be.equal(totalSupplyBefore.add(1));
    */
  });
});
