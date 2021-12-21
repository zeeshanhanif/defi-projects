//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Stacking {
    
    using SafeERC20 for IERC20;
    IERC20 public immutable stackingToken;

    event Stacked(address account, uint256 amount);
    event UnStacked(address account, uint256 amount);

    struct UserStack {
        uint256 totalUserBalance;
        uint256 profitClaim;
    }

    struct Epoch {
        uint256 length; 
        uint256 number;
        uint256 end;
        uint256 distribute;
    }

    uint256 rewardRate;
    Epoch epoch;

    mapping (address=>UserStack) usersStack;

    constructor(address _stakingToken, uint256 _epochLength, uint256 _firstEpochNumber, uint256 _firstEpochTime) {
        require(_stakingToken != address(0), "Zero address provided");
        stackingToken = IERC20(_stakingToken);
        epoch = Epoch(_epochLength, _firstEpochNumber, _firstEpochTime, 0);
    }

    function stack(uint256 _amount) public {
        require(_amount > 0, "Can Not Stake 0");
        distributeReward();
        stackingToken.safeTransferFrom(msg.sender,address(this),_amount);
        UserStack memory _userStack = usersStack[msg.sender];
        _userStack.totalUserBalance += _amount;
        emit Stacked(msg.sender, _amount);
    }

    function unStack(uint256 _amount) public {
        UserStack memory _userStack = usersStack[msg.sender];
        require(_userStack.totalUserBalance <= _amount,"Not enough Balance");
        distributeReward();
        stackingToken.safeTransfer(msg.sender, _amount);
        emit UnStacked(msg.sender, _amount);
    }

    function distributeReward() public {
        if(epoch.end <= block.timestamp) {
            epoch.end = epoch.end + epoch.length;
            epoch.number++;

            
        }
    }

    funciton calculateReward() internal {

    }


    function setRewardRate(uint256 _rewardRate) public {
        rewardRate = _rewardRate;
    }
}
