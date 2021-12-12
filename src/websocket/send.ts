import { WsEvent } from '/@/utils/apis/index'
import { WsClientSendMessage } from './AutoReconnectWebSocket'
import { ws } from './index'

// ここにいい感じにsendの処理を追加していく
class WsSend {
  odai = ''
  answer = ''
  img = ''
  requestGameStart(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.RequestGameStart,
      body: {},
    }
    ws.send(message)
  }
  odaiReady(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.OdaiReady,
      body: {},
    }
    ws.send(message)
  }
  odaiCancel(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.OdaiCancel,
      body: {},
    }
    ws.send(message)
  }
  odaiSend(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.OdaiSend,
      body: {
        odai: this.odai,
      },
    }
    console.log('[aaa]', this.odai)
    ws.send(message)
  }
  showNext(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.ShowNext,
      body: {},
    }
    ws.send(message)
  }
  answerSend(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.AnswerSend,
      body: {
        answer: this.answer,
      },
    }
    ws.send(message)
  }
  answerReady(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.AnswerReady,
      body: {},
    }
    ws.send(message)
  }
  answerCancel(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.AnswerCancel,
      body: {},
    }
    ws.send(message)
  }
  drawReady(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.DrawReady,
      body: {},
    }
    ws.send(message)
  }
  drawCancel(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.DrawCancel,
      body: {},
    }
    ws.send(message)
  }
  drawSend(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.DrawSend,
      body: {
        img: this.img,
      },
    }
    ws.send(message)
  }
  returnRoom(): void {
    const message: WsClientSendMessage = {
      type: WsEvent.ReturnRoom,
      body: {},
    }
    ws.send(message)
  }
}

export const wsSend = new WsSend()
