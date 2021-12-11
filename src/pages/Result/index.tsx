import React from 'react'
import { css } from '@emotion/react'

import ShowOdaiCard from './ShowOdaiCard'
import ShowCanvasCard from './ShowCanvasCard'
import ShowAnswerCard from './ShowAnswerCard'

// 回答表示するページ(SHOW)
const Result = () => {
  return (
    <div css={pageContainer}>
      <ShowOdaiCard />
      <ShowCanvasCard />
      <ShowAnswerCard />
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

export default Result
