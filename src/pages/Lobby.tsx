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
        <p>待機部屋</p>
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
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 5%;
`

const title = css`
  width: auto;
  display: inline-block;
  background-color: ${colorToRgb.yellow};
  font-size: 2rem;
  line-height: 2rem;
  vertical-align: middle;
  margin: 1rem 0;
  padding: 1rem 2rem;
`

const container = css`
  display: flex;
  gap: 2rem;
`

export default Lobby
