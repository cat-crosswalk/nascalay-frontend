import { mdiEraser } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useCallback, useState } from 'react'
import MainCanvas, {
  Handler as MainCanvasHandler,
  Props as MainCanvasProps,
} from './MainCanvas'

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
  const selectableColor: {
    name: string
    color: MainCanvasProps['color']
  }[] = [
    {
      name: 'red',
      color: '#f00',
    },
    {
      name: 'green',
      color: '#0f0',
    },
    {
      name: 'blue',
      color: '#00f',
    },
    {
      name: 'black',
      color: '#000',
    },
    {
      name: 'white',
      color: '#fff',
    },
    {
      name: 'yellow',
      color: '#ff0',
    },
    {
      name: 'orange',
      color: '#f60',
    },
    {
      name: 'pink',
      color: '#f0f',
    },
  ]

  return (
    <div>
      <h1>Draw</h1>
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
        <div>
          {selectableColor.map((color) => (
            <React.Fragment key={`${color.name}-wrapper`}>
              <input
                type="radio"
                id={color.name}
                name="color"
                value={color.color}
                checked={penColor === color.color}
                onChange={() => setPenColor(color.color)}
              />
              <label htmlFor={color.name}>{color.name}</label>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Draw
