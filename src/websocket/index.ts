import { WEBSOCKET_ENDPOINT, BASE_URL } from '/@/utils/wsSetting'
import AutoReconnectWebSocket from './AutoReconnectWebSocket'

const absoluteWebsocketEndpoint = new URL(WEBSOCKET_ENDPOINT, BASE_URL)
absoluteWebsocketEndpoint.protocol =
  window.location.protocol === 'https:' ? 'wss:' : 'ws:'

export const ws = new AutoReconnectWebSocket(
  absoluteWebsocketEndpoint.href,
  undefined,
  {
    maxReconnectionDelay: 3000,
    minReconnectionDelay: 1000,
  }
)

export const wsListener = ws.eventTarget

export const setupWebSocket = () => {
  ws.connect()
}

export * from './send'
export { WsEvent } from '/@/utils/apis/index'
export type { InlineObject } from '/@/utils/apis/index'