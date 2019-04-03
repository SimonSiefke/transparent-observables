import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
body{
  line-height: 1.5;
  font-size:1.2rem;
  margin: calc(4vw + 30px) !important;
}
.underscore-line {
  border-bottom: 1px solid black;
  display: inline-block;
  transform: translateY(2px);
  width: 80px;

  &.short{
    width: 80px;
  }
  &.long{
    width: 80px;
  }
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
