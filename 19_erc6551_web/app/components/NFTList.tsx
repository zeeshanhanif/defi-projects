"use client"

import { useAccount, useNetwork } from "wagmi";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { OwnedNftsResponse } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { convertImageURLFromIpfsToHttp } from "../utils/util-functions";
import { useGetNFTTokenList } from "../utils/alchemy";

function NFTList() {
    const {address, isConnected} = useAccount();
    const {chain} = useNetwork();
    const [nftList, updateNftList] = useState<OwnedNftsResponse>();
    const router = useRouter();

    useEffect(()=> {
        (async() =>{
            console.log("address = ",address);
            console.log("isConnected = ",isConnected);
            console.log("chain id = ",chain?.id);
            updateNftList(await useGetNFTTokenList(CONTRACT_ADDRESS, new String(address).toString(), chain ? chain.id: 0))
        })();
    },[isConnected, address, chain])

    return (
        <div className="bg-slate-500 nft-list-section py-8">
            <div className="grid grid-cols-4 gap-4 content-center justify-items-center">
                {nftList && 
                    nftList.ownedNfts.map((a, i)=>{
                            return <div key={i} className="bg-slate-300 rounded-xl">
                                
                                <img className="nft-list-img rounded-t-xl" src={convertImageURLFromIpfsToHttp(a?.rawMetadata?.image)} 
                                                    onClick={()=> {
                                                        router.push(`/${a.contract.address}/${a.tokenId}`);
                                                    }}
                                                />
                                {/*
                                <img className="nft-list-img" src={a.rawMetadata && a.rawMetadata.image ? a.rawMetadata.image.replace("ipfs://", "https://ipfs.io/ipfs/"):""} 
                                                    onClick={()=> {
                                                        router.push(`/${a.contract.address}/${a.tokenId}`);
                                                    }}
                                                />
                                                */}
                                <div className="px-2 py-2">
                                Name: {a.rawMetadata?.name} <br/>
                                Token Id: {a.tokenId} <br/>
                                Collection: {a.contract.name} <br/>
                                Symbol: {a.contract.symbol} <br/>
                                </div>
                                {/*
                                rawMetadata image: {a.rawMetadata? a.rawMetadata.image:"N/A"} <br/>
                                Token URI gateway: {a.tokenUri? a.tokenUri.gateway: "N/A"} <br/>
                                Token URI raw: {a.tokenUri? a.tokenUri.raw: "N/A"}
                                 */}
                                </div>
                    })
                }
            </div>
            
        </div>
    );
}

export default NFTList;