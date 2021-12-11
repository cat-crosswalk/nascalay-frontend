import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import AvatarIcon from '/@/components/AvatarIcon'
import { User } from '/@/utils/apis'
import { useAppDispatch } from '/@/store/hooks'
import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'
import { setShowNext, setShowNow } from '/@/store/slice/status'
import { wsListener, WsEvent } from '/@/websocket'
import OdaiBoard from '/@/components/OdaiBoard'

const ShowOdaiCard = () => {
  const initUser: User = {
    userId: '',
    username: '',
    avatar: {
      type: 0,
      color: '#fff',
    },
  }
  const [theme, setTheme] = useState('')
  const [user, setUser] = useState<User>(initUser)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const getOdai = (e: CustomEvent) => {
      const body = e.detail
      setTheme(body.odai)
      setUser(body.user)
      dispatch(setShowNext(body.next))
      dispatch(setShowNow('odai'))
    }
    wsListener.addEventListener(WsEvent.ShowOdai, getOdai as EventListener)

    return () => {
      wsListener.removeEventListener(WsEvent.ShowOdai, getOdai as EventListener)
    }
  }, [dispatch])

  return (
    <div css={[cardContainer, card]}>
      <div css={userStyle}>
        <AvatarIcon avatar={user.avatar} size={72} />
        <p>{user.username}</p>
      </div>
      <div css={odaiBoardStyle}>
        <OdaiBoard text={theme} width={'100%'} height={'88px'} />
      </div>
    </div>
  )
}

const cardContainer = css`
  width: 100%;
  display: flex;
  padding: 18px 48px;
  background-color: ${colorToRgb.red};
  font-size: 1.5rem;
`

const userStyle = css`
  flex-shrink: 0;
  text-align: center;
  margin-right: 2rem;
`
const odaiBoardStyle = css`
  flex-grow: 1;
`

export default ShowOdaiCard
