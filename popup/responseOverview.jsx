import React from 'react'
import ResponseCount from './responseCount'
import ResponseAvg from './responseAvg'

const ResponseOverview = ({responses}) =>
  <div>
    <ResponseCount count = {responses.length}/>
  </div>

export default ResponseOverview
