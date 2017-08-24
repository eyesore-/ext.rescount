const storage = chrome.storage.local

storage.get('responses', data => {
  updateBadge(data.responses.total)
  if (!data.responses) storage.set({responses: {total: [], hours: {}}})
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
    storage.get('responses', ({responses}) => {
      const lastResponse = responses.total[responses.total.length - 1]
      const newData = newDay(lastResponse, response.time)
        ? { total: [], hours: {} }
        : responses
      newData.total.push(response.time)
      newData.hours[response.hour] = responses.hours[response.hour] + 1 || 1
      storage.set({responses: newData})
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
  updateBadge(responses.newValue.total)
})
