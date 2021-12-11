import React from 'react'
import { css } from '@emotion/react'
import { colorToRgb } from '/@/utils/color'
import { card } from '/@/utils/card'
import MemberList from '/@/components/MemberList'
import ThemeInput from './ThemInput'
import LineTimerCard from '/@/components/LineTimerCard'
import { useAppSelector } from '/@/store/hooks'

// お題を入力するページ(ODAI)
const Theme = () => {
  const maxTimeMs = useAppSelector((state) => state.theme.timeLimit * 1000)
  return (
    <div>
      <div css={pageContainer}>
        <div css={headerWrap}>
          <div css={[card, title]}>
            <p>お題決め</p>
          </div>
          <div css={timerStyle}>
            <LineTimerCard
              maxValueMs={maxTimeMs}
              width="100%"
              hasShadow={true}
            />
          </div>
        </div>
        <div css={container}>
          <MemberList />
          <ThemeInput />
        </div>
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

const container = css`
  display: flex;
  gap: 2rem;
  min-height: 60vh;
`

export default Theme
