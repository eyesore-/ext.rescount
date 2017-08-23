import React from 'react'
import { render } from 'react-dom'
import ResponseCount from './responseCount'
import ResponseAvg from './responseAvg'

const App = ({responses}) =>
  <div>
    <ResponseCount responses = {responses} />
    <ResponseAvg responses = {responses} />
  </div>

const rootEl = document.getElementById('root')

chrome.storage.local.get('responses', data => {
  render(<App responses = {data.responses} />, rootEl)
})
