// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./DemoNFT.sol";
import "hardhat/console.sol";

contract DelegatorContract is Ownable {
    using Strings for uint256;

    mapping(address=>address) contractOwner;
    mapping(address=>address[]) usersContracts;

    function doSomething(uint256 num1, uint256 num2) public {
        console.log("Hello in doSomething");
        console.log("sum in doSomething num1 = ",num1);
        console.log("sum in doSomething num2 = ",num2);
        console.log("message sender in doSomething = ",msg.sender);
    }

    function deployContract(uint256 num1) public {
        console.log("Hello in deployContract 1");
        //DemoNFT demoNFT = new DemoNFT(_name, _symbol);

        contractOwner[address(this)] = msg.sender;
        console.log("Hello in deployContract 2");
        usersContracts[msg.sender].push(address(this));
        console.log("Hello in deployContract 3");
        //DemoNFT demoNFT = new DemoNFT("ABC", "XYZ");
        console.log("Hello in deployContract 4");
        /*
        DemoNFT demoNFT = new DemoNFT("ABC", "XYZ");
        console.log("Hello in deployContract after create new");
        address contractAddress = address(demoNFT);
        console.log("Hello in deployContract address = ", contractAddress);
        contractOwner[contractAddress] = msg.sender;
        console.log("after storing in contractOwner");
        usersContracts[msg.sender].push(contractAddress);
        console.log("after storing in usersContracts");
        */
        console.log("message sender in deployContract = ",msg.sender);
    }

}