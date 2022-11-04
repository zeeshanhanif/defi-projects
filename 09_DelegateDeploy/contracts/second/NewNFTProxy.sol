// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.10;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "hardhat/console.sol";

/// @dev Zora NFT Creator Proxy Access Contract
contract NewNFTProxy is ERC1967Proxy {

    event CreatorNameProxy(address creator);

    constructor(address _logic, bytes memory _data)
        payable
        ERC1967Proxy(_logic, _data)
    {
        console.log("NewNFTProxy constructor - msg.sender = ",msg.sender);
        emit CreatorNameProxy(msg.sender);
    }
}