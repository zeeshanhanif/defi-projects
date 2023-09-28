// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

import "lib/erc6551/src/interfaces/IERC6551Account.sol";
import "lib/erc6551/src/interfaces/IERC6551Executable.sol";
import "hardhat/console.sol";

error OwnershipCycle();

contract MyERC6551Account is IERC165, IERC1271, IERC721Receiver, IERC6551Account, IERC6551Executable {
    uint256 public state;

    receive() external payable {}

    event InitWorks(address sender);

    function initialize() public {
        emit InitWorks(msg.sender);
    }

    function execute(
        address to,
        uint256 value,
        bytes calldata data,
        uint256 operation
    ) external payable returns (bytes memory result) {
        //console.log("msg.sender = ",msg.sender);
        //console.log("owner = ",owner());
        require(_isValidSigner(msg.sender), "Invalid signer");
        require(operation == 0, "Only call operations are supported");

        ++state;

        bool success;
        (success, result) = to.call{value: value}(data);

        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function isValidSigner(address signer, bytes calldata) external view returns (bytes4) {
        if (_isValidSigner(signer)) {
            return IERC6551Account.isValidSigner.selector;
        }

        return bytes4(0);
    }

    function isValidSignature(bytes32 hash, bytes memory signature)
        external
        view
        returns (bytes4 magicValue)
    {
        bool isValid = SignatureChecker.isValidSignatureNow(owner(), hash, signature);

        if (isValid) {
            return IERC1271.isValidSignature.selector;
        }

        return "";
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return (interfaceId == type(IERC165).interfaceId ||
            interfaceId == type(IERC6551Account).interfaceId ||
            interfaceId == type(IERC6551Executable).interfaceId);
    }

    function token()
        public
        view
        returns (
            uint256,
            address,
            uint256
        )
    {
        bytes memory footer = new bytes(0x60);

        assembly {
            extcodecopy(address(), add(footer, 0x20), 0x4d, 0x60)
        }

        return abi.decode(footer, (uint256, address, uint256));
    }

    function owner() public view returns (address) {
        (uint256 chainId, address tokenContract, uint256 tokenId) = token();
        if (chainId != block.chainid) return address(0);

        return IERC721(tokenContract).ownerOf(tokenId);
    }

    function _isValidSigner(address signer) internal view returns (bool) {
        return signer == owner();
    }

        /// @dev Allows ERC-721 tokens to be received so long as they do not cause an ownership cycle.
    /// This function can be overriden.
    function onERC721Received(
        address,
        address,
        uint256 receivedTokenId,
        bytes memory
    ) public view override returns (bytes4) {

        (uint256 chainId, address tokenContract, uint256 tokenId) = token();

        if (
            chainId == block.chainid &&
            tokenContract == msg.sender &&
            tokenId == receivedTokenId
        ) revert OwnershipCycle();

        return this.onERC721Received.selector;
    }
}
