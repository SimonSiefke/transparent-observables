import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
p{
  text-align:justify
}
figure{
  margin:0
}
figcaption{
text-align:center;
}
`
export default class _Document extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  render() {
    const { styleTags } = this.props

    return (
      <html lang="en">
        <Head>
          {styleTags}
          <script src="//twemoji.maxcdn.com/2/twemoji.min.js?11.4" />
          <GlobalStyle />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
