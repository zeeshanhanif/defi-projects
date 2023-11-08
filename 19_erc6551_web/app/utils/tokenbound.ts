import { TokenboundClient} from "@tokenbound/sdk";
import { erc721ABI, useWalletClient } from "wagmi";
import {  readContract, writeContract, waitForTransaction } from '@wagmi/core'
import { toast } from "react-toastify";

export const getTokenboundClient = (chainId: number) => {

    //const tokenboundClient = new TokenboundClient({ signer:owner, chainId: 80001 });  
    //return tokenboundClient;
};

export const getAccount = (walletClient:any, chainId: number, tokenContract:string, tokenId:string):string=> {
    const tokenboundClient = new TokenboundClient({ walletClient, chainId }); 
    console.log("obj here = ", tokenboundClient);
    const accountAddress = tokenboundClient.getAccount({
        tokenContract:tokenContract as '0x{string}',
        tokenId: tokenId
    })
    console.log("Account address =", accountAddress);
    return String(accountAddress);
}

export const getIsAccountDeployed = async (walletClient:any, chainId: number, accountAddress:string ):Promise<boolean>=> {
    
    const tokenboundClient = new TokenboundClient({ walletClient, chainId }); 
    const isAccountDeployed = await tokenboundClient.checkAccountDeployment({
        accountAddress: accountAddress as `0x${string}`,
      })

    console.log("Account deployed =", isAccountDeployed);
    return isAccountDeployed;
}

export const deployAccount = async (walletClient:any, chainId: number, contractAddress:string, tokenId:string ):Promise<string> =>{
    const tokenboundClient = new TokenboundClient({ walletClient, chainId });
    
    const account = await tokenboundClient.createAccount({
        tokenContract: contractAddress as `0x${string}`,
        tokenId: tokenId,
    })
    
    return String(account);
}

export const transferNFTFromTBA = async(walletClient:any, chainId: number | undefined, to:string | undefined, accountAddress:string | undefined, contractAddress:string | undefined, tokenId:string| undefined) => {
    if(chainId && chainId>0 && to && tokenId) {
        const tokenboundClient = new TokenboundClient({ walletClient, chainId });

        const transferNFT = await tokenboundClient.transferNFT({
            account: accountAddress as `0x${string}`,
            tokenType: "ERC721",
            tokenContract: contractAddress  as `0x${string}`,
            tokenId: tokenId,
            recipientAddress: to as `0x${string}`,
        });
        console.log("transferNFT = ",transferNFT);
    }
}

export const transferNFTFromWallet = async( to: string | undefined, from: `0x${string}` | undefined, contractAddress:string | undefined, tokenId:string| undefined) => {
    if(to && tokenId && contractAddress && from) {

        const { hash } = await writeContract({
                address: contractAddress as `0x${string}`,
                abi: erc721ABI,
                functionName: "safeTransferFrom",
                args:[from, to as `0x${string}`,  BigInt(tokenId)]
        })

        console.log("Transaction Hash safeTransferFrom = ",hash);
        toast.info("Transaction Hash: "+hash, {
            position: toast.POSITION.TOP_CENTER
        });
        const data = await waitForTransaction({
            hash: hash,
        })
        console.log("Wait Result = ",data);
        console.log("Transfer Done");
        if(data.status == "success") {
            toast.success("Transfer Done", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            toast.success("Unknown Error", {
                position: toast.POSITION.TOP_CENTER
            });
        }

        
    }
}