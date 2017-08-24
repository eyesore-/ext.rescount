import React from 'react'
import { render } from 'react-dom'
import ResponseCount from './responseCount'
import ResponseAvg from './responseAvg'
import HourDisplay from './hourResponses'

const App = ({responses}) =>
  <div>
    <ResponseCount responses = {responses.total} />
    <ResponseAvg responses = {responses.total} />
    <HourDisplay hours = {responses.hours} />
  </div>

const rootEl = document.getElementById('root')

chrome.storage.local.get('responses', data => {
  render(<App responses = {data.responses} />, rootEl)
})
