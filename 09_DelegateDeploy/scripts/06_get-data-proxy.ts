import { ethers, run } from 'hardhat';
import { DelegatorContract, DelegatorContract__factory, MainCreator, MainCreatorProxy, MainCreatorProxy__factory, MainCreator__factory, MainDeployer, MainDeployer__factory } from '../typechain';

async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  const MainCreatorProxy:MainCreatorProxy__factory = await ethers.getContractFactory("MainCreatorProxy");
  const mainCreatorProxy:MainCreatorProxy = await MainCreatorProxy.attach("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
  console.log("MainCreatorProxy deployed to:", mainCreatorProxy.address);

  owner.signTransaction()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
