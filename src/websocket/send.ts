import { WsEvent } from '/@/utils/apis/index'
import { WsClientSendMessage } from './AutoReconnectWebSocket'
import { ws } from './index'

// ここにいい感じにsendの処理を追加していく
class WsSend {
  odai = ''
  requestGameStart() {
    const message: WsClientSendMessage = {
      type: WsEvent.RequestGameStart,
      body: {},
    }
    ws.send(message)
  }
  odaiReady() {
    const message: WsClientSendMessage = {
      type: WsEvent.OdaiReady,
      body: {},
    }
    ws.send(message)
  }
  odaiCancel() {
    const message: WsClientSendMessage = {
      type: WsEvent.OdaiCancel,
      body: {},
    }
    ws.send(message)
  }
  odaiSend() {
    const message: WsClientSendMessage = {
      type: WsEvent.OdaiCancel,
      body: {
        odai: this.odai,
      },
    }
    console.log(this.odai)
    ws.send(message)
  }
}

export const wsSend = new WsSend()
