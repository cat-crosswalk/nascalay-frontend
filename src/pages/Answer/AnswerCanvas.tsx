import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'

import { card } from '/@/utils/card'
import { useAppSelector } from '/@/store/hooks'

const AnswerCanvas = () => {
  const canvasWidth = 400
  const canvasHeight = 400
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageData = useAppSelector((state) => state.answer.img)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvas.getContext('2d')!
    if (imageData === '') {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      return
    }
    const img = new Image()
    img.src = imageData
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
    }
  }, [imageData])
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
