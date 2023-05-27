import '../styles/globals.css'
import type { NextComponentType } from 'next'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import ReactModal from 'react-modal'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

import { Layout } from '../components'
import { RouteGuard } from '../components/organisms/RouteGuard'
import { ImagingWebSocketProvider } from '../context/ImagingWebSocketProvider'
import { store } from '../store'

type CustomAppProps = AppProps & {
  Component: NextComponentType & { requireAuth: boolean }
}

export default function App({ Component, pageProps }: CustomAppProps) {
  ReactModal.setAppElement('#__next')
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <ImagingWebSocketProvider>
          <Layout>
            {Component.requireAuth ? (
              <RouteGuard>
                <Component {...pageProps} />
              </RouteGuard>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </ImagingWebSocketProvider>
      </Provider>
    </ThemeProvider>
  )
}
