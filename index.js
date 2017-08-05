// subscribe to storage

chrome.storage.onChanged.addListener(({responses}) => {
  const badgeText = JSON.stringify(responses.newValue.length)
  chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]})
  chrome.browserAction.setBadgeText({text: badgeText})
})
