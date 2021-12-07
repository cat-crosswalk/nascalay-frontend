import { css } from '@emotion/react'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

type Props = {
  color: `#${string}`
  penSize: number
}
export interface Handler {
  clear(): void
}

const Canvas: React.ForwardRefRenderFunction<Handler, Props> = (
  props: Props,
  ref
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  useImperativeHandle(
    ref,
    () => ({
      clear() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const ctx = canvasRef.current!.getContext('2d')!
        ctx.clearRect(0, 0, 500, 500)
      },
    }),
    []
  )

  const getPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const rect = canvasRef.current!.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])
  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.buttons !== 1) return
      const pos = getPos(e)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ctx = canvasRef.current!.getContext('2d')!
      ctx.lineCap = 'round'
      ctx.lineWidth = props.penSize
      ctx.strokeStyle = props.color
      ctx.beginPath()
      if (lastPos !== null) {
        ctx.moveTo(lastPos.x, lastPos.y)
      } else {
        ctx.moveTo(pos.x, pos.y)
      }
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      ctx.closePath()
    },
    [props.color, props.penSize, getPos, lastPos]
  )
  const mouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      draw(e)
      setLastPos(getPos(e))
    },
    [draw, getPos]
  )
  const mouseUp = useCallback(() => setLastPos(null), [])
  const mouseOut = useCallback(() => setLastPos(null), [])
  const mouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      draw(e)
      setLastPos(getPos(e))
    },
    [draw, getPos]
  )

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseOut={mouseOut}
        onMouseMove={mouseMove}
        css={css({
          border: '1px solid #000',
        })}
      ></canvas>
    </div>
  )
}

export default forwardRef(Canvas)
