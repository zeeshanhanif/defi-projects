// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "lib/erc6551/src/ERC6551Registry.sol";
import "hardhat/console.sol";

contract DemoNFT is ERC721, Ownable {
    using Strings for uint256;

    string public defaultURI = "ipfs://QmXsMLpKjznF3z1KsVm5tNs3E94vj4BFAyAHvD5RTWgQ1J";
    string private baseURI;
    uint256 public totalSupply;

    event Minted(address indexed to);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exists");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(),".json")) : defaultURI;
    }

    function mint() public {
        _safeMint(msg.sender, totalSupply++);
        emit Minted(msg.sender);
    }

}