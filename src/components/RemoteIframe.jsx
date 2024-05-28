import React from 'react'
import Iframe from "react-iframe";

const RemoteIframe = ({ url }) => {
  return (
    <Iframe
      url={url}
      width="100%"
      frameBorder="0"
      scrolling="yes"
    />
  )
}

export default RemoteIframe
