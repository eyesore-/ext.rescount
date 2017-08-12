const storage = chrome.storage.local

storage.get('responses', data => {
  updateBadge(data.responses)
  if (!data.responses) storage.set({responses: []})
})

const updateBadge = responses => {
  const badgeText = responses ? JSON.stringify(responses.length) : '0'
  chrome.browserAction.setBadgeText({text: badgeText})
  chrome.browserAction.setBadgeBackgroundColor({color: [225, 0, 0, 225]})
}

const newDay = (oldValue, newValue) =>
  new Date(oldValue).getDate() !== new Date(newValue).getDate()

const messageAction = {
  ADD_RESPONSE: response => {
    storage.get('responses', data => {
      const lastResponse = data.responses[data.responses.length - 1]
      const responses = newDay(lastResponse, response) ? [] : data.responses
      responses.push(response)
      storage.set({responses})
    })
  },
  ADD_START_TIME: time => {
    if (!localStorage.start || newDay(+localStorage.start, time)) {
      localStorage.start = time
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('REQUEST:', request)
  messageAction[request.action](request.payload)
})

// subscribe to storage

chrome.storage.onChanged.addListener(({responses}) => {
  updateBadge(responses.newValue)
})
