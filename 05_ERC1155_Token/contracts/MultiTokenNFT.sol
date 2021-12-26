// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MultiTokenNFT  is ERC1155, ERC1155Supply {

    uint256 public constant TRIANGLE = 0;
    uint256 public constant PENTAGON = 1;
    uint256 public constant HEXAGON = 2;
    uint256 public constant DIAMOND = 3;
    uint256 public constant ARC = 4;
    uint256 public constant STAR = 5;

    uint256 maxSupplyEachToken = 10;

    // Typical URI "https://game.example/api/item/{id}.json"
    constructor(string memory uri) ERC1155(uri){
    }

    modifier idExists(uint256 id){
        require(id >= 0 && id <= 5, "Id Not Exists");
        _;
    }

    function mintToken(uint256 id, amount) public idExists {
        uint256 _tokenSupply = totalSupply(id); 
        //require(total)
    }
}
