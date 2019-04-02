/* eslint react/jsx-key: 0 */

import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

export default ({ children, className, live, render }) => {
  const language = className.replace(/language-/, '')
  console.log(language, children)
  return (
    <LiveProvider
      code={`<div><p>ok</p>\n<p>ok</p>\n</div>`}
      language={language}
    >
      <LivePreview />
      <div style={{ background: '#282A36' }}>
        <LiveEditor />
      </div>
      <LiveError />
    </LiveProvider>
  )
  // return (
  //   <Highlight {...defaultProps} code={children} language={language}>
  //     {({ className, style, tokens, getLineProps, getTokenProps }) => (
  //       <pre className={className} style={{ ...style, padding: '20px' }}>
  //         {tokens.map((line, i) => (
  //           <div key={i} {...getLineProps({ line, key: i })}>
  //             {line.map((token, key) => (
  //               <span key={key} {...getTokenProps({ token, key })} />
  //             ))}
  //           </div>
  //         ))}
  //       </pre>
  //     )}
  //   </Highlight>
  // )
}
