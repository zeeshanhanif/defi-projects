//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Stacking {
    
    using SafeERC20 for IERC20;
    IERC20 public immutable stackingToken;

    struct Claim {
        uint256 balance;
        uint256 time;
    }

    mapping (address=> Claim) userClaims;
    uint256 public warmupPeriod;


    event WarmupSet(uint256 warmup);


    constructor(address _stakingToken) {
        require(_stakingToken != address(0), "Zero address provided");
        stackingToken = IERC20(_stakingToken);
    }


    function stack(uint256 _amount) public {
        stackingToken.safeTransferFrom(msg.sender,address(this),_amount);
        userClaims[msg.sender] = Claim({
            balance: _amount,
            time: block.timestamp
        });
    }


    function setWarmupLength(uint256 _warmupPeriod) public {
        warmupPeriod = _warmupPeriod;
        emit WarmupSet(_warmupPeriod);
    }



}
