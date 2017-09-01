import React from 'react'

const style = {
  fontSize: '14px',
  fontWeight: '500'
}

const numFormat = num =>
  num % 1 !== 0 ? num.toFixed(1) : num

const getResponseAvg = (numOfResponses, startTime) => {
  const hoursWorking = (Date.now() - startTime) / 3.6e6
  return hoursWorking < 1
    ? numOfResponses
    : numFormat(numOfResponses / hoursWorking)
}

const ResponseAvg = ({responses}) =>
  <div style={style}>
    {getResponseAvg(responses.length, +localStorage.start)} res. /hour
  </div>

export default ResponseAvg
