// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.10;

import {ERC721AUpgradeable} from "erc721a-upgradeable/contracts/ERC721AUpgradeable.sol";
import {IERC721AUpgradeable} from "erc721a-upgradeable/contracts/IERC721AUpgradeable.sol";
import {IERC2981Upgradeable, IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {MerkleProofUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {OwnableSkeleton} from "./OwnableSkeleton.sol";
import "hardhat/console.sol";

contract NewNFT is
    ERC721AUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable,
    AccessControlUpgradeable,
    OwnableSkeleton {

    error Access_OnlyAdmin();
    error Admin_InvalidUpgradeAddress(address proposedAddress);

    modifier onlyAdmin() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, _msgSender())) {
            revert Access_OnlyAdmin();
        }

        _;
    }

    event CreatorName1(address creator);
    
    constructor() initializer {
        console.log("NewNFT constructor - msg.sender = ",msg.sender);
        emit CreatorName1(msg.sender);
    }

    /// @notice ERC165 supports interface
    /// @param interfaceId interface id to check if supported
    function supportsInterface(bytes4 interfaceId) public view override (
            ERC721AUpgradeable,
            AccessControlUpgradeable
        ) returns (bool) {
        return
            super.supportsInterface(interfaceId) ||
            type(IERC2981Upgradeable).interfaceId == interfaceId;
    }

    /// @notice Connects this contract to the factory upgrade gate
    /// @param newImplementation proposed new upgrade implementation
    /// @dev Only can be called by admin
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyAdmin
    {
       
    }

    function initialize(
        string memory _contractName,
        string memory _contractSymbol,
        address _initialOwner,
        address payable _fundsRecipient,
        uint64 _editionSize,
        uint16 _royaltyBPS
    ) public initializer {

        console.log("NewNFT initialize - msg.sender = ",msg.sender);
        // Setup ERC721A
        __ERC721A_init(_contractName, _contractSymbol);
        // Setup access control
        __AccessControl_init();
        // Setup re-entracy guard
        __ReentrancyGuard_init();
        // Setup the owner role
        _setupRole(DEFAULT_ADMIN_ROLE, _initialOwner);
        // Set ownership to original sender of contract call
        _setOwner(_initialOwner);
    }
}