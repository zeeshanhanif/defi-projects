import { ethers, network } from "hardhat";
import { DemoNFT__factory, ERC6551Registry, ERC6551Registry__factory, MyERC6551Account__factory } from "../typechain-types";
import { encodeFunctionData } from 'viem'
const addresses = require("./address.json");


async function main() {

  const [owner, addr1] = await ethers.getSigners();
  console.log("Network = ",network.name);

  const ERC6551Registry:ERC6551Registry__factory = await ethers.getContractFactory("ERC6551Registry");
  const erc6551Registry:ERC6551Registry = await ERC6551Registry.attach(addresses[network.name].erc6551Registry);
  //const erc6551Registry:ERC6551Registry = await ethers.getContractAt("ERC6551Registry",addresses[network.name].erc6551Registry);

  console.log("ERC6551Registry deployed to:", await erc6551Registry.address);
  
  /*
  const interfaceE = new ethers.utils.Interface([
      {
        inputs: [],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  );
  const data = interfaceE.encodeFunctionData("initialize");
  console.log("data from interface = ", data);
    */

  /*
  const initData = encodeFunctionData({
    abi: [
      {
        inputs: [],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "initialize",
  })
  console.log("data from viem function = ",initData);
  */
  
  ///

  /*
  
  const initData = encodeFunctionData({
    abi: [
      {
        inputs: [],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "initialize",
  })
  
  */

  
  ///

  const initData = encodeFunctionData({
    abi: MyERC6551Account__factory.abi,
    functionName: "initialize",
  })
  console.log("data from viem function = ",initData);
  const txt1 = await erc6551Registry.createAccount(addresses[network.name].myERC6551Account,80001,addresses[network.name].demoNFT,0,123456,initData)
  const receipt = await txt1.wait();

  console.log("Transaction done = ",receipt)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
