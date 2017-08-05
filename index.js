// subscribe to storage

chrome.storage.onChanged.addListener(({responses}) => {
  const badgeText = JSON.stringify(responses.newValue.length)
  chrome.browserAction.setBadgeText({text: badgeText})
  chrome.browserAction.setBadgeBackgroundColor({color: [225, 0, 0, 225]})
})
