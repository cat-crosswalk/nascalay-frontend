import { ws } from './index'
import { InlineObject, WsEvent } from '/@/utils/apis/index'

// ここにいい感じにsendの処理を追加していく
class WsSend {
  requestGameStart() {
    const message: InlineObject = {
      type: WsEvent.RequestGameStart,
      body: {},
    }
    ws.send(message)
  }
}

export const wsSend = new WsSend()
