import { css } from '@emotion/react'
import React, { useEffect, useMemo, useRef } from 'react'

type Props = {
  boardType: '5x5'
  drawnArea: [number, number][]
  targetArea: [number, number]
  img: string | null
  width: string
  isColored?: boolean
  type: 'large' | 'small'
}

const PreviewCanvas = (props: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const maskCanvasRef = useRef<HTMLCanvasElement>(null)
  const drawnArea2D = useMemo(() => {
    switch (props.boardType) {
      case '5x5': {
        const result = [...Array(5)]
          .fill(0)
          .map((): boolean[] => [...Array(5)].fill(false))
        props.drawnArea.forEach(([x, y]) => {
          result[y][x] = true
        })
        return result
      }
    }
  }, [props.boardType, props.drawnArea])

  useEffect(() => {
    const canvas = canvasRef.current
    const maskCanvas = maskCanvasRef.current
    if (!canvas || !maskCanvas) return
    const ctx = canvas.getContext('2d')
    const maskCtx = maskCanvas.getContext('2d')
    if (!ctx || !maskCtx) return
    const imageData = ctx.createImageData(canvas.width, canvas.height)
    if (props.img !== null) {
      const img = new Image()
      img.onload = () => {
        console.log('loaded')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      img.src = props.img
    }
    ctx.putImageData(imageData, 0, 0)

    switch (props.boardType) {
      case '5x5': {
        const nearTarget = (i: number, j: number) =>
          Math.abs(i - props.targetArea[0]) +
            Math.abs(j - props.targetArea[1]) <=
          1
        const calcColor = (x: number, y: number): `#${string}` => {
          if (!props.isColored) return '#B2B8CB'
          if (nearTarget(x, y)) return '#B2B8CB'
          switch ((x + y) % 3) {
            case 0:
              return '#F29A8C'
            case 1:
              return '#F6DF93'
            case 2:
              return '#A0A7E9'
          }
          return '#B2B8CB'
        }
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            if (nearTarget(i, j) && drawnArea2D[i][j]) continue
            if (i == props.targetArea[0] && j == props.targetArea[1]) continue
            maskCtx.fillStyle = calcColor(i, j)
            maskCtx.fillRect(
              (i * canvas.width) / 5,
              (j * canvas.height) / 5,
              canvas.width / 5,
              canvas.height / 5
            )
            if (!drawnArea2D[i][j]) continue
            maskCtx.strokeStyle = '#000000'
            maskCtx.beginPath()
            maskCtx.moveTo(
              (i * canvas.width) / 5 + canvas.width / (5 * 4),
              (j * canvas.height) / 5 + canvas.height / (5 * 2)
            )
            maskCtx.lineTo(
              (i * canvas.width) / 5 + (canvas.width * 3) / (5 * 7),
              (j * canvas.height) / 5 + (canvas.height * 5) / (5 * 7)
            )
            maskCtx.lineTo(
              (i * canvas.width) / 5 + (canvas.width * 3) / (5 * 4),
              (j * canvas.height) / 5 + canvas.height / (5 * 3)
            )
            maskCtx.stroke()
            maskCtx.closePath()
          }
        }
      }
    }
  }, [
    drawnArea2D,
    props.boardType,
    props.img,
    props.isColored,
    props.targetArea,
  ])

  return (
    <div
      css={css`
        position: relative;
        width: ${props.width};
        &:before {
          content: '';
          display: block;
          padding-top: 100%;
        }
      `}
    >
      <canvas
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          height: 100%;
          width: 100%;
        `}
        width={512}
        height={512}
        ref={canvasRef}
      />
      <canvas
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          height: 100%;
          width: 100%;
        `}
        width={512}
        height={512}
        ref={maskCanvasRef}
      />
    </div>
  )
}

export default PreviewCanvas
