import React, { useState, useCallback } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '/@/store/hooks'
import api, { JoinRoomRequest, CreateRoomRequest } from '/@/utils/apis'
import { setRoom } from '/@/store/slice/room'
import { setUser } from '/@/store/slice/user'
import { colorToRgb } from '/@/utils/color'

import { card } from '/@/utils/card'
import FlatButton from '/@/components/FlatButton'

interface Props {
  roomId: string | null
}

const PlayerName = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [userName, setUserName] = useState('')
  const avatar = useAppSelector((state) => state.user.avatar)
  const playerNameHandler = useCallback((e) => {
    setUserName(e.target.value.trim())
  }, [])

  const goRobby = useCallback(async () => {
    if (props.roomId !== null && props.roomId.length !== 0) {
      // 招待リンクを踏んだ場合
      const request: JoinRoomRequest = {
        roomId: props.roomId,
        username: userName,
        avatar: avatar,
      }
      const { data } = await api.joinRoom(request)
      dispatch(setRoom(data))
      dispatch(setUser({ avatar, username: userName, userId: data.userId }))
    } else {
      // 新規ルーム作成
      const request: CreateRoomRequest = {
        username: userName,
        avatar: avatar,
        capacity: 17,
      }
      const { data } = await api.createRoom(request)
      dispatch(setUser({ avatar, username: userName, userId: data.userId }))
      dispatch(setRoom(data))
    }
    navigate('/lobby', { replace: false })
  }, [props.roomId, navigate, userName, avatar, dispatch])
  return (
    <div css={[containerStyle, card]}>
      <h2 css={titleStyle}>プレイヤー名</h2>
      <input
        type="text"
        value={userName}
        onChange={playerNameHandler}
        placeholder="なまえ"
        css={inputNameStyle}
      />
      <div css={goLobbyStyle}>
        <FlatButton
          text={props.roomId !== null && props.roomId.length !== 0 ? '参加' : '部屋を作る'}
          color="yellow"
          onClick={goRobby}
          disabled={userName === ''}
        />
      </div>
    </div>
  )
}

const containerStyle = css`
  width: 100%;
  background-color: ${colorToRgb.blue};
  padding: 36px 48px;
  padding-top: 12px;
  min-height: 479px;
`

const inputNameStyle = css`
  background-color: ${colorToRgb.white};
  border: 3px solid ${colorToRgb.black};
  font-size: 1.5rem;
  line-height: 64px;
  vertical-align: middle;
  padding-left: 1rem;
  width: 100%;
  height: 64px;
  margin: 2rem 0px;
`

const titleStyle = css`
  font-size: 2rem;
  line-height: 6rem;
`

const goLobbyStyle = css`
  padding-top: 4rem;
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`

export default PlayerName
