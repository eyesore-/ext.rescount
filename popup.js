const numFormat = num => num % 1 !== 0 ? (num).toFixed(1) : num

const getResponseAvg = (numOfResponses, startTime) => {
  const hoursWorking = (Date.now() - startTime) / 3.6e6
  return hoursWorking < 1
    ? numOfResponses
    : numFormat(numOfResponses / hoursWorking)
}

chrome.storage.local.get('responses', data => {
  document.body.innerText = data.responses.length
})
