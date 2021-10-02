// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DemoNFT is ERC721URIStorage, Ownable {

    uint256 public tokenCounter;

    constructor() ERC721("DemoNFT","DFT"){
        tokenCounter = 0;
    }

    function createNFT(address to, string memory tokenURI) public onlyOwner returns(uint256){
        tokenCounter++;
        _safeMint(to,tokenCounter);
        _setTokenURI(tokenCounter,tokenURI);
        return tokenCounter;
    }


}
