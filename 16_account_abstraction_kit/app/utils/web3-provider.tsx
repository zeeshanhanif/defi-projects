'use client';
import { WagmiConfig, createClient } from 'wagmi';
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { googleWallet, facebookWallet, githubWallet, discordWallet} from "@zerodevapp/wagmi/rainbowkit"
import { polygonMumbai } from 'wagmi/chains'
import { connectorsForWallets, darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains } from 'wagmi';

export default function Web3Provider({ children }: { children: React.ReactNode }) {

  const allowedChains = [polygonMumbai]
  const projectId = "b7c8a3f7-70d2-4f9c-a42b-d94d32e8ed6f";
  const alchemyMumbaiKey = "slSTn6mVAiOz54__YSSvxHOocQbQegwZ"
  const connectors = connectorsForWallets([
      {
          groupName:"Social",
          wallets: [
              googleWallet({chains:allowedChains, options: { projectId: projectId}}),
              facebookWallet({chains:allowedChains, options: { projectId: projectId}}),
              githubWallet({chains:allowedChains, options: { projectId: projectId}}),
              discordWallet({chains:allowedChains, options: { projectId: projectId}}),
          ]
      }
  ]);

  const {chains, provider, webSocketProvider } = configureChains(
    allowedChains,
    [ alchemyProvider({apiKey: alchemyMumbaiKey}),
      publicProvider()
    ]
)

const client = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
})

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} modalSize={'wide'}>
          {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}