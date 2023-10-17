import { TokenboundClient} from "@tokenbound/sdk";

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
    console.log("test = ", chainId);
    const tokenboundClient = new TokenboundClient({ walletClient, chainId });
    console.log("token bound client = ", tokenboundClient); 
    
    const account = await tokenboundClient.createAccount({
        tokenContract: contractAddress as `0x${string}`,
        tokenId: tokenId,
    })
    
    return String(account);
}