chrome.storage.local.get('responses', data => {
  document.body.innerText = data.responses.length
})
