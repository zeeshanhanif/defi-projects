// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./DemoNFT.sol";

contract DemoDelegate {
    

    uint256 public num;
    address public mainCreatorAddress;

    constructor(address _mainCreatorAddress) {
        mainCreatorAddress = _mainCreatorAddress;
    }

    fallback() external payable virtual {
        console.log("DemoDelegate::fallback");
        console.log("DemoDelegate::fallback - msg.sender = ", msg.sender);
    }

    /**
     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if call data
     * is empty.
     */
    receive() external payable virtual {
        console.log("DemoDelegate::receive");
        console.log("DemoDelegate::receive - msg.sender = ", msg.sender);
    }

    function doWork(uint256 _num) public {
        console.log("DemoDelegate::doWork - num = ", _num);
        console.log("DemoDelegate::doWork - msg.sender = ", msg.sender);

        DemoNFT dm = new DemoNFT("AAA", "BBB");
        /*
        (bool success, bytes memory data) = mainCreatorAddress.delegatecall(
            abi.encodeWithSignature("doTestDemoDelegateSub(uint256)",_num)
        );
        console.log("DemoDelegate::doWork - delegatecall success = ", success);
        */
        console.log("DemoDelegate::doWork - after DemoNFT create", address(dm));
        num = _num;
    }
}


