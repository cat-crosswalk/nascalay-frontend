import React from 'react'
import { css } from '@emotion/react'
import { colorToRgb } from '/@/utils/color'
import { card } from '/@/utils/card'
import MemberList from '/@/components/MemberList'
import ThemeInput from './ThemInput'

// お題を入力するページ(ODAI)
const Theme = () => {
  return (
    <div>
      <div css={pageContainer}>
        <div css={[card, title]}>
          <p>待機部屋</p>
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

const title = css`
  width: auto;
  display: inline-block;
  background-color: ${colorToRgb.yellow};
  font-size: 2rem;
  line-height: 2rem;
  vertical-align: middle;
  margin: 1rem 0;
  padding: 1rem 4rem;
`

const container = css`
  display: flex;
  gap: 2rem;
  min-height: 60vh;
`

export default Theme
