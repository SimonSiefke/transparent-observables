import React from 'react'
import { Container, baseStyles } from 'unified-ui'

const Style = ({ children }) => (
  <style
    dangerouslySetInnerHTML={{
      __html: children,
    }}
  />
)

class TwitterEmoji extends React.Component {
  componentDidMount() {
    // @ts-ignore
    window.twemoji.parse(document.body)
  }
  render() {
    return (
      <Style>
        {`img.emoji {
      height: 1em;
      width: 1em;
      margin: 0 .05em 0 .1em;
      vertical-align: -0.1em;
   }`}
      </Style>
    )
  }
}
export default props => (
  <>
    <Style>{baseStyles}</Style>
    <TwitterEmoji />

    <Container {...props} />
  </>
)
