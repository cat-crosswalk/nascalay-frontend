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
  width: number
  height: number
  isInactive?: boolean
}
export interface Handler {
  clear(): void
  undo(): void
  redo(): void
  resetCanvas(): void
  shortcut(e: React.KeyboardEvent): void
  exportImage(): ImageData | null
  exportDataURL(): string
}

const Canvas: React.ForwardRefRenderFunction<Handler, Props> = (
  props: Props,
  ref
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  const [undoList, setUndoList] = useState<Uint8ClampedArray[]>([])
  const [redoList, setRedoList] = useState<Uint8ClampedArray[]>([])
  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    const ctx = canvas.getContext('2d')
    if (ctx === null) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setUndoList([])
    setRedoList([])
  }, [])
  const saveCanvas = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvas.getContext('2d')!
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    setUndoList((prev) => [...prev, data])
    setRedoList([])
  }, [])
  const undo = useCallback(() => {
    if (props.isInactive === true) return
    if (undoList.length === 0) return
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvasRef.current!.getContext('2d')!
    const nowData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    const data = undoList[undoList.length - 1]
    setUndoList((prev) => [...prev.slice(0, -1)])
    setRedoList((prev) => [...prev, nowData])
    ctx.putImageData(
      new ImageData(new Uint8ClampedArray(data), canvas.width, canvas.height),
      0,
      0
    )
  }, [props.isInactive, undoList])
  const redo = useCallback(() => {
    if (props.isInactive === true) return
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
  }, [props.isInactive, redoList])
  const clear = useCallback(() => {
    if (props.isInactive === true) return
    saveCanvas()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvasRef.current!.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [props.isInactive, saveCanvas])
  const shortcut = useCallback(
    (e: React.KeyboardEvent) => {
      // shift 押してる状態だと key が 大文字になるから toLowerCase してる
      if (
        e.key.toLowerCase() === 'z' &&
        (e.ctrlKey || e.metaKey) &&
        !e.shiftKey
      ) {
        undo()
      } else if (
        e.key.toLowerCase() === 'z' &&
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey
      ) {
        redo()
      }
    },
    [undo, redo]
  )
  const exportImage = useCallback((): ImageData | null => {
    const canvas = canvasRef.current
    return (
      canvas
        ?.getContext('2d')
        ?.getImageData(0, 0, canvas.width, canvas.height) ?? null
    )
  }, [])

  const exportDataURL = useCallback((): string => {
    const canvas = canvasRef.current
    return canvas?.toDataURL('image/png') ?? ''
  }, [])

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
      resetCanvas() {
        resetCanvas()
      },
      shortcut(e) {
        shortcut(e)
      },
      exportImage() {
        return exportImage()
      },
      exportDataURL() {
        return exportDataURL()
      },
    }),
    [clear, undo, redo, resetCanvas, shortcut, exportImage, exportDataURL]
  )

  const getPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const rect = canvasRef.current!.getBoundingClientRect()
    return {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    }
  }, [])
  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (props.isInactive === true) return
      if (e.buttons !== 1) return
      const pos = getPos(e)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ctx = canvasRef.current!.getContext('2d')!
      ctx.lineCap = 'round'
      ctx.lineWidth = props.penSize
      ctx.strokeStyle = props.color
      ctx.globalCompositeOperation = 'source-over'
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
    [props.isInactive, props.penSize, props.color, getPos, lastPos]
  )
  const erase = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (props.isInactive === true) return
      if (e.buttons !== 1) return
      const pos = getPos(e)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ctx = canvasRef.current!.getContext('2d')!
      ctx.lineCap = 'round'
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = props.penSize
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
    [props.isInactive, props.penSize, getPos, lastPos]
  )
  const bucket = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (props.isInactive === true) return
      if (e.buttons !== 1) return
      const { x, y } = getPos(e)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      bucketFill(canvasRef.current!, x, y, props.color)
    },
    [getPos, props.color, props.isInactive]
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
  const mouseEnter = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.buttons !== 1) return
      if (props.penType === 'bucket') return
      saveCanvas()
    },
    [saveCanvas, props.penType]
  )

  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseOut={mouseOut}
      onMouseMove={mouseMove}
      onMouseEnter={mouseEnter}
    ></canvas>
  )
}

export default forwardRef(Canvas)
