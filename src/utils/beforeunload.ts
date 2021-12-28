const handler = (event: BeforeUnloadEvent) => {
  event.preventDefault()
  event.returnValue = ''
}

/**
 * @example
 * useEffect(() => {
 *   setBeforeUnload()
 *   return () => {
 *     removeBeforeUnload()
 *   }
 * }
 */
export const setBeforeUnload = () => {
  window.onbeforeunload = handler
}

/**
 * @example
 * useEffect(() => {
 *   setBeforeUnload()
 *   return () => {
 *     removeBeforeUnload()
 *   }
 * }
 */
export const removeBeforeUnload = () => {
  window.onbeforeunload = null
}
