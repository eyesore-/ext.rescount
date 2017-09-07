const storage = chrome.storage.local

storage.get('responses', data => {
  if (!data.responses) storage.set({responses: {total: [], hours: {}}})
  updateBadge(data.responses.total)
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
      const prevResponse = responses.total[responses.total.length - 1]
      const newData = newDay(prevResponse, response.time)
        ? { total: [], hours: {} }
        : responses
      newData.total = [...newData.total, response.time]
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
