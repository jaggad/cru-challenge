// Next
import Head from 'next/head'
import type { AppPropsType } from 'next/dist/shared/lib/utils'
import type { ReactNode } from 'react'

// MobX
import { Provider as StoreProvider } from 'mobx-react'
import { InitialStatePageProps, useStore } from '@lib/store'

// Material UI
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@lib/theme'
import createEmotionCache from '@lib/emotionCache'
import { CacheProvider, EmotionCache } from '@emotion/react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface DefaultAppProps extends AppPropsType {
  emotionCache?: EmotionCache
  pageProps: InitialStatePageProps & { children?: ReactNode }
}

/**
 * Adds Apollo and Styled Components Provider to App
 *
 * @param AppProps
 * @returns The root level App Component with Providers
 */
export default function CNSApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: DefaultAppProps) {
  const store = useStore(pageProps.initialState)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StoreProvider store={store}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </StoreProvider>
    </>
  )
}
