import React, { useCallback, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { setRoom } from '../store/slice/room'
import { setUser } from '../store/slice/user'
import { useAppDispatch } from '/@/store/hooks'
import api, { JoinRoomRequest, CreateRoomRequest } from '/@/utils/apis'

// TODO:クエリがある場合は，招待リンクを踏んだパターンとして表示を変える
// 招待リンク ?c=xxxxxroomIdxxxxx
const Index = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [userName, setUserName] = useState('')
  const [avatar, setAvatar] = useState(0)

  const search = useLocation().search
  const roomId = new URLSearchParams(search).get('c')

  const goRobby = useCallback(async () => {
    if (roomId) {
      // 招待リンクを踏んだ場合
      const request: JoinRoomRequest = {
        roomId: roomId,
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
        capacity: 6,
      }
      const { data } = await api.createRoom(request)
      dispatch(setUser({ avatar, username: userName, userId: data.userId }))
      dispatch(setRoom(data))
    }
    navigate('/lobby', { replace: false })
  }, [avatar, userName, dispatch, roomId, navigate])

  // TODO: アバター
  return (
    <>
      <p>プレイヤー名</p>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Your Name"
      />
      <p>アバター(TODO)</p>
      <input
        type="number"
        value={avatar}
        onChange={(e) => setAvatar(Number(e.target.value))}
      />
      <button type="button" onClick={goRobby}>
        {roomId ? '参加' : '部屋をつくる'}
      </button>
    </>
  )
}

export default Index
