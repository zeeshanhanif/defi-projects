// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ShapeNFT is ERC721URIStorage, Ownable {

    uint256 public tokenCounter;

    struct Shape{
        string name;
        string color;
    }

    Shape[] public shapes;

    constructor() ERC721("ShapeNFT","SNFT"){
        tokenCounter = 0;
    }

    function createNFT(address to, string memory name, string memory color, string memory tokenURI) public onlyOwner returns(uint256){
        uint256 tokenId = tokenCounter;
        shapes.push(Shape(name,color));
        _safeMint(to,tokenId);
        _setTokenURI(tokenId,tokenURI);
        tokenCounter++;
        return tokenId;
    }

    function getShape(uint256 tokenId)public view returns(string memory, string memory){
        return (
            shapes[tokenId].name,
            shapes[tokenId].color
        );
    }



}
