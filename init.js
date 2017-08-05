window.onload = () => {
  const storage = chrome.storage.local
  storage.get('responses', (data) => {
    const responses = data.responses || []

    const container = document.getElementById('gwt-debug-AgentPage').children[0]

    const observer = new MutationObserver(mutations => {
      console.log(new Date())
      addClickEvent()
      mutations.forEach(mutation => console.log(mutation.type))
    })

    const config = { childList: true, characterData: true, subtree: true }

    observer.observe(container, config)

    const updateResponses = () => {
      console.clear()
      responses.push(Date.now())
      console.log(new Date())
      console.log('RESPONSES:', responses.length)
      storage.set({responses})
    }

    const addClickEvent = () => {
      const responseButton = document.getElementsByClassName('GPA4MYKDHRH')[0]
      if (responseButton) {
        responseButton.removeEventListener('click', updateResponses, false)
        responseButton.addEventListener('click', updateResponses, false)
      }
    }

    addClickEvent()
  })
}
