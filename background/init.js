window.onload = () => {
  // TODO: verify response sent before sending message
  const updateEvent = e => {
    const response = {
      time: Date.now(),
      hour: Date.now() - (Date.now() % 3.6e6)
    }
    chrome.runtime.sendMessage({
      action: 'ADD_RESPONSE',
      payload: response
    })
  }

  const addUpdateEvent = node => {
    node.addEventListener('click', updateEvent)
    console.info('Event Added On:', node)
  }

  const locateSendButton = (node, name) => {
    if (node.textContent === `Message ${name}`) return node
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i]
        if (child.textContent === `Message ${name}`) return child
        locateSendButton(node.children[i], name)
      }
    }
  }

  const config = { childList: true, subtree: true }

  const agentPageObserver = new MutationObserver(mutations => {
    const authorInfoIcon = document.getElementById('gwt-debug-AuthorInfoIcon')
    if (authorInfoIcon) {
      const firstName = authorInfoIcon
        .parentNode
        .children[0]
        .textContent
        .split(' ')[0]
      console.info('FIRST NAME:', firstName)
    }
    const responseButton = document.getElementsByClassName('GPISMLRLPB')[0]
    if (responseButton) addUpdateEvent(responseButton)
  })
  const bodyObserver = new MutationObserver(mutations => {
    const container = document.getElementById('gwt-debug-AgentPage')
    if (container) {
      agentPageObserver.observe(container, config)
      bodyObserver.disconnect()
    }
  })

  chrome.runtime.sendMessage({
    action: 'ADD_START_TIME',
    payload: Date.now()
  })

  bodyObserver.observe(document.body, config)
}
