// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {MerkleProof} from '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import "hardhat/console.sol";



contract SampleMerkleRoot is Ownable, ERC721 {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint public constant MAX_SUPPLY = 100;
    uint public constant MAX_WL_TOKENS = 3;
    uint public price = 0.01 ether;

    bytes32 public merkleRoot;

    mapping(address => uint) public tokensMinted;

    constructor(bytes32 merkleRoot_) ERC721("Test Mint", "TEST") {
        merkleRoot = merkleRoot_;
    }

    function mint(uint256 quantity, bytes32[] calldata merkleProof) public {
        bytes32 node = keccak256(abi.encodePacked(msg.sender, quantity));
        require(MerkleProof.verify(merkleProof, merkleRoot, node), 'invalid proof');

        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(msg.sender, _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }
    }

}