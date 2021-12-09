import { wait } from '/@/utils/timer'
import * as WsApi from '/@/utils/apis'

export interface Options {
  maxReconnectionDelay: number
  minReconnectionDelay: number
  connectionTimeout: number
}

const defaultOptions: Options = {
  maxReconnectionDelay: 10000,
  minReconnectionDelay: 700,
  connectionTimeout: 4000,
}

export type WsSendMessageBody =
  | WsApi.WsRoomSetOptionEventBody
  | WsApi.WsOdaiSendEventBody
  | WsApi.WsDrawSendEventBody
  | WsApi.WsAnswerSendEventBody
  | { [key: string]: never }
export type WsReceiveMessageBody =
  | WsApi.WsRoomNewMemberEventBody
  | WsApi.WsRoomUpdateOptionEventBody
  | WsApi.WsGameStartEventBody
  | WsApi.WsDrawStartEventBody
  | WsApi.WsAnswerStartEventBody
  | WsApi.WsShowOdaiEventBody
  | WsApi.WsShowCanvasEventBody
  | WsApi.WsShowAnswerEventBody
  | WsApi.WsChangeHostEventBody
export interface WsSendMessage {
  type: WsApi.WsEvent
  body: WsSendMessageBody
}

export interface WsReceiveMessage {
  type: WsApi.WsEvent
  body: WsReceiveMessageBody
}

export default class AutoReconnectWebSocket {
  _ws?: WebSocket
  // SafariでEventTargetのコンストラクタ使えないのでDocumentFragmentで代用
  // らしい by traQ-UI
  readonly eventTarget: EventTarget = document.createDocumentFragment()

  readonly url: string
  readonly protocols: string | string[] | undefined
  readonly options: Readonly<Options>

  fullUrl = ''

  reconnecting = false
  isClose = false

  constructor(
    url: string,
    protocols: string | string[] | undefined,
    options: Readonly<Partial<Options>>
  ) {
    this.url = url
    this.protocols = protocols
    this.options = { ...options, ...defaultOptions }
  }

  get isOpen() {
    return this._ws?.readyState === WebSocket.OPEN
  }

  set userId(id: string) {
    this.fullUrl = `${this.url}?user=${id}`
  }

  send(message: WsSendMessage) {
    // TODO: WebSocketが未接続とかで送信できなかった場合の処理
    if (this.isOpen) {
      const json = JSON.stringify(message)
      this._ws?.send(json)
    }
  }

  _getDelay(count: number) {
    const { minReconnectionDelay, maxReconnectionDelay } = this.options
    return Math.min(minReconnectionDelay * 1.3 ** count, maxReconnectionDelay)
  }

  _setupWs() {
    return new Promise<void>((resolve) => {
      this._ws = new WebSocket(this.fullUrl, this.protocols)

      this._ws.addEventListener(
        'open',
        () => {
          resolve()
          console.log('[WebSocket] Open')
        },
        { once: true }
      )

      this._ws.addEventListener('close', () => {
        console.log('[WebSocket] Close')
        if (!this.isClose) {
          this.reconnect()
        }
      })

      this._ws.addEventListener(
        'error',
        (e) => {
          resolve()
          console.log('[WebSocket] Error', e)
        },
        { once: true }
      )

      this._ws.addEventListener('message', (event) => {
        console.log('[WebSocket] Message', event)
        try {
          const message: WsSendMessage = JSON.parse(event.data)
          this.eventTarget.dispatchEvent(
            new CustomEvent(message.type ?? 'message', { detail: message.body })
          )
        } catch (e) {
          console.warn('[WebSocket] Failed to parse: ', e)
        }
      })
    })
  }

  connect() {
    if (!this.isOpen) {
      this._setupWs()
    }
  }

  close() {
    this.isClose = true
    this._ws?.close()
  }

  async reconnect() {
    if (this.reconnecting) return
    this.reconnecting = true

    let count = 0
    while (!this.isOpen) {
      console.log('[WebSocket] Reconnecting...')
      count++

      const delay = this._getDelay(count)
      await wait(delay)

      if (this.isOpen) break
      await this._setupWs()
    }

    this.reconnecting = false
  }
}
