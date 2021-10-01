// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BasicNFT is ERC721, Ownable{
    uint256 public tokenCounter;

    constructor() ERC721("BasicNFT","BFT"){
        tokenCounter = 0;
    }

    function createNFT(address to) public onlyOwner returns(uint256){
        tokenCounter++;
        _safeMint(to,tokenCounter);
        return tokenCounter;
    }
}