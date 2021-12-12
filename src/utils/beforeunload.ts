const handler = (event: BeforeUnloadEvent) => {
  event.preventDefault()
  event.returnValue = ''
}

export const setBeforeUnload = () => {
  window.onbeforeunload = handler
}

export const removeBeforeUnload = () => {
  window.onbeforeunload = null
}
