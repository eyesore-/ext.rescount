window.onload = () => {
  const updateEvent = e => {
    console.clear()
    console.log(new Date(), 'Updating')
    chrome.runtime.sendMessage({
      action: 'ADD_RESPONSE',
      payload: Date.now()
    })
  }

  const addUpdateEvent = node => {
    node.addEventListener('click', updateEvent)
    console.info('Event Added On:', node)
  }

  const config = { childList: true, subtree: true }
  const agentPageObserver = new MutationObserver(mutations => {
    const responseButton = document.getElementsByClassName('GPISMLRKSH')[0]
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

  chrome.runtime.sendMessage({
    action: 'ADD_START_TIME',
    payload: Date.now()
  })
  bodyObserver.observe(document.body, config)
}
