// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./SampleFilterNFT.sol";
import "hardhat/console.sol";


contract MockOperator is Ownable {

    mapping(address => uint256) userTokens;
    SampleFilterNFT sampleFilterNFT;
    event TransferToNewUserCalled(address from, address to, uint256 tokenId);

    constructor(address _sampleNFTAddress) {
        sampleFilterNFT = SampleFilterNFT(_sampleNFTAddress);
    }
    
    function transferToNewUser(address from, address to, uint256 tokenId) public {
        //sampleFilterNFT.transferFrom(from, to, tokenId);
        emit TransferToNewUserCalled(from, to, tokenId);
    }

    function transferToNewUserAgain(address from, address to, uint256 tokenId) public {
        sampleFilterNFT.transferFrom(from, to, tokenId);
        emit TransferToNewUserCalled(from, to, tokenId);
    }


}