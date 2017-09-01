import React from 'react'

const style = {
  fontSize: '64px',
  fontWeight: '600'
}

const ResponseCount = ({responses}) =>
  <div style={style}>{responses.length}</div>

export default ResponseCount
