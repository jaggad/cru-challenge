import * as React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { styled } from '@mui/material/styles'
import createEmotionServer from '@emotion/server/create-instance'

import SideBar from '@containers/SideBar/SideBar'
import TopBar from '@containers/TopBar/TopBar'
import createEmotionCache from '@lib/emotionCache'
import theme, { drawerWidth, headerHeight } from '@lib/theme'
import { NextComponentType } from 'next'
import { DefaultAppProps } from './_app'
import { AppContextType, AppInitialProps } from 'next/dist/shared/lib/utils'

const MainWrapper = styled(`div`)`
  position: absolute;
  left: ${drawerWidth}px;
  top: ${headerHeight}px;
  width: calc(100vw - ${drawerWidth}px);
`

/**
 * CRU Document
 */
export default class CRUDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="Description" content="Build a PWA with Next.js"></meta>
          <meta content={theme.palette.primary.main} name="theme-color" />

          <meta name="referrer" content={'strict-origin'} />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        </Head>
        <body>
          <TopBar />
          <SideBar />

          <MainWrapper>
            <Main />
          </MainWrapper>

          <NextScript />
        </body>
      </Html>
    )
  }
}

CRUDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp:
        (
          App: NextComponentType<
            AppContextType,
            AppInitialProps,
            DefaultAppProps
          >
        ) =>
        // eslint-disable-next-line react/display-name
        (props) =>
          <App emotionCache={cache} {...props} />,
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  }
}
