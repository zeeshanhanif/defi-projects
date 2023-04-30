import { ethers, run } from 'hardhat';
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";


async function main() {

  const [owner, addr1, addr2] = await ethers.getSigners();

  /*
  const inputs = [
    {
      address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      quantity: 1,
    },
    {
      address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      quantity: 2,
    },
    {
      address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
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
  */
  const inputs = [
    {
      address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    },
    {
      address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    },
    {
      address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    },
  ];
  // create leaves from users' address and quantity
  const leaves = inputs.map((x) =>
    ethers.utils.solidityKeccak256(
      ["address"],
      [x.address]
    )
  );

  // create a Merkle tree
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  console.log(tree.toString());
  console.log("----- 1");
  console.log(tree);
  console.log("----- 2");
  console.log(tree.getHexRoot());
  console.log("---3");
  const proofs = leaves.map(leave=> tree.getHexProof(leave))
  console.log(proofs);
  
  //console.log(tree.getProofs());
  //console.log("---4");
  //console.log(tree.getHexProof(leaves[0]));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
