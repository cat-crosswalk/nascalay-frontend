import React, { useCallback, useEffect, useState } from 'react'
import ColorPallet from '/@/components/ColorPallet.tsx'
import DoneButton from '/@/components/DoneButton'
import MainCanvas, {
  Handler as MainCanvasHandler,
  Props as MainCanvasProps,
} from './MainCanvas'
import ToolBox from './ToolBox'
import SizeSlider from './SizeSlider'
import TimerLine from './TimerLine'

// 絵を描くページ
const Draw = () => {
  const canvasRef = React.useRef<MainCanvasHandler>(null)
  const clearCanvas = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.clear()
    }
  }, [])
  const undo = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.undo()
    }
  }, [])
  const redo = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.redo()
    }
  }, [])
  const shortcut = useCallback((e: React.KeyboardEvent) => {
    if (canvasRef.current) {
      canvasRef.current.shortcut(e)
    }
  }, [])
  const [penType, setPenType] = useState<MainCanvasProps['penType']>('pen')
  const [penColor, setPenColor] = useState<MainCanvasProps['color']>('#f00')
  const [penSize, setPenSize] = useState<MainCanvasProps['penSize']>(10)

  const [isDone, setIsDone] = useState(false)

  const maxTimeMs = 40000
  const [startTime, setStartTime] = useState<number | null>(null)
  const [rest, setRest] = useState<number>(maxTimeMs)
  useEffect(() => {
    if (startTime !== null) return
    setStartTime(new Date().getTime())
  }, [startTime])
  useEffect(() => {
    if (startTime === null) return
    setInterval(() => {
      const nowTime = new Date().getTime()
      setRest(startTime ? Math.max(0, maxTimeMs - (nowTime - startTime)) : 0)
    }, 10)
  }, [startTime])

  return (
    <div>
      <h1>Draw</h1>
      <TimerLine
        value={rest ?? 100}
        maxValue={maxTimeMs}
        width="500px"
        height="30px"
      />
      <SizeSlider value={penSize} onChange={setPenSize} />
      <DoneButton isDone={isDone} onClick={setIsDone} hasShadow={true} />
      <ColorPallet onChange={setPenColor} />
      <ToolBox
        onChange={setPenType}
        penType={penType}
        penColor={penColor}
        undo={undo}
        redo={redo}
        clear={clearCanvas}
      />

      <div onKeyDown={shortcut} tabIndex={-1}>
        <MainCanvas
          ref={canvasRef}
          penType={penType}
          penSize={penSize}
          color={penColor}
          width={800}
          height={800}
          adjacentColors={[
            ['blue', null, 'yellow'],
            [null, null, null],
            ['yellow', null, 'red'],
          ]}
        />
      </div>
    </div>
  )
}

export default Draw
