import { css } from '@emotion/react'
import React, { useCallback, useRef, useState } from 'react'

type Props = {
  color: `#${string}`
  size: number
}

const Canvas: React.VFC<Props> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMouseDown, setMouseDown] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })

  const getPos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const rect = canvasRef.current!.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    },
    []
  )
  const mouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setLastPos(getPos(e))
    setMouseDown(true)
  }, [])
  const mouseUp = useCallback(() => setMouseDown(false), [])
  const mouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDown) return
    const pos = getPos(e)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvasRef.current!.getContext('2d')!
    ctx.fillStyle = '#ff0000'
    ctx.beginPath()
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    ctx.closePath()

    setLastPos(pos)
  }, [isMouseDown, lastPos])

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseOut={mouseUp}
        onMouseMove={mouseMove}
        css={css({
          border: '1px solid #000',
        })}
      ></canvas>
    </div>
  )
}

export default Canvas
