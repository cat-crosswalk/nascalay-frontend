export interface Options {
  maxReconnectionDelay: number
  minReconnectionDelay: number
  connectionTimeout: number
}

const defaultOptions: Options = {
  maxReconnectionDelay: 10000,
  minReconnectionDelay: 1000,
  connectionTimeout: 4000,
}

// TODO: Reconnectの処理を考えておく
export default class AutoReconnectWebSocket {
  _ws?: WebSocket
  // SafariでEventTargetのコンストラクタ使えないのでDocumentFragmentで代用
  // らしい by traQ-UI
  readonly eventTarget: EventTarget = document.createDocumentFragment()

  readonly url: string
  readonly protocols: string | string[] | undefined
  readonly options: Readonly<Options>

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

  send(message: string, body: any | undefined) {
    // TODO anyを消す
    // TODO: WebSocketが未接続とかで送信できなかった場合の処理
    if (this.isOpen) {
      const json = JSON.stringify({ type: message, body })
      this._ws?.send(json)
    }
  }

  _setupWs() {
    return new Promise<void>((resolve) => {
      this._ws = new WebSocket(this.url, this.protocols)

      this._ws.addEventListener(
        'open',
        () => {
          resolve()
          console.log('ws open')
        },
        { once: true }
      )

      this._ws.addEventListener('close', () => {
        console.log('ws close')
      })

      this._ws.addEventListener(
        'error',
        (e) => {
          resolve()
          console.log('ws error', e)
        },
        { once: true }
      )

      this._ws.addEventListener('message', (e) => {
        console.log('ws message', e)
        this.eventTarget.dispatchEvent(
          new CustomEvent('message', { detail: e.data })
        )
      })
    })
  }

  connect() {
    if (!this.isOpen) {
      this._setupWs()
    }
  }

  close() {
    this._ws?.close()
  }
}
