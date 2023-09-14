"use client"

import { getZeroDevSigner, getSocialWalletOwner } from '@zerodevapp/sdk'
import { SocialWallet } from '@zerodevapp/social-wallet';
import { useMemo, useState } from 'react';
export default function ConnectBtn() {

    const [address, setAddress] = useState<string>()
    const [loading, setLoading] = useState(false)

    const projectId = "b7c8a3f7-70d2-4f9c-a42b-d94d32e8ed6f";

    const socialWallet = useMemo(() => {
        return new SocialWallet()
      }, [])

    const connectWallet = async() => {

        setLoading(true)
        const signer = await getZeroDevSigner({
            projectId: projectId,
            owner: await getSocialWalletOwner(projectId, socialWallet)
        })
        setLoading(false)
        const userAddress = await signer.getAddress();
        setAddress(userAddress)
    }

    const disconnect = async () => {
        await socialWallet.disconnect();
        setAddress(undefined)
    }

    return (
        <div className="ml-5 w-full">
            {
                !address && <button className='mt-10 bg-gray-700 text-white rounded py-2 px-2' 
                    disabled={loading}
                    onClick={()=> {
                        connectWallet()
                    }}>
                    {loading ? 'loading...' : 'Connect Wallet'}
                </button>
            }
            {!!address &&
                <button className='mt-10 bg-gray-700 text-white rounded py-2 px-2' onClick={disconnect} disabled={loading}>Disconnect</button>
            }
            <div className="mt-10">
                Address: {address}
            </div>
        </div>
    );
}