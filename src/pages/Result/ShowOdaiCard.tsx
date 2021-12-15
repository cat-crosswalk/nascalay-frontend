import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import AvatarIcon from '/@/components/AvatarIcon'
import { User, WsShowOdaiEventBody } from '/@/utils/apis'
import { useAppDispatch } from '/@/store/hooks'
import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'
import { setShowNext, setShowNow } from '/@/store/slice/status'
import { wsListener, WsEvent } from '/@/websocket'
import { complementEmpty } from '/@/utils/complementEmpty'
import OdaiBoard from '/@/components/OdaiBoard'
import { setResultOdai, setResultSender } from '/@/store/slice/result'

const ShowOdaiCard = () => {
  const [theme, setTheme] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const getOdai = (e: CustomEvent<WsShowOdaiEventBody>) => {
      const body = e.detail
      setTheme(body.odai ?? '') // 空 を表示する
      setUser(body.sender ?? null)
      dispatch(setShowNext(body.next))
      dispatch(setShowNow('odai'))
      // 画像保存用
      dispatch(setResultOdai(body.odai ?? '')) // 空 を表示する
      dispatch(setResultSender(body.sender ?? null))
    }
    wsListener.addEventListener(WsEvent.ShowOdai, getOdai as EventListener)

    return () => {
      wsListener.removeEventListener(WsEvent.ShowOdai, getOdai as EventListener)
    }
  }, [dispatch])

  return (
    <div css={[cardContainer, card]}>
      <div css={userStyle}>
        <AvatarIcon avatar={user?.avatar} size={72} />
        <p>{user?.username ?? ''}</p>
      </div>
      <div css={odaiBoardStyle}>
        <OdaiBoard
          text={complementEmpty(theme) ?? ''}
          width={'100%'}
          height={'88px'}
          inActive={user === null}
        />
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
