// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ONFT is ERC721  {
  constructor() ERC721("ONFTOpen", "ONFT") {}

  uint256 totalMinted;

  function safeMint(uint256 quantity) public {
    for(uint16 i=0; i<quantity; i++) {
        _safeMint(msg.sender, totalMinted++);
    }
  }
}
