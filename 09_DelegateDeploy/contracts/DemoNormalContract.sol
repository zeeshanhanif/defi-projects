// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "hardhat/console.sol";

contract DemoNormalContract {
    
    uint256 public num;


    constructor() {
        console.log("DemoNormalContract::constructor");
        console.log("DemoNormalContract::constructor - msg.sender = ", msg.sender);
    }

    fallback() external payable virtual {
        console.log("DemoNormalContract::fallback");
        console.log("DemoNormalContract::fallback - msg.sender = ", msg.sender);
    }

    /**
     * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if call data
     * is empty.
     */
    receive() external payable virtual {
        console.log("DemoNormalContract::receive");
        console.log("DemoNormalContract::receive - msg.sender = ", msg.sender);
    }

    function setNum(uint256 _num) public {
        console.log("DemoNormalContract::setNum - num = ", _num);
        console.log("DemoNormalContract::setNum - msg.sender = ", msg.sender);
        num = _num;
    }

    function getNum() public returns(uint256) {
        console.log("DemoNormalContract::getNum - num = ", num);
        console.log("DemoNormalContract::getNum - msg.sender = ", msg.sender);
        return num;
    }
}


