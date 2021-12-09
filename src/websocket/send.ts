import { WsEvent } from '/@/utils/apis/index'
import { WsClientSendMessage } from './AutoReconnectWebSocket'
import { ws } from './index'

// ここにいい感じにsendの処理を追加していく
class WsSend {
  requestGameStart() {
    const message: WsClientSendMessage = {
      type: WsEvent.RequestGameStart,
      body: {},
    }
    ws.send(message)
  }
}

export const wsSend = new WsSend()
