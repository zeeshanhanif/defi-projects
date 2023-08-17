import { ethers, network } from 'hardhat';
import { MockOperator, MockOperator__factory, SampleFilterNFT, SampleFilterNFT__factory} from '../typechain';
const addresses = require("./address.json");

async function main() {

    const [owner, addr1, addr2,addr3] = await ethers.getSigners();
    console.log("Network = ",network.name);

    const SampleFilterNFT: SampleFilterNFT__factory = await ethers.getContractFactory("SampleFilterNFT");
    const sampleFilterNFT:SampleFilterNFT = await SampleFilterNFT.attach(addresses[network.name].sampleFilterNFT);
    console.log("SampleFilterNFT Address: ", sampleFilterNFT.address);

    const MockOperator: MockOperator__factory = await ethers.getContractFactory("MockOperator");
    const mockOperator:MockOperator = await MockOperator.attach(addresses[network.name].mockOperator);
    console.log("MockOperator Address: ", mockOperator.address);
/*
    const sampleFilterNFTApprovalTx = await sampleFilterNFT.approve(mockOperator.address,0);
    console.log("sampleFilterNFT.approve  txt.hash = ",sampleFilterNFTApprovalTx.hash);
    const sampleFilterNFTApprovalTxReceipt = await sampleFilterNFTApprovalTx.wait();
*/
    const txt1 = await mockOperator.transferToNewUserAgain(owner.address, "0xa5360b49C2cb74C1FBC3BB80A1Be84d3d993B3e9",0);
    console.log("mockOperator.transferToNewUser hash ",txt1.hash);
    const txtReceipt1 = txt1.wait();

}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
