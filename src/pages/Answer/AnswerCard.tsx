import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'

import DoneButton from '/@/components/DoneButton'
import { WsEvent, wsListener, wsSend } from '/@/websocket'

const AnswerCard = () => {
  const [isDone, setIsDone] = useState(false)
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [answer, setAnswer] = useState('')
  const answerReady = useCallback((e) => {
    setIsDone(e)
    setIsReadOnly(e)
    // wsSend
    if (e) {
      wsSend.answerReady()
    } else {
      wsSend.answerCancel()
    }
  }, [])

  const inputHandler = useCallback((e) => {
    setAnswer(e.target.value)
  }, [])

  useEffect(() => {
    wsSend.answer = answer
  }, [answer])
  useEffect(() => {
    const answerSend = () => {
      wsSend.answerSend()
    }
    wsListener.addEventListener(WsEvent.AnswerFinish, answerSend)

    return () => {
      wsListener.removeEventListener(WsEvent.AnswerFinish, answerSend)
    }
  }, [])
  return (
    <div css={[container, card]}>
      <h2 css={titleStyle}>お題を予想しよう</h2>
      <input
        type="text"
        placeholder="イラストのお題は？"
        value={answer}
        onChange={inputHandler}
        readOnly={isReadOnly}
        css={inputStyle}
      />
      <div css={doneButtonStyle}>
        <DoneButton
          text="完了"
          doneText="編集"
          color="red"
          doneColor="yellow"
          isDone={isDone}
          onClick={answerReady}
        />
      </div>
    </div>
  )
}

const container = css`
  position: relative;
  width: 100%;
  background-color: ${colorToRgb.blue};
  padding: 36px 48px;
  padding-top: 12px;
`

const inputStyle = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 40%;
  left: 50%;
  background-color: ${colorToRgb.white};
  width: calc(100% - 84px);
  height: 64px;
  border: 3px solid ${colorToRgb.black};
  font-size: 1.5rem;
  line-height: 64px;
  vertical-align: middle;
  padding-left: 1.5rem;
  color: ${colorToRgb.black};
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`

const doneButtonStyle = css`
  position: absolute;
  transform: translate(-50%, 0);
  left: 50%;
  bottom: 36px;
`

const titleStyle = css`
  font-size: 2rem;
  line-height: 6rem;
`

export default AnswerCard
