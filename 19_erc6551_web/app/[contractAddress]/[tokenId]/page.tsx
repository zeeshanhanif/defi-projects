"use client"

import { Nft, OwnedNft, OwnedNftsResponse } from "alchemy-sdk";
import { useAccount, useNetwork, useWalletClient } from "wagmi";
import { Fragment, useEffect, useState, useRef} from "react";
import { compareAddresses, convertImageURLFromIpfsToHttp, copyAddress, formatAddress } from "@/app/utils/util-functions";
import { deployAccount, getAccount, getIsAccountDeployed, transferNFTFromTBA, transferNFTFromWallet } from "@/app/utils/tokenbound";
import Link from "next/link";
import { CONTRACT_ADDRESS } from "@/app/utils/constants";
import { useRouter } from "next/navigation";
import { getNFTMetadata, getNFTTokenList, getOwnerOfNFT } from "@/app/utils/alchemy";
import { Transition, Dialog } from "@headlessui/react";
import Image from "next/image";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Address from "@/app/components/Address";


export default function Token({ params }: { params: { contractAddress: string, tokenId:string } }) {
    const {address} = useAccount();
    const {chain} = useNetwork();
    const [nft, updateNft] = useState<Nft>();
    const [accountAddress, setAccountAddress] = useState<string>();
    const [isAccountDeployed, setIsAccountDeployed] = useState<boolean>();
    const [accountNftList, setAccountNftList] = useState<OwnedNftsResponse>();
    const [nftOwner, setNftOwner] = useState<string>();
    const {data: walletClient} = useWalletClient();
    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false)
    const cancelButtonRef = useRef(null)
    const [currentOwnedNFT, setCurrentOwnedNFT] = useState<Nft>();
    const [transferToAddress, setTransferToAddress] = useState<string>();

    const [isTransferFromTBA, setIsTransferFromTBA] = useState<boolean>();

    useEffect(()=> {
        
        console.log("wallent client 11 = ",walletClient);
        (async() =>{
            if(params.contractAddress && params.tokenId) {
                updateNft(await getNFTMetadata(params.contractAddress, params.tokenId, chain ? chain.id: 1));
            }

        })();
    },[]);

    useEffect(()=>{
        console.log("wallent client 22 = ",walletClient);
        (async() =>{
            if(nft) {
                const accountAddress_:string = getAccount(walletClient, chain? chain.id:1,params.contractAddress, params.tokenId);
                console.log("in token page accountAddres_ = ",accountAddress_);
                setAccountAddress(accountAddress_);

                const isAccountDeployed_:boolean = await getIsAccountDeployed(walletClient, chain? chain.id:1,accountAddress_);
                console.log("in token page isAccountDeployed_ = ",isAccountDeployed_);
                setIsAccountDeployed(isAccountDeployed_);
            }
        })();
    },[nft]);

    useEffect(()=>{
        (async() =>{
            if(nft) {
                const ownerOfNFT:string = await getOwnerOfNFT(params.contractAddress, params.tokenId, chain?.id || 0);
                //console.log("in token page accountAddres_ = ",accountAddress_);
                setNftOwner(ownerOfNFT);
            }
        })();
    },[nft]);

    useEffect(()=>{
        console.log("wallent client 33 = ",walletClient);
        (async() =>{
            if(accountAddress && isAccountDeployed) {
                setAccountNftList(await getNFTTokenList(CONTRACT_ADDRESS, accountAddress, chain ? chain.id: 0))
            }
        })();
    },[accountAddress, isAccountDeployed]);

    return (
    <main className="flex min-h-screen flex-col justify-between bg-slate-700">
        <div className="bg-slate-500 main-sec main-sec-lg px-24">
            <div className="grid grid-cols-6 py-24 gap-x-8">
                <div className="relative col-span-3 rounded-xl">
                    <img className="rounded-2xl object-fill w-full" src={convertImageURLFromIpfsToHttp(nft?.rawMetadata?.image)}/>
                    <div className="py-3 text-2xl text-white">
                        {nft?.rawMetadata?.name} {nft?"#":""}{nft?.tokenId}
                    </div>
                    {
                        nftOwner && 
                        <div className="py-3 text-2xl text-white flex">
                            <div className="pr-3">Owner: </div><Address accountAddress={nftOwner} />
                            {
                                compareAddresses(nftOwner,String(address)) &&   
                                <div className="pl-3">
                                    <button className="bg-blue-500 hover:bg-blue-700 active:bg-blue-500 text-white font-bold py-1 px-3 rounded cursor-pointer"
                                        onClick={() => {
                                            setIsTransferFromTBA(false);
                                            setCurrentOwnedNFT(nft);
                                            setOpen(true);
                                        }}>
                                        Transfer
                                    </button>
                                </div>
                            }
                        </div>
                    }
                    
                </div>
                { nft &&
                <div className="col-span-3 p-6 rounded-xl bg-slate-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Address accountAddress={accountAddress} />
                            <div className="px-2">
                                <a target="_blank" href={`https://mumbai.polygonscan.com/address/${accountAddress}`}><Image width={20} height={20} src="/external_link_icon.png" alt="External Link"/></a>
                            </div>
                        </div>
                        <div className="py-1">
                            {
                                isAccountDeployed ? <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Account Deployed</div>:
                                <div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={async()=>{
                                                const accountAfterDeployed  = await deployAccount(walletClient, chain? chain.id:1, params.contractAddress, params.tokenId);
                                                console.log("accountAfterDeployed = ",accountAfterDeployed);
                                                setIsAccountDeployed(true);
                                            }}>
                                        Deploy Account
                                    </button>
                                </div>
                            }
                            
                        </div>
                    </div>
                    <div className="py-3">Collectibles / Assets </div>
                    {
                        accountNftList?.ownedNfts.length == 0 && <div className="py-5">No NFTs in this account</div>
                    }
                    <div className="grid grid-cols-4 gap-4">
                        {
                            accountNftList && accountNftList.ownedNfts.map((item, index)=>{
                                return (
                                    tokenItem(item, index)
                                );
                            })
                        }
                    </div>
                </div>
                }
            </div>
        </div>
        {transferDialog()}
        <ToastContainer />
    </main>
  )

  function tokenItem (ownedNft:OwnedNft, index:number) {
    return (
        <div key={index} className="col-span-2 rounded-xl bg-white">
            <div>
                <img className="rounded-t-2xl nft-list-img" src={convertImageURLFromIpfsToHttp(ownedNft.rawMetadata?.image)}
                            onClick={()=> {
                                router.push(`/${ownedNft.contract.address}/${ownedNft.tokenId}`);
                            }}
                />
            </div>
            <div className="flex flex-col gap-2 px-3 py-2 bg-white border border-t-0 md:py-3 md:px-4 md:gap-3 border-1 rounded-b-2xl border-zinc-200">
                <div>{ownedNft.rawMetadata?.name} #{ownedNft.tokenId}</div>
                <div className="flex">
                    {
                    <Address accountAddress={getAccount(walletClient, chain? chain.id:1,ownedNft.contract.address, ownedNft.tokenId)} />
                        }
                    {/*formatAddress(getAccount(walletClient, chain? chain.id:1,ownedNft.contract.address, ownedNft.tokenId)) */}
                </div>
                <div className="flex">
                    <button className="bg-blue-500 hover:bg-blue-700 active:bg-blue-500 text-white font-bold py-1 px-3 rounded cursor-pointer"
                                        onClick={()=> {
                                            setIsTransferFromTBA(true);
                                            setCurrentOwnedNFT(ownedNft);
                                            setOpen(true);
                                        }}>
                            Transfer
                    </button>
                </div>
            </div>
        </div>
    );}

    function transferDialog () {
        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="flex justify-center">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Transfer NFT - {currentOwnedNFT?.rawMetadata?.name} #{currentOwnedNFT?.tokenId} 
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <img className="rounded-t-2xl nft-list-img" src={convertImageURLFromIpfsToHttp(currentOwnedNFT?.rawMetadata?.image)}/>
                                                </div>
                                                <div className="mt-2 text-xl">
                                                    Transfer To:
                                                </div>
                                                <div className="mt-2">
                                                    <input type="text" className="px-4 py-2 bg-gray-100 border rounded"
                                                        onChange={(e)=>{
                                                            console.log("text 1 = ", e.target.value);
                                                            setTransferToAddress(e.target.value);
                                                        }}
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => {
                                                if(isTransferFromTBA) {
                                                    transferNFTFromTBA(walletClient, chain?.id, transferToAddress,accountAddress,currentOwnedNFT?.contract.address,currentOwnedNFT?.tokenId)
                                                }
                                                else {
                                                    transferNFTFromWallet(transferToAddress,address,currentOwnedNFT?.contract.address,currentOwnedNFT?.tokenId)
                                                }
                                                setOpen(false)
                                            }}
                                        >
                                            Transfer
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }
}
