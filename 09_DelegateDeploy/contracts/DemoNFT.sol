// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract DemoNFT is Ownable, ERC721 {
    using Strings for uint256;

    string public baseURI;
    string public defaultURI;
    uint256 public totalMinted;
    uint256 price;

    event CreatedNew(address userAddress);
    constructor(string memory _name, string memory _symbol, address userAddress) ERC721(_name,_symbol){
        console.log("DemoNFT constructor - msg.sender = ",msg.sender);
        transferOwnership(userAddress);
        emit CreatedNew(msg.sender);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exists");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(),".json")) : defaultURI;
    }

    function mint(uint256 tokenId) public payable {
        require(!_exists(tokenId), "Token already minted");
        require(msg.value == price, "Insufficient Funds Sent");
        _safeMint(msg.sender, tokenId);        
        totalMinted++;
    }
}