const storage = chrome.storage.local

storage.get('responses', data => {
  updateBadge(data.responses)
  if (!data.responses) storage.set({responses: []})
})

const addNewResponse = newResponse => {
  storage.get('responses', data => {
    const lastResponse = data.responses[data.responses.length - 1]
    const newDay = Math.floor(lastResponse / 8.64e+7) !== Math.floor(newResponse / 8.64e+7)
    const responses = newDay ? [] : data.responses
    responses.push(newResponse)
    storage.set({responses})
  })
}

const updateBadge = responses => {
  const badgeText = responses ? JSON.stringify(responses.length) : '0'
  chrome.browserAction.setBadgeText({text: badgeText})
  chrome.browserAction.setBadgeBackgroundColor({color: [225, 0, 0, 225]})
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('REQUEST:', request)
  addNewResponse(request.response)
})

// subscribe to storage

chrome.storage.onChanged.addListener(({responses}) => {
  updateBadge(responses.newValue)
})
