import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import CodeBlock from '../components/CodeBlock'
import styled from 'styled-components'

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
}

const Main = styled.main`
  max-width: 742px;
  font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman',
    Times, serif;
  letter-spacing: 0.01rem;
  font-weight: 400;
  font-style: normal;
  font-size: 21px;
  line-height: 1.58;
  letter-spacing: -0.003em;
  margin: 0 auto;
`

export default ({ Component, pageProps }) => (
  <Main>
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  </Main>
)
