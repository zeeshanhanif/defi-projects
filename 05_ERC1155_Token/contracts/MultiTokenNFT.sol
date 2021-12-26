// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MultiTokenNFT  is ERC1155Supply {

    uint256 public constant TRIANGLE = 0;
    uint256 public constant PENTAGON = 1;
    uint256 public constant HEXAGON = 2;
    uint256 public constant DIAMOND = 3;
    uint256 public constant ARC = 4;
    uint256 public constant STAR = 5;

    uint256 maxSupplyEachToken = 10;

    event TokenMinted(address account, uint256 tokenId, uint256 amount);

    // Typical URI "https://game.example/api/item/{id}.json"
    constructor(string memory _uri) ERC1155(_uri){
    }

    modifier idExists(uint256 id){
        require(id >= 0 && id <= 5, "Id Not Exists");
        _;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(exists(tokenId), "Token does not exists");
        string memory _tokenURI = super.uri(tokenId);
        return bytes(_tokenURI).length > 0 ? string(abi.encodePacked(_tokenURI, tokenId,".json")) : "";
    }

    function mintToken(uint256 _id, uint256 _amount) public idExists(_id) {
        uint256 _tokenSupply = totalSupply(_id); 
        require(_tokenSupply + _amount <= maxSupplyEachToken, "Not enough supply");
        _mint(msg.sender, _id, _amount, "");
        emit TokenMinted(msg.sender, _id, _amount);
    }
}
