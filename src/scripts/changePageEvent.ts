import { NavigateFunction } from 'react-router'
import { wsListener, WsEvent } from '/@/websocket'

export const addPageEventListener = (navigate: NavigateFunction) => {

  const startTheme = (e: CustomEvent) => {
    navigate('/theme', { replace: true })
  }

  const startDraw = (e: CustomEvent) => {
    navigate('/draw', { replace: true })
  }

  const startAnswer = (e: CustomEvent) => {
    navigate('/answer', { replace: true })
  }

  const startResult = (e: CustomEvent) => {
    navigate('/result', { replace: true })
  }

  const nextRoom = (e: CustomEvent) => {
    navigate('/lobby', { replace: true })
  }

  wsListener.addEventListener(WsEvent.GameStart, startTheme as EventListener)
  wsListener.addEventListener(WsEvent.DrawStart, startDraw as EventListener)
  wsListener.addEventListener(WsEvent.AnswerStart, startAnswer as EventListener)
  wsListener.addEventListener(WsEvent.ShowStart, startResult as EventListener)
  wsListener.addEventListener(WsEvent.NextRoom, nextRoom as EventListener)
}
