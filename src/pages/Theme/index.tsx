import React from 'react'
import { css } from '@emotion/react'
import { colorToRgb } from '/@/utils/color'
import { card } from '/@/utils/card'
import MemberList from '/@/components/MemberList'
import ThemeInput from './ThemInput'
import LineTimer from '/@/components/LineTimer'
import { useAppSelector } from '/@/store/hooks'

// お題を入力するページ(ODAI)
const Theme = () => {
  const maxTimeMs = useAppSelector(state => state.theme.timeLimit * 1000)
  return (
    <div>
      <div css={pageContainer}>
        <div css={headerWrap}>
          <div css={[card, title]}>
            <p>お題決め</p>
          </div>
          <div css={timerStyle}>
            <div>
              <LineTimer maxValueMs={maxTimeMs} width="500px" height="30px" />
            </div>
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
  display: flex;
  gap: 30px;
`

const timerStyle = css`
  width; 100%;
  & div
`

const title = css`
  width: auto;
  display: inline-block;
  background-color: ${colorToRgb.yellow};
  font-size: 2rem;
  line-height: 2rem;
  vertical-align: middle;
  margin: 1rem 0;
  padding: 1rem 2rem;
`

const container = css`
  display: flex;
  gap: 2rem;
  min-height: 60vh;
`

export default Theme
