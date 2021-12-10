import React, { useEffect } from 'react'
import { useAppSelector } from '/@/store/hooks'
import { setupWebSocket } from '/@/websocket'

// 待機部屋(ROOM)
const Lobby = () => {
  const userId = useAppSelector((state) => state.user.userId)
  useEffect(() => {
    // websocket接続
    if (userId == '') return
    setupWebSocket(userId)
  }, [userId])

  return (
    <div>
      <h1>Lobby</h1>
    </div>
  )
}

export default Lobby
