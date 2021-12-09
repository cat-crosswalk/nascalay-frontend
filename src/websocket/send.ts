import { WsEvent } from '/@/utils/apis/index'
import { WsSendMessage } from './AutoReconnectWebSocket'
import { ws } from './index'

// ここにいい感じにsendの処理を追加していく
class WsSend {
  requestGameStart() {
    const message: WsSendMessage = {
      type: WsEvent.RequestGameStart,
      body: {},
    }
    ws.send(message)
  }
}

export const wsSend = new WsSend()
