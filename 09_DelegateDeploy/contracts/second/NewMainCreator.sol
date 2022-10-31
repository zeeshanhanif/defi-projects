// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "hardhat/console.sol";
import "./NewNFTProxy.sol";
import "./NewNFT.sol";


contract NewMainCreator is OwnableUpgradeable, UUPSUpgradeable {

    uint256 public age = 12;

    address public newNFTImplementation;

    event ContractInfo(address newNFT, address newNFTProxy);

    constructor(address _newNFTImplementation) {
        newNFTImplementation = _newNFTImplementation;
        console.log("NewMainCreator::constructor - _newNFTImplementation = ", _newNFTImplementation);
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

    function setData(uint256 _age, address _owner) public {
        console.log("NewMainCreator::setData - _age = ", _age);
        console.log("NewMainCreator::setData - msg.sender = ", msg.sender);
        //DemoNFT dm = new DemoNFT("AAA", "BBB");
        age = _age;
        //NewNFTProxy newNFTProxy = new NewNFTProxy(newNFTImplementation,"");
        NewNFT newNFT = new NewNFT();
        NewNFTProxy newNFTProxy = new NewNFTProxy(address(newNFT),"");
        console.log("NewMainCreator::setData - after contract creation = ", address(newNFTProxy));
        
        address payable newNFTAddress = payable(address(newNFTProxy));

        console.log("NewMainCreator::setData - after converting address = ", newNFTAddress);
        emit ContractInfo(address(newNFT), address(newNFTProxy));
        /*
        NewNFT(newNFTAddress).initialize(
            "AAAA",
            "BBBB",
            _owner,
            payable(_owner),
            20,
            20
        );
        */
        console.log("NewMainCreator::setData - after NewNFT(newNFTAddress).initialize");
    }

    function getData() public view returns(uint256) {
        return age;
    }

}


