// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";

//https://xtremetom.medium.com/verifying-solidity-signatures-4898d003846b
contract SampleECDSA is Ownable, ERC721 {

    using ECDSA for bytes32;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint public constant MAX_SUPPLY = 100;
    uint public constant MAX_WL_TOKENS = 3;
    uint public constant COST_PER_TOKEN = 0.1 ether;

    address public _signerAddress;

    mapping(address => uint) public tokensMinted;

    constructor(
        address signerAddress_
    ) ERC721("Test Mint", "TEST") {
        _signerAddress = signerAddress_;
    }
    
    function whitelistMint(uint256 numTokens, bytes calldata signature) public payable {
        require(MAX_SUPPLY >= _tokenIdCounter.current() + numTokens, "Minted tokens would exceed supply.");
        require(MAX_WL_TOKENS >= tokensMinted[msg.sender] + numTokens, "Claim limit exceeded.");
        require(msg.value == numTokens * COST_PER_TOKEN, "Incorrect Ether amount.");

        bytes32 msgHash = keccak256(abi.encodePacked(msg.sender));
        bytes32 signedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", msgHash));
        require(_signerAddress == signedHash.recover(signature), "Signer address mismatch.");

        tokensMinted[msg.sender] += numTokens;

        for (uint256 i=0; i<numTokens; i++) {
            _tokenIdCounter.increment();
            _safeMint(msg.sender, _tokenIdCounter.current());
        }
    }

    function testBytesReturn() external view returns (bytes32) {
        return keccak256(abi.encodePacked(msg.sender));
    }

    function testSignerRecovery(bytes calldata signature) external view returns (address) {
        bytes32 msgHash = keccak256(abi.encodePacked(msg.sender));
        bytes32 signedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", msgHash));
        return signedHash.recover(signature);
    }
}