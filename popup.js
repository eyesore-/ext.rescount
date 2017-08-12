const getResponseAvg = numOfResponses => {
  const hoursWorking = (Date.now() - +localStorage.start) / 3.6e6
  return (numOfResponses / hoursWorking).toFixed(1)
}

chrome.storage.local.get('responses', data => {
  document.body.innerText = data.responses.length
})
