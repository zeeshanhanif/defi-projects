import { Alchemy, BigNumber, GetOwnersForNftResponse, Network, Nft, NftTokenType, OwnedNftsResponse } from "alchemy-sdk";

const getAlchemyNetwork = (chainId: number) => {
  if (chainId == 1) return Network.ETH_MAINNET;
  if (chainId == 137) return Network.MATIC_MAINNET;
  if (chainId == 10) return Network.OPT_MAINNET;
  if (chainId == 420) return Network.OPT_GOERLI;
  if (chainId == 5) return Network.ETH_GOERLI;
  if (chainId == 80001) return Network.MATIC_MUMBAI;
  if (chainId == 11155111) return Network.ETH_SEPOLIA;
};

export const getAlchemy = (chainId: number) => {
  const network = getAlchemyNetwork(chainId);

  const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    network,
  };
  const alchemy = new Alchemy(config);
  return alchemy;
};

export const alchemy = getAlchemy(
  process.env.NEXT_PUBLIC_CHAIN_ID ? Number(process.env.NEXT_PUBLIC_CHAIN_ID) : 1
);

export const getNFTTokenList = async (contractAddress: string, userAddress:string, chainId:number):Promise<OwnedNftsResponse> => {
  console.log("Chain id in get nft list in main = ",chainId);
  const alchemy = getAlchemy(chainId);
  console.log("alchemy object = ",alchemy);
  //const nftTokenList:OwnedNftsResponse = await alchemy.nft.getNftsForOwner(userAddress);
  /*
  const nftTokenList:OwnedNftsResponse = await alchemy.nft.getNftsForOwner(userAddress, {
      contractAddresses:[CONTRACT_ADDRESS]
  });*/
  const nftTokenList:OwnedNftsResponse = await alchemy.nft.getNftsForOwner(userAddress, {
    contractAddresses:["0xE1620d9323fCc7158A93338825a98E75fb7A79d6","0x6200C0b69459706fA2d122Ac6b9fe3686242076c","0x053ed3a2003dDbb56afc974BeA405b11e78980f9", "0x57b2d50D67EEbfBdb5017f5F4050F5275f7FcbFA"]
    //contractAddresses:["0x1b4C2Cf873cC13e19117f0aDf8Ba8DD4189488F9"]
});
  return nftTokenList;
}

export const getNFTMetadata = async (contractAddress: string, tokenId:string, chainId:number):Promise<Nft> => {
  const alchemy = getAlchemy(chainId);
  const nft:Nft = await alchemy.nft.getNftMetadata(contractAddress,BigNumber.from(tokenId),NftTokenType.ERC721);

  return nft;
}

export const getOwnerOfNFT = async (contractAddress: string, tokenId:string, chainId:number):Promise<string> => {
  const alchemy = getAlchemy(chainId);
  const ownersForNftResponse:GetOwnersForNftResponse = await alchemy.nft.getOwnersForNft(contractAddress,BigNumber.from(tokenId));
  
  return ownersForNftResponse.owners[0];
}