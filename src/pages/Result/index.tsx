import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'

import ShowOdaiCard from './ShowOdaiCard'
import ShowCanvasCard from './ShowCanvasCard'
import ShowAnswerCard from './ShowAnswerCard'
import FlatButton from '/@/components/FlatButton'
import { Icon } from '@mdi/react'
import { mdiTrayArrowDown } from '@mdi/js'
import { useAppSelector, useAppDispatch } from '/@/store/hooks'
import { wsSend } from '/@/websocket'
import { setBgColor } from '/@/store/slice/status'
import { colorToRgb } from '/@/utils/color'
import { saveResultAsImage } from './saveImage'
import { card } from '/@/utils/card'

// 回答表示するページ(SHOW)
const Result = () => {
  const dispatch = useAppDispatch()
  dispatch(setBgColor('#96A0C0'))
  const [btnText, setBtnText] = useState('結果を見る')
  const hostId = useAppSelector((state) => state.room.hostId)
  const myId = useAppSelector((state) => state.user.userId)
  const showNext = useAppSelector((state) => state.status.showNext)
  const showNow = useAppSelector((state) => state.status.showNow)

  const result = useAppSelector((state) => state.result)
  const exportResultImage = useCallback(async () => {
    await saveResultAsImage(result)
  }, [result])

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
        <div css={downloadWrap}>
          <button onClick={exportResultImage} css={[downloadButtonStyle, card]}>
            <Icon path={mdiTrayArrowDown} size={1.5} />
          </button>
        </div>
        <FlatButton
          color="red"
          text={btnText}
          onClick={btnNext}
          disabled={hostId !== myId}
          hasShadow
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

const downloadWrap = css`
  position: relative;
  margin: 12px 0px;
`

const downloadButtonStyle = css`
  background-color: ${colorToRgb.yellow};
  width: 64px;
  height: 64px;
  &::after {
    position: absolute;
    content: '';
    width: 64px;
    height: 64px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0);
    transition: all 0.2s ease-out;
  }
  &:hover::after {
    background-color: rgba(255, 255, 255, 0.15);
  }
  &:active::after {
    background-color: rgba(0, 0, 0, 0.15);
  }
  :before {
    position: absolute;
    content: '';
    transition: all 0.2s ease-out;
  }
`

export default Result
