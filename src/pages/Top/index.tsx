import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { css } from '@emotion/react'
import { colorToRgb } from '/@/utils/color'
import { card } from '/@/utils/card'
import { closeWebSocket } from '/@/websocket'
import api from '/@/utils/apis'

import PlayerName from './PlayerName'
import AvatarSelect from './AvatarSelect'

// TODO:クエリがある場合は，招待リンクを踏んだパターンとして表示を変える
// 招待リンク ?c=xxxxxroomIdxxxxx
const Top = () => {
  const { search } = useLocation()
  const [roomId, setRoomId] = useState<string | null>(null)
  const [hostName, setHostName] = useState<string | null>(null)

  useEffect(() => {
    closeWebSocket()
    const id = new URLSearchParams(search).get('c')
    setRoomId(id)
    // 招待リンクを踏んだ場合は，部屋ホストのユーザー名を取得する
    if (id !== null && id.length !== 0) {
      const getHostName = async () => {
        const res = await api.getRoom(id)
        if (res.status !== 200) return
        const name =
          res.data.members.find((m) => m.userId === res.data.hostId)
            ?.username ?? null
        setHostName(name)
      }
      getHostName()
    }
  }, [search])

  return (
    <div css={pageContainer}>
      <div css={[card, title]}>
        <p>{hostName ? `${hostName}から招待されました！` : 'ゲームを始める'}</p>
      </div>
      <div css={container}>
        <div>
          <AvatarSelect />
        </div>
        <div css={width100}>
          <PlayerName roomId={roomId} />
        </div>
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
  background-color: ${colorToRgb.red};
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

const width100 = css`
  width: 100%;
`

export default Top
