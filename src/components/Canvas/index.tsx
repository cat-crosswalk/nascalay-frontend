import { css } from '@emotion/react'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import bucketFill from './bucketFill'

export type Props = {
  color: `#${string}`
  penSize: number
  penType: 'pen' | 'eraser' | 'bucket'
}
export interface Handler {
  clear(): void
  undo(): void
  redo(): void
}

const Canvas: React.ForwardRefRenderFunction<Handler, Props> = (
  props: Props,
  ref
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  const [undoList, setUndoList] = useState<Uint8ClampedArray[]>([])
  const [redoList, setRedoList] = useState<Uint8ClampedArray[]>([])
  const saveCanvas = useCallback(() => {
    console.log('save')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvas.getContext('2d')!
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    setUndoList((prev) => [...prev, data])
    setRedoList([])
  }, [])
  const undo = useCallback(() => {
    console.log('undo', undoList)
    if (undoList.length === 0) return
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvasRef.current!.getContext('2d')!
    const nowData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    const data = undoList[undoList.length - 1]
    setUndoList((prev) => [...prev.slice(0, -1)])
    setRedoList((prev) => [...prev, nowData])
    console.log('undo', undoList)
    ctx.putImageData(
      new ImageData(new Uint8ClampedArray(data), canvas.width, canvas.height),
      0,
      0
    )
  }, [undoList])
  const redo = useCallback(() => {
    console.log('redo', redoList)
    if (redoList.length === 0) return
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvasRef.current!.getContext('2d')!
    const nowData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    const data = redoList[redoList.length - 1]
    setUndoList((prev) => [...prev, nowData])
    setRedoList((prev) => prev.slice(0, -1))
    ctx.putImageData(
      new ImageData(new Uint8ClampedArray(data), canvas.width, canvas.height),
      0,
      0
    )
  }, [redoList])
  const clear = useCallback(() => {
    saveCanvas()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvasRef.current!.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [saveCanvas])

  useImperativeHandle(
    ref,
    () => ({
      clear() {
        clear()
      },
      undo() {
        undo()
      },
      redo() {
        redo()
      },
    }),
    [undo, redo, clear]
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
  const erase = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.buttons !== 1) return
      const pos = getPos(e)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ctx = canvasRef.current!.getContext('2d')!
      ctx.lineCap = 'round'
      ctx.lineWidth = props.penSize
      ctx.strokeStyle = '#fff'
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
  const bucket = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.buttons !== 1) return
      const { x, y } = getPos(e)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      bucketFill(canvasRef.current!, x, y, props.color)
    },
    [getPos, props.color]
  )
  const mouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      saveCanvas()
      if (props.penType === 'pen') {
        draw(e)
      } else if (props.penType === 'eraser') {
        erase(e)
      } else if (props.penType === 'bucket') {
        bucket(e)
      }
      setLastPos(getPos(e))
    },
    [draw, erase, bucket, getPos, props.penType, saveCanvas]
  )
  const mouseUp = useCallback(() => setLastPos(null), [])
  const mouseOut = useCallback(() => setLastPos(null), [])
  const mouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (props.penType === 'pen') {
        draw(e)
      } else if (props.penType === 'eraser') {
        erase(e)
      }
      setLastPos(getPos(e))
    },
    [draw, erase, getPos, props.penType]
  )

  return (
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
  )
}

export default forwardRef(Canvas)
