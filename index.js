const storage = chrome.storage.local

const addNewResponse = newResponse => {
  storage.get('responses', data => {
    const responses = data.responses || []
    responses.push(newResponse)
    storage.set({responses})
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  addNewResponse(request.response)
})

// subscribe to storage

chrome.storage.onChanged.addListener(({responses}) => {
  const badgeText = responses.newValue
    ? JSON.stringify(responses.newValue.length)
    : '0'
  chrome.browserAction.setBadgeText({text: badgeText})
  chrome.browserAction.setBadgeBackgroundColor({color: [225, 0, 0, 225]})
})
