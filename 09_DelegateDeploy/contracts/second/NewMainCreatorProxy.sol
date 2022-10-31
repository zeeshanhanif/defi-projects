// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "hardhat/console.sol";

contract NewMainCreatorProxy is ERC1967Proxy {
    constructor(address _logic, bytes memory _data)
        payable
        ERC1967Proxy(_logic, _data)
    {}

    uint256 age;
    
    function dosomething(uint256 _age) public {
        console.log("NewMainCreatorProxy::dosomething- age = ", _age);
        age = _age;
    }
}


