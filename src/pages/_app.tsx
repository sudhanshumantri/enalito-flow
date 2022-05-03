import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@ui/store'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Head>
      <meta name="og:title" content="Enalito" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="description" content="Enalito" />
    </Head>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
