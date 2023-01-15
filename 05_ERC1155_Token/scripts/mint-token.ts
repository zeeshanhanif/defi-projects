import { BigNumber, ContractReceipt, ContractTransaction } from 'ethers';
import { ethers, run } from 'hardhat';
import { MultiTokenNFT, MultiTokenNFT__factory } from '../typechain';

async function main() {
  const [owner, addr1] = await ethers.getSigners();

  //https://game.example/api/item/{id}.json
  const MultiTokenNFT:MultiTokenNFT__factory = await ethers.getContractFactory("MultiTokenNFT");
  const multiTokenNFT:MultiTokenNFT = await MultiTokenNFT.attach("0x0F4763d3652aFB7d061909C5080ee9323b292540");
  
  console.log("MultiTokenNFT Address:", multiTokenNFT.address);

  const tokenId = BigNumber.from("2");
  const numberOfTokens = BigNumber.from("4");
  const txt:ContractTransaction = await multiTokenNFT.mintToken(owner.address, tokenId, numberOfTokens);
  // logesh: 0x07C920eA4A1aa50c8bE40c910d7c4981D135272B
  // Adam: 0xa0cb079d354b66188f533a919d1c58cd67afe398

  console.log("Transaction Hash = ",txt.hash);

  const receipt:ContractReceipt = await txt.wait();
  console.log("Receipt = ",receipt);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
