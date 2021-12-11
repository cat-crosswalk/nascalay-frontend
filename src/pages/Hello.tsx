import styled from '@emotion/styled'
import React, { useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiEraser } from '@mdi/js'

import api, { Room } from '/@/utils/apis/index'
import { wsSend, wsListener, WsEvent } from '/@/websocket/index'

import MyCanvas, {
  Handler as CanvasHandler,
  Props as CanvasProps,
} from '/@/components/Canvas'
import FlatButton from '../components/FlatButton'

const Hello = () => {
  const PurpleDiv = styled.div`
    color: purple;
    font-size: 10em;
    margin: 0.5em;
  `

  const { name } = useParams()
  const [room, setRoom] = useState<Room | null>(null)
  const [penType, setPenType] = useState<CanvasProps['penType']>('pen')
  const [penColor, setPenColor] = useState<CanvasProps['color']>('#f00')
  const selectableColor: {
    name: string
    color: CanvasProps['color']
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
  useEffect(() => {
    ;(async () => {
      const { data } = await api.getRoom('xxxxRoomIDxxxxx')
      setRoom(data)
    })()
  }, [])

  // これで，DrawStartイベントを受け取ることができる
  wsListener.addEventListener(WsEvent.DrawStart, ((e: CustomEvent) => {
    console.log('draw start', e.detail)
  }) as EventListener)

  const gameStart = useCallback(() => wsSend.requestGameStart(), [])

  const canvasRef = React.useRef<CanvasHandler>(null)
  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear()
    }
  }
  const undo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo()
    }
  }
  const redo = () => {
    if (canvasRef.current) {
      canvasRef.current.redo()
    }
  }
  const shortcut = (e: React.KeyboardEvent) => {
    if (canvasRef.current) {
      canvasRef.current.shortcut(e)
    }
  }

  const [isSelected, setIsSelected] = useState(false)
  const toggleSelect = useCallback(() => {
    setIsSelected((prev) => !prev)
  }, [])

  return (
    <>
      <FlatButton
        onClick={toggleSelect}
        text="スタート"
        color="red"
        selected={isSelected}
      />
      <FlatButton
        onClick={toggleSelect}
        text="スタート"
        color="yellow"
        selected={isSelected}
      />
      <FlatButton
        onClick={toggleSelect}
        text="スタート"
        color="blue"
        selected={isSelected}
      />
      {/* tabIndex つけないと div で keydown 起動しない
           -1 をつけると tab でこの div に遷移しない
       */}
      <div onKeyDown={shortcut} tabIndex={-1}>
        <MyCanvas
          ref={canvasRef}
          color={penColor}
          penSize={10}
          penType={penType}
          width={500}
          height={500}
        />
        <div>
          <button onClick={clearCanvas}>clear</button>
          <button onClick={undo}>undo</button>
          <button onClick={redo}>redo</button>
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
      <div>
        <button onClick={gameStart}>req gamestart</button>
        <p>{room?.roomId}</p>
        <PurpleDiv>Hello {`${name ?? 'React'} !`}</PurpleDiv>
        <Link to="/">Go to home</Link>
      </div>
    </>
  )
}

export default Hello
