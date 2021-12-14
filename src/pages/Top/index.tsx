import React from 'react'
import { css } from '@emotion/react'
import { colorToRgb } from '/@/utils/color'
import { card } from '/@/utils/card'

import PlayerName from './PlayerName'
import AvatarSelect from './AvatarSelect'
import { Link } from 'react-router-dom'

// TODO:クエリがある場合は，招待リンクを踏んだパターンとして表示を変える
// 招待リンク ?c=xxxxxroomIdxxxxx
const Top = () => {
  // TODO: アバター
  return (
    <div css={pageContainer}>
      <Link to="/draw">to draw</Link>
      <div css={[card, title]}>
        <p>ゲームを始める</p>
      </div>
      <div css={container}>
        <div>
          <AvatarSelect />
        </div>
        <div css={width100}>
          <PlayerName />
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
  background-color: ${colorToRgb.red};
  font-size: 2rem;
  line-height: 2rem;
  vertical-align: middle;
  margin: 1rem 0;
  padding: 1rem 2rem;
`

const container = css`
  display: flex;
  gap: 2rem;
`

const width100 = css`
  width: 100%;
`

export default Top
