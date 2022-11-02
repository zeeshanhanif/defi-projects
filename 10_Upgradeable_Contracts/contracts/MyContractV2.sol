// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "hardhat/console.sol";

contract MyContractV2 {

    uint256 private value;
    string private name;

    function setValue(uint256 _value) public {
        value = _value + 10;
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public view returns (string memory) {
        return name;
    } 

}