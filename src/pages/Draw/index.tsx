import { css } from '@emotion/react'
import { mdiEraser } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useCallback, useState } from 'react'
import ColorPallet from './ColorPallet'
import MainCanvas, {
  Handler as MainCanvasHandler,
  Props as MainCanvasProps,
} from './MainCanvas'
import ToolButton from './ToolButton'

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

  return (
    <div>
      <h1>Draw</h1>
      <ColorPallet onChange={setPenColor} />
      <div
        css={css`
          display: grid;
          grid-template-columns: 64px 64px 64px;
          grid-row-gap: 20px;
          grid-column-gap: 20px;
        `}
      >
        <input
          css={css`
            display: none;
          `}
          type="radio"
          name="toolType"
          id="pen"
          checked={penType === 'pen'}
          onChange={() => setPenType('pen')}
        />
        <label htmlFor="pen">
          <ToolButton
            type="pen"
            color={penColor}
            isSelected={penType === 'pen'}
          />
        </label>
        <input
          css={css`
            display: none;
          `}
          type="radio"
          name="toolType"
          id="eraser"
          checked={penType === 'eraser'}
          onChange={() => setPenType('eraser')}
        />
        <label htmlFor="eraser">
          <ToolButton
            type="eraser"
            color={penColor}
            isSelected={penType === 'eraser'}
          />
        </label>
        <input
          css={css`
            display: none;
          `}
          type="radio"
          name="toolType"
          id="bucket"
          checked={penType === 'bucket'}
          onChange={() => setPenType('bucket')}
        />
        <label htmlFor="bucket">
          <ToolButton
            type="bucket"
            color={penColor}
            isSelected={penType === 'bucket'}
          />
        </label>

        <ToolButton type="undo" onClick={undo} />
        <ToolButton type="redo" onClick={redo} />
        <ToolButton type="clear" onClick={clearCanvas} />
      </div>

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
        <div>
          <button onClick={clearCanvas}>Clear</button>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
        </div>
        <div>
          <input
            type="radio"
            id="pen"
            name="penType"
            value="pen"
            checked={penType === 'pen'}
            onChange={() => setPenType('pen')}
          />
          <label htmlFor="pen">pen</label>
          <input
            type="radio"
            id="eraser"
            name="penType"
            value="eraser"
            checked={penType === 'eraser'}
            onChange={() => setPenType('eraser')}
          />
          <label htmlFor="eraser">
            <Icon path={mdiEraser} size={1} />
          </label>
          <input
            type="radio"
            id="bucket"
            name="penType"
            value="bucket"
            checked={penType === 'bucket'}
            onChange={() => setPenType('bucket')}
          />
          <label htmlFor="bucket">bucket</label>
        </div>
      </div>
    </div>
  )
}

export default Draw
