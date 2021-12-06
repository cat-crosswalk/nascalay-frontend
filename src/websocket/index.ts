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
