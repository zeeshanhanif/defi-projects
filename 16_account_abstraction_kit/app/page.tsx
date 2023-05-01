"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import ConnectBtn from './components/connectBtn'
import { useAccount } from 'wagmi'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {address, isConnected, isReconnecting, isDisconnected, connector: activeConnector} = useAccount();
  return (
    <div >
      Zero Dev App Login with Rainbow Kit
      <br/><br/>
      <ConnectBtn />
      <br/>
      <div className="ml-5">
        address: {address}<br/>
        isConnected: {isConnected?"Yes": "No"}<br/>
        isReconnecting: {isReconnecting?"Yes": "No"}<br/>
        isDisconnected: {isDisconnected?"Yes": "No"}<br/>
        Connected To: {activeConnector?.name}<br/>
      </div>
    </div>
  )
}
