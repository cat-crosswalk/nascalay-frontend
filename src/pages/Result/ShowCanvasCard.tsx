import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import { useAppDispatch, useAppSelector } from '/@/store/hooks'
import { colorToRgb } from '/@/utils/color'
import { WsEvent, wsListener } from '/@/websocket'
import { setShowNext, setShowNow } from '/@/store/slice/status'

const ShowCanvasCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWidth = 400
  const canvasHeight = 400

  const [imageData, setImageData] = useState('')
  const dispatch = useAppDispatch()
  const showNow = useAppSelector((state) => state.status.showNow)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvas.getContext('2d')!
    if (imageData === '') {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      return
    }
    const img = new Image()
    img.src = imageData
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
    }
  }, [imageData])

  useEffect(() => {
    const getImageData = (e: CustomEvent) => {
      setImageData(e.detail.img)
      dispatch(setShowNext(e.detail.next))
      dispatch(setShowNow('canvas'))
    }
    wsListener.addEventListener(
      WsEvent.ShowCanvas,
      getImageData as EventListener
    )
    return () => {
      wsListener.removeEventListener(
        WsEvent.ShowCanvas,
        getImageData as EventListener
      )
    }
  }, [dispatch])

  useEffect(() => {
    if (showNow === 'odai') {
      setImageData('')
    }
  }, [showNow])

  // TODO: ?キャンバスアニメーション
  return (
    <div css={canvasContainer}>
      <div>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          css={canvasStyle}
        ></canvas>
      </div>
    </div>
  )
}
const canvasContainer = css`
  display: flex;
  justify-content: center;
  padding: 20px;
`

const canvasStyle = css`
  width: calc(96vh - 320px);
  height: calc(96vh - 320px);
  border: 3px solid ${colorToRgb.black};
`

export default ShowCanvasCard
