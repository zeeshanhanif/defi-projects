// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "hardhat/console.sol";

contract MyContractV1 is Initializable {

    uint256 private value;
    address private _admin;

    function initialize(address admin) public initializer {
        _admin = admin;
        console.log("MyContractV1::initialize-admin = ", admin);
        console.log("MyContractV1::initialize-msg.sender = ", msg.sender);
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {
        console.log("MyContractV1::constructor-msg.sender = ", msg.sender);
    }

    function setValue(uint256 _value) public {
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    } 
}