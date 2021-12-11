import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useAppDispatch, useAppSelector } from '/@/store/hooks'
import AvatarIcon from '/@/components/AvatarIcon'
import { User } from '/@/utils/apis'

import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'
import { wsListener, WsEvent } from '/@/websocket'
import { setShowNext, setShowNow } from '/@/store/slice/status'

const ShowAnswerCard = () => {
  const userInit: User = {
    userId: 'aaaaa',
    username: 'aaaaa',
    avatar: {
      type: 0,
      color: '#fff',
    },
  }
  const dispatch = useAppDispatch()
  const nextShow = useAppSelector((state) => state.status.showNext)
  const [answer, setAnswer] = useState('')
  const [user, setUser] = useState<User>(userInit)

  useEffect(() => {
    const getAnswer = (e: CustomEvent) => {
      const body = e.detail
      setAnswer(body.answer)
      // setUser(body.user) TODO: oapiに追従する
      dispatch(setShowNext(body.next))
      dispatch(setShowNow('answer'))
    }
    wsListener.addEventListener(WsEvent.ShowAnswer, getAnswer as EventListener)

    return () => {
      wsListener.removeEventListener(
        WsEvent.ShowAnswer,
        getAnswer as EventListener
      )
    }
  }, [dispatch])

  useEffect(() => {
    if (nextShow === 'odai') {
      setAnswer('')
      setUser(userInit)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextShow])

  return (
    <div css={[answerContainer, card]}>
      <div css={answerStyle}>
        <p>{answer}</p>
      </div>
      <div css={userStyle}>
        <AvatarIcon avatar={user.avatar} size={72} />
        <p>{user.username}</p>
      </div>
    </div>
  )
}

const answerContainer = css`
  width: 100%;
  display: flex;
  padding: 18px 48px;
  background-color: ${colorToRgb.red};
  font-size: 1.5rem;
}`

const answerStyle = css`
  position: relative;
  flex-grow: 1;
  background: ${colorToRgb.white};
  padding: 10px;
  text-align: center;
  border: 3px solid ${colorToRgb.black};
  color: ${colorToRgb.black};
  font-size: 1.5rem;
  margin: 5px 0px;
  margin-right: 50px;
  &::after,
  ::before {
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    pointer-events: none;
    position: absolute;
    left: 100%;
    top: 34%;
  }
  &::after {
    border-color: rgba(0, 153, 255, 0);
    border-top-width: 6px;
    border-bottom-width: 6px;
    border-left-width: 26px;
    border-right-width: 26px;
    margin-top: -6px;
    border-left-color: ${colorToRgb.white};
  }
  &::before {
    border-color: rgba(0, 0, 0, 0);
    border-top-width: 9px;
    border-bottom-width: 9px;
    border-left-width: 39px;
    border-right-width: 39px;
    margin-top: -9px;
    margin-left: 3px;
    border-left-color: ${colorToRgb.black};
  }
  & p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const userStyle = css`
  flex-shrink: 0;
  text-align: center;
`

export default ShowAnswerCard
