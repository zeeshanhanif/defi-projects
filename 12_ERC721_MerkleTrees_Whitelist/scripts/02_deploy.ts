import { ethers, run } from 'hardhat';
import { SampleMerkleRoot, SampleMerkleRoot__factory } from '../typechain';
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

async function main() {

    const [owner, addr1, addr2] = await ethers.getSigners();

    const {proofs, root} = await generateMerkleTree();


    const SampleMerkleRoot: SampleMerkleRoot__factory = await ethers.getContractFactory("SampleMerkleRoot");
    const sampleMerkleRoot:SampleMerkleRoot = await SampleMerkleRoot.deploy(root);

    await sampleMerkleRoot.deployed();

    // Will add this address in address.json so that other scripts can use this address
    console.log("SampleMerkleRoot deployed to:", sampleMerkleRoot.address);
}


async function generateMerkleTree() {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const inputs = [
        {
          address: addr1.address,
          quantity: 1,
        },
        {
          address: addr2.address,
          quantity: 2,
        },
        {
          address: addr3.address,
          quantity: 1,
        },
      ];
      // create leaves from users' address and quantity
      const leaves = inputs.map((x) =>
        ethers.utils.solidityKeccak256(
          ["address", "uint256"],
          [x.address, x.quantity]
        )
      );
      // create a Merkle tree
      const tree = new MerkleTree(leaves, keccak256, { sort: true });
      const root = tree.getHexRoot();    
      const proofs = leaves.map((leaf) => tree.getHexProof(leaf));

      return {
        proofs,
        root,
      };
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
