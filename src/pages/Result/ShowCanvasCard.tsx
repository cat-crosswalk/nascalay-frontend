import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'

import { testImage } from './testImage'
import { colorToRgb } from '/@/utils/color'

const ShowCanvasCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWidth = 400
  const canvasHeight = 400
  const verticalDivision = 5
  const horizontalDivision = 5

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    img.src = testImage
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
    }
  }, [])

  // TODO: ?キャンバスアニメーション
  return (
    <div css={canvasContainer}>
      <div>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          css={canvasStyle}
        ></canvas>
      </div>
    </div>
  )
}
const canvasContainer = css`
  display: flex;
  justify-content: center;
  padding: 20px;
`

const canvasStyle = css`
  width: calc(96vh - 320px);
  height: calc(96vh - 320px);
  border: 3px solid ${colorToRgb.black};
`

export default ShowCanvasCard
