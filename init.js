document.body.onload = () => {
  const updateEvent = e => {
    console.clear()
    console.log(new Date())
    chrome.runtime.sendMessage({response: Date.now()})
  }

  const addUpdateEvent = node => {
    node.addEventListener('click', updateEvent)
    console.info('Event Added')
  }
  const container = document.getElementById('gwt-debug-AgentPage').children[0]

  const observer = new MutationObserver(mutations => {
    console.log(new Date())
    const responseButton = document.getElementsByClassName('GPA4MYKDHRH')[0]
    if (responseButton) addUpdateEvent(responseButton)
    mutations.forEach(mutation => console.log(mutation.type))
  })
  const config = { childList: true, subtree: true }

  observer.observe(container, config)
}
