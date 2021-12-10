import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { useAppSelector } from '/@/store/hooks'
import { setupWebSocket } from '/@/websocket'
import GameSetting from '/@/components/GameSetting'
import MemberList from '/@/components/MemberList'

import { colorToRgb } from '/@/utils/color'
import { card } from '/@/utils/card'

// 待機部屋(ROOM)
const Lobby = () => {
  const userId = useAppSelector((state) => state.user.userId)
  useEffect(() => {
    // websocket接続
    if (userId == '') return
    setupWebSocket(userId)
  }, [userId])

  return (
    <div css={pageContainer}>
      <div css={[card, title]}>
        <span>待機部屋</span>
      </div>
      <div css={container}>
        <MemberList />
        <GameSetting />
      </div>
    </div>
  )
}

const pageContainer = css`
  width: 80%;
  max-width: 1024px;
  margin: 0 auto;
`

const title = css`
  display: flex;
  background-color: ${colorToRgb.yellow};
  margin: 1em 0;
  padding: 1em 4em;
`

const container = css`
  display: flex;
`

export default Lobby
