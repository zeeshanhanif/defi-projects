// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "hardhat/console.sol";
import "./DemoNFT.sol";

contract MainCreator is OwnableUpgradeable, UUPSUpgradeable {

    uint256 public age = 12;
    constructor() {

    }
    /// @dev Initializes the proxy contract
    function initialize() external initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    /// @dev Function to determine who is allowed to upgrade this contract.
    /// @param _newImplementation: unused in access check
    function _authorizeUpgrade(address _newImplementation)
        internal
        override
        onlyOwner
    {}

    function setData(uint256 _age) public {
        console.log("MainCreator::setData - _age = ", _age);
        console.log("MainCreator::setData - msg.sender = ", msg.sender);
        DemoNFT dm = new DemoNFT("AAA", "BBB");
        age = _age;
        console.log("MainCreator::setData - after contract creation = ", address(dm));
    }

    function getData() public view returns(uint256) {
        return age;
    }

}


