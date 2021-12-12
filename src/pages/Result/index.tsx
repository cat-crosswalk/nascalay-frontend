import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'

import ShowOdaiCard from './ShowOdaiCard'
import ShowCanvasCard from './ShowCanvasCard'
import ShowAnswerCard from './ShowAnswerCard'
import FlatButton from '/@/components/FlatButton'
import { useAppSelector, useAppDispatch } from '/@/store/hooks'
import { wsSend } from '/@/websocket'
import { setBgColor } from '/@/store/slice/status'
import { setBeforeUnload, removeBeforeUnload } from '/@/utils/beforeunload'

// 回答表示するページ(SHOW)
const Result = () => {
  useEffect(() => {
    setBeforeUnload()
    return () => {
      removeBeforeUnload()
    }
  })

  const dispatch = useAppDispatch()
  dispatch(setBgColor('#96A0C0'))
  const [btnText, setBtnText] = useState('結果を見る')
  const hostId = useAppSelector((state) => state.room.hostId)
  const myId = useAppSelector((state) => state.user.userId)
  const showNext = useAppSelector((state) => state.status.showNext)
  const showNow = useAppSelector((state) => state.status.showNow)
  const btnNext = useCallback(() => {
    if (showNext === 'end') {
      // goto robby
      wsSend.returnRoom()
    } else {
      // send next
      wsSend.showNext()
    }
  }, [showNext])
  useEffect(() => {
    if (showNext === 'end') {
      setBtnText('ロビーへ')
    } else {
      if (showNow === '') return
      setBtnText('次へ')
    }
  }, [showNext, showNow])
  return (
    <div css={pageContainer}>
      <ShowOdaiCard />
      <ShowCanvasCard />
      <ShowAnswerCard />
      <div css={nextBtnStyle}>
        <FlatButton
          color="red"
          text={btnText}
          onClick={btnNext}
          disabled={hostId !== myId}
        />
      </div>
    </div>
  )
}

const pageContainer = css`
  position: relative;
  width: 90%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-right: 310px;
  padding-left: 100px;
  padding-top: 1%;
`

const nextBtnStyle = css`
  position: absolute;
  bottom: 0;
  right: 0;
`

export default Result
