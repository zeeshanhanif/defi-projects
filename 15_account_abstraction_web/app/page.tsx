import Image from 'next/image'
import { Inter } from 'next/font/google'
import ConnectBtn from './components/connectBtn'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div >
      Hello World
      <ConnectBtn />
    </div>
  )
}
