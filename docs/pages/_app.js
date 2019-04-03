import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import CodeBlock from '../components/CodeBlock'
import styled from 'styled-components'
import _ from 'lodash'

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
  h1: props => <h1 id={_.kebabCase(props.children)}>{props.children}</h1>,
  h2: props => <h2 id={_.kebabCase(props.children)}>{props.children}</h2>,
  h3: props => <h3 id={_.kebabCase(props.children)}>{props.children}</h3>,
  h4: props => <h4 id={_.kebabCase(props.children)}>{props.children}</h4>,
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

const Wrapper = styled.div`
  margin: calc(4vw + 30px) !important;
`

export default ({ Component, pageProps }) => (
  <Wrapper>
    <Main>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </Main>
  </Wrapper>
)
