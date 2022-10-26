// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./DemoNFT.sol";
import "./DelegatorContract.sol";
import "hardhat/console.sol";

contract MainDeployer is Ownable {
    using Strings for uint256;

    mapping(address=>address) contractOwner;
    mapping(address=>address[]) usersContracts;
    event ContractCreated(address contractAddress, address userAddress);

    function demoCallTest(address contractAddress) public {
        (bool success, bytes memory data) = contractAddress.delegatecall(abi.encodeWithSignature("doSomething(uint256)", 12));
        console.log("CallFunctionDemo:: callerFunctionTestDelegate success = ",success);
    }

    function doCallDeploy(address contarctAddress) public {
        console.log("Hello in doCallDeploy");
        //address _contract = address(this);
        console.log("doCallDeploy contract address = ",contarctAddress);
        /*
        (bool success, bytes memory data) = contarctAddress.delegatecall(
            abi.encodeWithSignature("doSomething(uint256,uint256)",4,6)
        );*/
        
        (bool success, bytes memory data) = contarctAddress.delegatecall(
            abi.encodeWithSignature("deployContract(uint256)",5)
        );
        console.log("doCallDeploy after call success = ",success);
        console.log("message sender in doCallDeploy = ",msg.sender);
        //console.log("doCallDeploy after call data= ",data);
    }

    function testDeploy() public {
        console.log("Hello in testDeploy");
        DemoNFT demoNFT = new DemoNFT("ABC", "XYZ", msg.sender);
        console.log("testDeploy msg.sender = ",address(demoNFT));
        emit ContractCreated(address(demoNFT), msg.sender);
        console.log("Hello in testDeploy after create new");
    }

    /*
    function deployContract() public {
        console.log("Hello in deployContract");
        //DemoNFT demoNFT = new DemoNFT(_name, _symbol);
        DemoNFT demoNFT = new DemoNFT("ABC", "XYZ");
        console.log("Hello in deployContract after create new");
        address contractAddress = address(demoNFT);
        console.log("Hello in deployContract address = ", contractAddress);
        contractOwner[contractAddress] = msg.sender;
        console.log("after storing in contractOwner");
        usersContracts[msg.sender].push(contractAddress);
        console.log("after storing in usersContracts");
        console.log("message sender in deployContract = ",msg.sender);
    }
    */
    function getNFTContractOwner(address _nftContractAddress) public view returns(address) {
        return contractOwner[_nftContractAddress];
    }

    function getUsersNFTContracts(address _ownerAddress) public view returns(address[] memory){
        return usersContracts[_ownerAddress];
    }

}