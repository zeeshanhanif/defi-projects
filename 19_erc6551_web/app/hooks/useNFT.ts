import { BigNumber, Nft, NftTokenType, OwnedNftsResponse } from "alchemy-sdk";
import { getAlchemy } from "../utils/alchemy";
import { CONTRACT_ADDRESS } from "../utils/constants";

export const useNFT = () =>{

}
/*
export const useGetNFTTokenList = async (contractAddress: string, userAddress:string, chainId:number):Promise<OwnedNftsResponse> => {
    console.log("Chain id in get nft list in main = ",chainId);
    const alchemy = getAlchemy(chainId);
    console.log("alchemy object = ",alchemy);
    const nftTokenList:OwnedNftsResponse = await alchemy.nft.getNftsForOwner(userAddress);
    
    //const nftTokenList:OwnedNftsResponse = await alchemy.nft.getNftsForOwner(userAddress, {
    //    contractAddresses:[CONTRACT_ADDRESS]
    //});
    return nftTokenList;
}

export const useGetNFTMetadata = async (contractAddress: string, tokenId:string, chainId:number):Promise<Nft> => {
    const alchemy = getAlchemy(chainId);
    const nft:Nft = await alchemy.nft.getNftMetadata(contractAddress,BigNumber.from(tokenId),NftTokenType.ERC721);

    return nft;
}*/