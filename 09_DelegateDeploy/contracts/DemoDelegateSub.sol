// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "hardhat/console.sol";
import "./DemoNormalContract.sol";
import "./DemoNFT.sol";

contract DemoDelegateSub {
    
    uint256 public num;


    constructor() {
        console.log("DemoDelegateSub::constructor");
        console.log("DemoDelegateSub::constructor - msg.sender = ", msg.sender);
    }

    fallback() external payable virtual {
        console.log("DemoDelegateSub::fallback");
        console.log("DemoDelegateSub::fallback - msg.sender = ", msg.sender);
    }

    /**
     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if call data
     * is empty.
     */
    receive() external payable virtual {
        console.log("DemoDelegateSub::receive");
        console.log("DemoDelegateSub::receive - msg.sender = ", msg.sender);
    }

    function doTestDemoDelegateSub(uint256 _num) public {
        console.log("DemoDelegateSub::doTestDemoDelegateSub - num = ", _num);
        console.log("DemoDelegateSub::doTestDemoDelegateSub - msg.sender = ", msg.sender);
        num = _num;
        //DemoNormalContract dm = new DemoNormalContract();
        DemoNFT dm = new DemoNFT("AAA", "BBB");
        console.log("DemoDelegateSub::doTestDemoDelegateSub - after contract creation");
        console.log("DemoDelegateSub::doTestDemoDelegateSub - address = ",address(dm));
    }
}


