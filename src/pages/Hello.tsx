import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import api, { Room } from '/@/utils/apis/index'
import { setupWebSocket, wsSend, wsListener, WsEvent } from '/@/websocket/index'

import { useAppSelector } from '/@/store/hooks'

const Hello = () => {
  const PurpleDiv = styled.div`
    color: purple;
    font-size: 10em;
  `

  // test *********
  // TODO: webSocketに接続するときに1回呼び出せれば良いので，どこに置くか考えておく
  setupWebSocket(useAppSelector((state) => state.user.userId))
  // **************

  const { name } = useParams()
  const [room, setRoom] = useState<Room | null>(null)
  useEffect(() => {
    ;(async () => {
      const { data } = await api.getRoom('xxxxRoomIDxxxxx')
      setRoom(data)
    })()
  }, [])

  // これで，DrawStartイベントを受け取ることができる
  wsListener.addEventListener(WsEvent.DrawStart, ((e: CustomEvent) => {
    console.log('draw start', e.detail)
  }) as EventListener)

  // wsSend.~~~でwsを送信する
  return (
    <div>
      <button onClick={() => wsSend.requestGameStart()}>req gamestart</button>
      <p>{room?.roomId}</p>
      <PurpleDiv>Hello {`${name ?? 'React'} !`}</PurpleDiv>
      <Link to="/">Go to home</Link>
    </div>
  )
}

export default Hello
