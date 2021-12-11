import { WEBSOCKET_ENDPOINT, BASE_URL } from '/@/utils/wsSetting'
import AutoReconnectWebSocket from './AutoReconnectWebSocket'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const baseUrl = VITE_ENV_STAGE === 'development'
    ? BASE_URL
    : location.protocol + '//api.nascalay.trasta.dev'

const absoluteWebsocketEndpoint = new URL(WEBSOCKET_ENDPOINT, baseUrl)
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

export const setupWebSocket = (userId: string) => {
  ws.userId = userId
  ws.connect()
}

export const closeWebSocket = () => {
  ws.close()
}

export * from './send'
export { WsEvent } from '/@/utils/apis/index'
export type {
  WsClientReceiveMessage,
  WsClientSendMessage,
} from './AutoReconnectWebSocket'
