import { BigNumber, ContractReceipt, ContractTransaction } from 'ethers';
import { ethers, run } from 'hardhat';
import { ANFT, ANFT__factory } from '../typechain';

async function main() {

  const ANFT:ANFT__factory = await ethers.getContractFactory("ANFT");
  const anft:ANFT = await ANFT.attach("0x80157a77260C8677F64648561bD1ab71474a79d0");
  await anft.deployed();

  console.log("ANFT Address: ", anft.address);

  const numberOfTokens = BigNumber.from("4");
  const txt:ContractTransaction = await anft.mint(numberOfTokens);
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
