import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import Canvas, {
  Handler as CanvasHandler,
  Props as CanvasProps,
} from '/@/components/Canvas'

export type Props = {
  width: number
  height: number
  disableSquares?: ('top' | 'bottom' | 'left' | 'right')[]
} & CanvasProps

export type Handler = {
  export(): ImageData
} & CanvasHandler

const MainCanvas: React.ForwardRefRenderFunction<Handler, Props> = (
  props,
  ref
) => {
  const mainCanvasRef = React.useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = mainCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#B6B9C1'
        ctx.fillRect(0, 0, canvas.width / 7, canvas.height / 7)
        ctx.fillRect(
          (canvas.width * 6) / 7,
          0,
          canvas.width / 7,
          canvas.height / 7
        )
        ctx.fillRect(
          0,
          (canvas.height * 6) / 7,
          canvas.width / 7,
          canvas.height / 7
        )
        ctx.fillRect(
          (canvas.width * 6) / 7,
          (canvas.height * 6) / 7,
          canvas.width / 7,
          canvas.height / 7
        )
        if (props.disableSquares !== undefined) {
          if ('top' in props.disableSquares) {
            ctx.fillRect(
              canvas.width / 7,
              0,
              (canvas.width * 5) / 7,
              canvas.height / 7
            )
          }
          if ('bottom' in props.disableSquares) {
            ctx.fillRect(
              canvas.width / 7,
              (canvas.height * 6) / 7,
              (canvas.width * 5) / 7,
              canvas.height / 7
            )
          }
          if ('left' in props.disableSquares) {
            ctx.fillRect(
              0,
              canvas.height / 7,
              canvas.width / 7,
              (canvas.height * 5) / 7
            )
          }
          if ('right' in props.disableSquares) {
            ctx.fillRect(
              (canvas.width * 6) / 7,
              canvas.height / 7,
              canvas.width / 7,
              (canvas.height * 5) / 7
            )
          }
        }
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(canvas.width / 7, 0)
        ctx.lineTo(canvas.width / 7, canvas.height)
        ctx.moveTo((canvas.width * 6) / 7, 0)
        ctx.lineTo((canvas.width * 6) / 7, canvas.height)
        ctx.moveTo(0, canvas.height / 7)
        ctx.lineTo(canvas.width, canvas.height / 7)
        ctx.moveTo(0, (canvas.height * 6) / 7)
        ctx.lineTo(canvas.width, (canvas.height * 6) / 7)
        ctx.stroke()
        ctx.closePath()
      }
    }
  }, [mainCanvasRef, props.disableSquares])

  return (
    <div
      css={css`
        position: relative;
        width: ${props.width}px;
        height: ${props.height}px;
        border: 1px solid #000;
        overflow: hidden;
        margin: 8px;
      `}
    >
      <canvas
        ref={mainCanvasRef}
        width={props.width}
        height={props.height}
        css={css`
          position: absolute;
          top: 0;
          left: 0;
        `}
      />
      <span
        css={css`
          position: absolute;
          top: ${props.height / 7}px;
          left: ${props.width / 7}px;
          z-index: 4;
        `}
      >
        <Canvas
          {...props}
          width={(props.width * 5) / 7}
          height={(props.height * 5) / 7}
          ref={ref}
        />
      </span>
    </div>
  )
}

export default React.forwardRef(MainCanvas)
