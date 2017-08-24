import React from 'react'

const numFormat = num =>
  num % 1 !== 0 ? num.toFixed(1) : num

const getResponseAvg = (numOfResponses, startTime) => {
  const hoursWorking = (Date.now() - startTime) / 3.6e6
  return hoursWorking < 1
    ? numOfResponses
    : numFormat(numOfResponses / hoursWorking)
}

const ResponseAvg = ({responses}) =>
  <div>
    {getResponseAvg(responses.length, +localStorage.start)} /hr
  </div>

export default ResponseAvg
