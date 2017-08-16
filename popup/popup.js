const numFormat = num =>
  num % 1 !== 0 ? num.toFixed(1) : num

const getResponseAvg = (numOfResponses, startTime) => {
  const hoursWorking = (Date.now() - startTime) / 3.6e6
  return hoursWorking < 1
    ? numOfResponses
    : numFormat(numOfResponses / hoursWorking)
}

const createDiv = content => {
  let element = document.createElement('div')
  element.innerText = content
  return element
}

chrome.storage.local.get('responses', data => {
  document.body.append(createDiv(data.responses.length))
  document.body.append(createDiv(
      getResponseAvg(data.responses.length, +localStorage.start)))
})
