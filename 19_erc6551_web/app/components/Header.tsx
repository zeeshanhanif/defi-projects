"use client"

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { polygonMumbai } from 'wagmi/chains';
import { getAlchemy } from "../utils/alchemy";
import { CONTRACT_ADDRESS } from "../utils/constants";

const navigation = [
    { name: 'Home', id: 'home', href:"/"},/*
    { name: 'Roadmap', id: 'roadmap' },
    { name: 'Team', id: 'team' },
    { name: 'FAQ', id: 'faqs' },*/
]

function Header() {

    const { chain } = useNetwork();
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
    const { open, close } = useWeb3Modal()
    const { address, isConnected } = useAccount();

    useEffect(()=>{
        (async()=>{
            console.log("in use effect chian = ",chain);
            console.log("polygonMumbai = ",polygonMumbai);
            console.log("chain?.id != polygonMumbai.id = ",chain?.id != polygonMumbai.id);
            
            if(chain && chain.id != polygonMumbai.id)  {
                console.log("switchNetwork = ",switchNetwork);
                switchNetwork?.(polygonMumbai.id);
            }
        })();
        
    },[chain, switchNetwork])

    return (
        <header className="absolute inset-x-0 top-0 z-50 bg-purple-mid text-white bg-opacity-100">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="lg:flex md:gap-x-12 ">
                    {navigation.map((item) => {
                        if(item.id) {
                            return (<a key={item.name} href={item.href}  className="text-base font-semibold leading-6 text-gray-25">
                                        {item.name}
                                    </a>)
                            {/*
                            return (<div key={item.name}  className="text-base font-semibold leading-6 text-gray-25 cursor-pointer">
                                        {item.name}
                                    </div>)
                            */}
                        } 
                    })}
                </div>
                <div className="lg:flex md:flex-1 md:justify-end md:gap-x-5">
                    {
                        <div className="connect-wallet-btn text-base font-semibold leading-6 text-white cursor-pointer"onClick={()=>{ 
                                open();
                        }}>
                            Connect
                        </div>
                        
                    }
                    <w3m-button />
                </div>
            </nav>
        </header>
    );
}

export default Header;
