import { BigNumber, ContractReceipt, ContractTransaction } from 'ethers';
import { ethers, run } from 'hardhat';
import { ONFT__factory } from '../typechain/factories/ONFT__factory';
import { ONFT } from '../typechain/ONFT';

async function main() {

  const ONFT:ONFT__factory = await ethers.getContractFactory("ONFT");
  const onft:ONFT = await ONFT.attach("0x8BF8873176fE06c9218279b193b2b5E6b200A503");
  await onft.deployed();

  console.log("ONFT Address: ", onft.address);

  const numberOfTokens = BigNumber.from("4");
  const txt:ContractTransaction = await onft.safeMint(numberOfTokens);
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
