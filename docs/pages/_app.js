import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import CodeBlock from '../components/CodeBlock'

// export default ({ Component, pageProps }) => <Component {...pageProps} />

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
}

export default ({ Component, pageProps }) => (
  <MDXProvider components={components}>
    <Component {...pageProps} />
  </MDXProvider>
)
