// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract DemoNFT is ERC721, Ownable {
    using Strings for uint256;

    string public defaultURI = "ipfs://QmXsMLpKjznF3z1KsVm5tNs3E94vj4BFAyAHvD5RTWgQ1J";
    string private baseURI; //"https://coral-wasteful-lion-960.mypinata.cloud/ipfs/QmXFnSJYkichQkF2dxuFAvrYaJ4P8hveAifb26auBZE7bC/";
    uint256 public totalSupply;
    uint256 public price = 0.07 ether;
    uint256 public constant MAX_SUPPLY = 50;

    event Minted(address sender, address to);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exists");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(),".json")) : defaultURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string calldata _baseuri) public onlyOwner {
		baseURI = _baseuri;
	}

    function mint(address _to) public {
        require(totalSupply + 1 <= MAX_SUPPLY, "Minting would exceed max supply");
        _safeMint(_to, ++totalSupply);
        emit Minted(msg.sender, _to);
    }

    function mint2() public payable {
        require(price == msg.value, "Incorrect Funds Sent" );
        require(totalSupply + 1 <= MAX_SUPPLY, "Minting would exceed max supply");
        _safeMint(msg.sender, totalSupply++);
        emit Minted(msg.sender, msg.sender);
    }

}