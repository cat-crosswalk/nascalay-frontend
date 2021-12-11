import React, { useRef } from 'react'
import { css } from '@emotion/react'

import { card } from '/@/utils/card'

const AnswerCanvas = () => {
  const canvasWidth = 400
  const canvasHeight = 400
  const canvasRef = useRef<HTMLCanvasElement>(null)
  return (
    <div css={[container]}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        css={[canvasStyle, card]}
      ></canvas>
    </div>
  )
}

const container = css`
  width: 100%;
  display: flex;
  justify-content: center;
`

const canvasStyle = css`
  width: calc(96vh - 300px);
  height: calc(96vh - 300px);
`

export default AnswerCanvas
