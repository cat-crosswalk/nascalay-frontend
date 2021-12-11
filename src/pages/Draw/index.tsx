import React, { useCallback, useEffect, useState } from 'react'
import ColorPallet from '/@/components/ColorPallet'
import DoneButton from '/@/components/DoneButton'
import MainCanvas, {
  Handler as MainCanvasHandler,
  Props as MainCanvasProps,
} from './MainCanvas'
import PreviewCanvas from './PreviewCanvas'
import ToolBox from './ToolBox'
import image from './tmp'
import SizeSlider from './SizeSlider'
import LineTimerCard from '/@/components/LineTimerCard'
import OdaiBoard from '/@/components/OdaiBoard'
import { css } from '@emotion/react'
import FlatButton from '/@/components/FlatButton'
import { colorToRgb } from '/@/utils/color'
import { useAppSelector } from '/@/store/hooks'
import { areaToXY } from './boardData'
import { WsEvent, wsListener, wsSend } from '/@/websocket'

// 絵を描くページ
const Draw = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(image)
  const [drawnArea, setDrawnArea] = useState<[number, number][]>([
    [0, 0],
    [1, 1],
    [1, 2],
    [2, 3],
    [3, 3],
  ])
  const [targetArea, setTargetArea] = useState<[number, number]>([2, 2])

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
  const doneButtonHandler = useCallback((e) => {
    setIsDone(e)
    if (e) {
      // ready
      wsSend.drawReady()
    } else {
      // cancel
      wsSend.drawCancel()
    }
  }, [])

  const maxTimeMs = useAppSelector((state) => state.draw.timeLimit) * 1000

  const [nowPhase, setNowPhase] = useState<number>(5)
  const [maxPhase, setMaxPhase] = useState<number>(25)
  const [odaiContent, setOdaiContent] = useState<string>('横断歩道を渡る猫')

  const drawData = useAppSelector((state) => state.draw)
  useEffect(() => {
    setPreviewImage(drawData.img)
    setNowPhase(drawData.drawPhaseNum)
    setMaxPhase(drawData.allDrawPhaseNum)
    setOdaiContent(drawData.odai)
    setTargetArea(areaToXY(drawData.canvas.areaId, drawData.canvas.boardName))
  }, [drawData])

  useEffect(() => {
    const finishCallbackHandler = () => {
      // callback
      // wsSend.img にセットした画像を送信する
      wsSend.drawSend()
    }
    wsListener.addEventListener(WsEvent.DrawFinish, finishCallbackHandler)

    return () => {
      wsListener.removeEventListener(WsEvent.DrawFinish, finishCallbackHandler)
    }
  }, [])

  return (
    <div>
      <div
        css={css`
          display: grid;
          grid-template-columns: 352px 512px 300px;
          grid-column-gap: 32px;
          grid-template-rows: 78px 1fr;
          grid-row-gap: 32px;
          justify-content: center;
          align-items: center;
          margin-top: 32px;
        `}
        onKeyDown={shortcut}
      >
        <div
          css={css`
            background-color: ${colorToRgb.yellow};
            box-shadow: 8px 8px 0 #000000;
            border: 3px solid #000000;
            height: 100%;
            width: 100%;
            font-size: 32px;
            display: grid;
            place-items: center;
            grid-column: 1 / 2;
            grid-row: 1 / 2;
          `}
        >
          {`${nowPhase}ターン目/${maxPhase}`}
        </div>
        <div
          css={css`
            display: inline-block;
            grid-column: 2 / 4;
          `}
        >
          <LineTimerCard maxValueMs={maxTimeMs} width="100%" />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 48px;
            grid-column: 1 / 2;
            grid-row: 2 / 3;
          `}
        >
          <div
            css={css`
              background-color: ${colorToRgb.red};
              box-shadow: 8px 8px 0px #000000;
              padding: 32px;
              font-size: 32px;
              border: 3px solid #000;
            `}
          >
            <div
              css={css`
                margin-bottom: 32px;
              `}
            >
              お題
            </div>
            <OdaiBoard text={odaiContent} width="100%" height="200px" />
          </div>
          <div
            css={css`
              flex-shrink: 0;
            `}
          >
            <PreviewCanvas
              boardType="5x5"
              drawnArea={drawnArea}
              img={previewImage}
              targetArea={targetArea}
              width="100%"
              isColored
              type="large"
              hasShadow
            />
          </div>
        </div>

        <div
          css={css`
            margin: auto;
            grid-column: 2 / 3;
            grid-row: 2 / 3;
          `}
        >
          <MainCanvas
            ref={canvasRef}
            penType={penType}
            color={penColor}
            penSize={penSize}
            width={512}
            height={512}
            hasShadow
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            grid-column: 3 / 4;
            grid-row: 2 / 3;
            gap: 32px;
            margin-right: 8px;
            margin-bottom: 8px;
            height: 100%;
          `}
        >
          <div
            css={css`
              background-color: ${colorToRgb.red};
              height: 100%;
              padding: 32px 0;
              box-shadow: 8px 8px 0px #000000;
              border: 3px solid #000;
              flex-grow: 1;
            `}
          >
            <div
              css={css`
                margin-left: auto;
                margin-right: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 100%;
                gap: 16px;
              `}
            >
              <ColorPallet onChange={setPenColor} />
              <div
                css={css`
                  margin-top: auto;
                `}
              >
                <ToolBox
                  onChange={setPenType}
                  penType={penType}
                  penColor={penColor}
                  undo={undo}
                  redo={redo}
                  clear={clearCanvas}
                />
              </div>
              <SizeSlider value={penSize} onChange={setPenSize} />
            </div>
          </div>
          <div
            css={css`
              flex-shrink: 0;
            `}
          >
            <DoneButton
              text="完了！"
              doneText="編集"
              color="red"
              doneColor="yellow"
              isDone={isDone}
              onClick={doneButtonHandler}
              hasShadow
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Draw
