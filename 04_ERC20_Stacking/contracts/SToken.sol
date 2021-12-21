//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SToken is ERC20 {
    
    constructor() ERC20("Stacked Token","STK") {
        _mint(msg.sender,1000 * 10 ** decimals());
    }
}
