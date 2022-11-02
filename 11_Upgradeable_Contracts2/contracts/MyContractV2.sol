// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "hardhat/console.sol";

contract MyContractV2 is Initializable {

    uint256 private value;
    address private _admin;
    string private name;

    function initialize(address admin) public initializer {
        _admin = admin;
        console.log("MyContractV2::initialize-admin = ", admin);
        console.log("MyContractV2::initialize-msg.sender = ", msg.sender);
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {
        console.log("MyContractV2::constructor-msg.sender = ", msg.sender);
    }

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