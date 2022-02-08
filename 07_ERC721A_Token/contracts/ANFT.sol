// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "erc721a/contracts/ERC721A.sol";

contract ANFT is ERC721A  {
    constructor() ERC721A("ANFTDemo", "ANFT") {}

  function mint(uint256 quantity) external payable {
    // _safeMint's second argument now takes in a quantity, not a tokenId.
    _safeMint(msg.sender, quantity);
  }
}
