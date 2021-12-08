import React, { useEffect } from 'react'
import { useAppSelector } from '/@/store/hooks'
import { setupWebSocket } from '/@/websocket'

// 待機部屋(ROOM)
const Lobby = () => {
  const userId = useAppSelector((state) => state.user.userId)
  useEffect(() => {
    // websocket接続
    setupWebSocket(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Lobby</h1>
    </div>
  )
}

export default Lobby
