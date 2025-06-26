import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
    subsets: ['latin'],
    weight:['100','200','400','600','900']
 })
 //@ts-ignore
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  )
}