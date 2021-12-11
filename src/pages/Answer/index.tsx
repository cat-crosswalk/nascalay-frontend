import React from 'react'
import { css } from '@emotion/react'
import { colorToRgb } from '/@/utils/color'
import AnswerCanvas from './AnswerCanvas'
import AnswerCard from './AnswerCard'

import { card } from '/@/utils/card'
import LineTimerCard from '/@/components/LineTimerCard'
import { useAppDispatch, useAppSelector } from '/@/store/hooks'
import { setBgColor } from '/@/store/slice/status'

// 絵を見てお題を当てるページ
const Answer = () => {
  const dispatch = useAppDispatch()
  dispatch(setBgColor('#D1A9A9'))
  const maxTimeMs = useAppSelector((state) => state.answer.timeLimit) * 1000
  return (
    <div css={pageContainer}>
      <div css={headerWrap}>
        <div css={[card, title]}>
          <p>回答</p>
        </div>
        <div css={timerStyle}>
          <LineTimerCard maxValueMs={maxTimeMs} width="100%" hasShadow={true} />
        </div>
      </div>
      <div css={container}>
        <AnswerCanvas />
        <AnswerCard />
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

const container = css`
  display: flex;
  gap: 20px;
  min-height: 350px;
`

const headerWrap = css`
  width: 100%;
  display: flex;
  gap: 30px;
  margin: 1rem 0;
`

const timerStyle = css`
  width; 100%;
  min-width:0;
  flex-grow: 1;
`

const title = css`
  flex-shrink: 0;
  display: inline-block;
  background-color: ${colorToRgb.yellow};
  font-size: 2rem;
  line-height: 2rem;
  vertical-align: middle;
  padding: 1rem 2rem;
`

export default Answer
