// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.10;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {ClonesUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import "hardhat/console.sol";
import "./NewNFTProxy.sol";
import "./NewNFT.sol";


contract NewMainCreator is OwnableUpgradeable, UUPSUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    uint256 public age = 12;

    CountersUpgradeable.Counter private atContract;

    address public immutable newNFTImplementation;
    //address public newNFTImplementation;

    event ContractInfo(address newNFT, address newNFTProxy);

    constructor(address _newNFTImplementation) {
        newNFTImplementation = _newNFTImplementation;
        console.log("NewMainCreator::constructor - _newNFTImplementation = ", _newNFTImplementation);
        //console.log("NewMainCreator::constructor - newNFTImplementation = ", newNFTImplementation);
        console.log("NewMainCreator::constructor - _newNFTImplementation.code.length = ", _newNFTImplementation.code.length);
    }
    /// @dev Initializes the proxy contract
    function initialize() external initializer {
        console.log("NewMainCreator::initialize - newNFTImplementation = ", newNFTImplementation);
        __Ownable_init();
        __UUPSUpgradeable_init();
        console.log("NewMainCreator::initialize - newNFTImplementation = ", newNFTImplementation);
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
        console.log("NewMainCreator::setData - newNFTImplementation = ", newNFTImplementation);
        
        uint256 newId = atContract.current();
        address newMediaContract = ClonesUpgradeable.cloneDeterministic(
            newNFTImplementation,
            bytes32(abi.encodePacked(newId))
        );
        emit ContractInfo(address(newNFTImplementation), address(newMediaContract));
    /*
        NewNFT(newMediaContract).initialize({
            _contractName:"AAAA",
            _contractSymbol: "BBBB",
            _initialOwner:_owner,
            _fundsRecipient:payable(_owner),
            _editionSize:20,
            _royaltyBPS:20
        });
        atContract.increment();
        */
        /*
        age = _age;
        NewNFTProxy newNFTProxy = new NewNFTProxy(newNFTImplementation,"");
        //NewNFT newNFT = new NewNFT();
        //NewNFTProxy newNFTProxy = new NewNFTProxy(address(newNFT),"");
        console.log("NewMainCreator::setData - after contract creation = ", address(newNFTProxy));
        
        address payable newNFTAddress = payable(address(newNFTProxy));

        console.log("NewMainCreator::setData - after converting address = ", newNFTAddress);
        //emit ContractInfo(address(newNFT), address(newNFTProxy));
        emit ContractInfo(address(newNFTImplementation), address(newNFTProxy));
        
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


