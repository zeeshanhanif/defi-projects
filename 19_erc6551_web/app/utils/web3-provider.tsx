'use client';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
//import { arbitrum, mainnet } from 'wagmi/chains'
import { polygonMumbai } from 'wagmi/chains'

if (!process.env.NEXT_PUBLIC_WALLET_PROJECT_ID) {
    throw new Error("You need to provide WALLET_CONNECT_PUBLIC_PROJECT_ID env variable");
}

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLET_PROJECT_ID;

// 2. Create wagmiConfig
const metadata = {
  name: 'Demo Web3Modal',
  description: 'Web3Modal Example ERC6551',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

//const chains = [mainnet, arbitrum]
const chains = [polygonMumbai]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
        <WagmiConfig config={wagmiConfig}>
            {children}
        </WagmiConfig>
    </>
  );
}