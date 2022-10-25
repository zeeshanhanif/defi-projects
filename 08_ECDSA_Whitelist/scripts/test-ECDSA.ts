import { ethers, run } from 'hardhat';
import { SampleECDSA, SampleECDSA__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const SampleECDSA:SampleECDSA__factory = await ethers.getContractFactory("SampleECDSA");
  const sampleECDSA:SampleECDSA = await SampleECDSA.deploy(owner.address);
  await sampleECDSA.deployed();

  const timestamp = Date.now();

  // STEP 1:
  // building hash has to come from system address
  // 32 bytes of data
  let messageHash = ethers.utils.solidityKeccak256(
    ["address"],
    [addr1.address]
  );
  // STEP 2: 32 bytes of data in Uint8Array
  let messageHashBinary = ethers.utils.arrayify(messageHash);

  // STEP 3: To sign the 32 bytes of data, make sure you pass in the data
  let signature1 = await owner.signMessage(messageHashBinary);
  console.log("signature 1 - normal message = ",signature1);

  console.log("Owner address = ",owner.address);
  console.log("Addr1 address = ",addr1.address);
  const bytesOfSenderAddress = await sampleECDSA.connect(addr1).testBytesReturn();
  const signerAddress = await sampleECDSA.connect(addr1).testSignerRecovery(signature1);

  console.log("bytesOfSenderAddress = ",bytesOfSenderAddress);
  console.log("signerAddress = ",signerAddress);

  // STEP 4: Fire off the transaction with the adminWallet signed data
  const txt1 = await sampleECDSA.connect(addr1).whitelistMint(1,signature1, {value:ethers.utils.parseEther("0.1")});
  // This below statement will give error because addr2 is not included in signature
  //const txt1 = await sampleECDSA.connect(addr2).whitelistMint(1,signature1, {value:ethers.utils.parseEther("0.1")});
  console.log("txt1 hash = ",txt1.hash);

  const receipt = await txt1.wait();
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
