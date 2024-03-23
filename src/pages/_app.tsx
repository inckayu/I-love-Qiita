// import "@/styles/globals.css";
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
