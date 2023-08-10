// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "operator-filter-registry/src/DefaultOperatorFilterer.sol";
import {ERC2981} from "@openzeppelin/contracts/token/common/ERC2981.sol";
import "hardhat/console.sol";

contract SampleFilterNFT is Ownable, ERC721, DefaultOperatorFilterer, ERC2981 {

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint public constant MAX_SUPPLY = 100;
    uint public price = 0.001 ether;

    bytes32 public merkleRoot;

    mapping(address => uint) public tokensMinted;

    constructor() ERC721("TestMM", "TTM") {
        _setDefaultRoyalty(owner(), 500);
    }

    function mint(address to, uint256 quantity) public {
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(to, _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC2981)
        returns (bool)
    {
        // Supports the following `interfaceId`s:
        // - IERC165: 0x01ffc9a7
        // - IERC721: 0x80ac58cd
        // - IERC721Metadata: 0x5b5e139f
        // - IERC2981: 0x2a55205a
        return
            ERC721.supportsInterface(interfaceId) ||
            ERC2981.supportsInterface(interfaceId);
    }

    function setDefaultRoyalty(address receiver, uint96 feeNumerator) public onlyOwner {
        _setDefaultRoyalty(receiver, feeNumerator);
    }


    // Operator Filtering

    function setApprovalForAll(address operator, bool approved) 
        public override onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    function approve(address operator, uint256 tokenId) 
        public override onlyAllowedOperatorApproval(operator) {
        super.approve(operator, tokenId);
    }

    function transferFrom(address from, address to,uint256 tokenId) 
        public override onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) 
        public override onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) 
        public override onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId, data);
    }

}