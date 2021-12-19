//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Stacking {
    

    IERC20 public immutable stackingToken;

    constructor(address _stakingToken) {
        require(_stakingToken != address(0), "Zero address provided");
        stackingToken = IERC20(_stakingToken);
    }


    function stack(uint256 _amount) public {
        stackingToken.transferFrom(msg.sender,address(this),_amount);
    }



}
