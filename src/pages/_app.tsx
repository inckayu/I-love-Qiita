import { ThemeProvider } from '@mui/material'
import { RecoilRoot } from 'recoil'

import { theme } from '@/constants/mui'

import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import '@/styles/highlight.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}
