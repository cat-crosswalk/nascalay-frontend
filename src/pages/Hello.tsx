import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api, { Room } from '/@/utils/apis/index'

const Hello = () => {
  const PurpleDiv = styled.div`
    color: purple;
    font-size: 10em;
  `

  const { name } = useParams()
  const [room, setRoom] = useState<Room | null>(null)
  useEffect(() => {
    ;(async () => {
      const res = await api.getRoom('xxxxRoomIDxxxxx')
      setRoom(res.data)
    })()
  }, [])

  return (
    <div>
      <p>{room?.roomId}</p>
      <PurpleDiv>Hello {`${name ?? 'React'} !`}</PurpleDiv>
      <Link to="/">Go to home</Link>
    </div>
  )
}

export default Hello
