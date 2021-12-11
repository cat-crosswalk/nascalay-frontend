import React, { useCallback, useState } from 'react'
import ColorPallet from '/@/components/ColorPallet.tsx'
import DoneButton from './DoneButton'
import MainCanvas, {
  Handler as MainCanvasHandler,
  Props as MainCanvasProps,
} from './MainCanvas'
import ToolBox from './ToolBox'

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

  const [isDone, setIsDone] = useState(false)

  return (
    <div>
      <h1>Draw</h1>
      <DoneButton isDone={isDone} onClick={setIsDone} />
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
          penSize={10}
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
