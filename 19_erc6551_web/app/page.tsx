import Image from 'next/image'
import Header from './components/Header'
import Main from './components/Main'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-slate-700">
      <Main/>
    </main>
  )
}
