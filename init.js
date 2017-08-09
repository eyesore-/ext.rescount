window.onload = () => {
  const updateEvent = e => {
    console.clear()
    console.log(new Date())
    chrome.runtime.sendMessage({response: Date.now()})
  }

  const addUpdateEvent = node => {
    node.addEventListener('click', updateEvent)
    console.info('Event Added')
  }

  const config = { childList: true, subtree: true }
  const agentPageObserver = new MutationObserver(mutations => {
    console.log(new Date())
    const responseButton = document.getElementsByClassName('GPA4MYKDHRH')[0]
    if (responseButton) addUpdateEvent(responseButton)
    mutations.forEach(mutation => console.log(mutation.type))
  })
  const bodyObserver = new MutationObserver(mutations => {
    const container = document.getElementById('gwt-debug-AgentPage')
    if (container) {
      agentPageObserver.observe(container.children[0], config)
      bodyObserver.disconnect()
    }
  })

  bodyObserver.observe(document.body, config)
}
