import React, { useEffect } from 'react'
import { useAppSelector } from '/@/store/hooks'
import { setupWebSocket } from '/@/websocket'

// 待機部屋(ROOM)
const Lobby = () => {
  const userId = useAppSelector((state) => state.user.userId)
  useEffect(() => {
    // websocket接続
    setupWebSocket(userId)
  }, [])

  return (
    <div>
      <h1>Lobby</h1>
    </div>
  )
}

export default Lobby
