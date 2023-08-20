import { ethers } from "ethers";
import {abi as sampleNFTAbi } from '../abis/SampleFilterNFT.json';
import ContractAddresses from "../utils/contract-addresses";
import { useAccount, useContract, useSigner} from 'wagmi'


const useSampleNFT = () => {
    const {address, isConnected, isReconnecting, isDisconnected, connector: activeConnector} = useAccount();
    const { data: signer, isError, isLoading } = useSigner();
    const sampleNFTContract = useContract({
        address: ContractAddresses.sampleNFT[80001],
        abi: sampleNFTAbi,
        signerOrProvider: signer,
    })

    const getTotalSupply = async () => {
        if (true) {
        try {
            console.log("ditrectly in getTotal supply function");
            //const sampleNFTContract = new ethers.Contract(ContractAddresses.sampleNFT[80001], sampleNFTAbi, address);
            
            console.log("ditrectly in getTotal supply function = ",sampleNFTContract);
            const totalTokensMinted = await sampleNFTContract.totalTokensMinted();
            console.log("totalTokensMinted = ",totalTokensMinted.toString());
            return totalTokensMinted.toString();
        } catch (e) {
            console.error(e);
            return "0";
        }
        } else {
            alert("Connect your wallet to continue...");
            return "0";
        }
    };

    const mintPass = async (callbackLoader) => {
        if (true) {
            try {
                //const sampleNFTContract = new ethers.Contract(ContractAddresses.sampleNFT[80001], sampleNFTAbi, address);
                
                const txt1 = await sampleNFTContract.mint(address,2);
                console.log("Transaction Hash min = ",txt1.hash);
                /*
                toast.info("Transaction Hash: "+txt1.hash, {
                    position: toast.POSITION.TOP_CENTER
                });*/
                await txt1.wait();
                console.log("Minting Done");
                /*
                toast.success("Minting Done", {
                    position: toast.POSITION.TOP_CENTER
                });*/
                //callbackLoader(false);
            } catch (e) {
                console.error("my error 1 check = ",e);
                console.log(e.data);
                console.log(e.message);
                console.log("empty=-------------");
                /*
                toast.error(_message, {
                    position: toast.POSITION.TOP_CENTER
                });
                callbackLoader(false);
                */
            }
            
        } else {
            alert("Connect your wallet to continue...");
            /*
            toast.error("Connect your wallet to continue...", {
                position: toast.POSITION.TOP_CENTER
            });
            callbackLoader(false);
            */
        }
    };

    return { getTotalSupply, mintPass };
}

export default useSampleNFT;
