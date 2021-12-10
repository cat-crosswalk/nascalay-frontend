import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import Icon from '@mdi/react'
import { mdiClipboardMultiple } from '@mdi/js'
import CustomSlider from './Slider'
import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'
import { useAppSelector } from '/@/store/hooks'
import { wsSend } from '/@/websocket'

import FlatButton from '/@/components/FlatButton'

const GameSetting = () => {
  const [time, setTime] = useState(1)
  const handleChange = (event: Event, newValue: number | number[]) => {
    // TODO
    setTime(newValue as number)
  }
  const isHost = true // TODO
  const roomId = useAppSelector((state) => state.room.roomId)
  const [inviteUrl, setInviteUrl] = useState('')
  useEffect(() => {
    const url = location.protocol + '//' + location.host + '?c=' + roomId
    setInviteUrl(url)
  }, [roomId])

  const requestGameStart = useCallback(() => {
    wsSend.requestGameStart()
  }, [])

  const marks = [
    {
      value: 0,
      label: 'みじかい',
    },
    {
      value: 1,
      label: 'ふつう',
    },
    {
      value: 2,
      label: 'ながい',
    },
  ]
  return (
    <div css={[containerStyle, card]}>
      <div>
        <h2 css={titleStyle}>ゲーム設定</h2>
        <div>
          <p css={subTitleStyle}>時間設定</p>
          <CustomSlider
            defaultValue={1}
            max={2}
            min={0}
            marks={marks}
            value={time}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <h2 css={titleStyle}>招待</h2>
        <div css={inviteWrapStyle}>
          <div css={urlStyle}>{inviteUrl}</div>
          <button>
            <Icon path={mdiClipboardMultiple} size={1.8} />
          </button>
        </div>
      </div>
      {isHost && (
        <div css={startButtonStyle}>
          <FlatButton text="スタート" onClick={requestGameStart} color="blue" />
        </div>
      )}
    </div>
  )
}

const titleStyle = css`
  font-size: 2rem;
  line-height: 6rem;
`
const subTitleStyle = css`
  font-size: 1.5rem;
  line-height: 3rem;
`

const containerStyle = css`
  background-color: ${colorToRgb.red};
  padding: 36px 48px;
  padding-top: 12px;
`

const urlStyle = css`
  background-color: ${colorToRgb.yellow};
  border: solid 3px ${colorToRgb.black};
  height: 64px;
  width: 100%;
  margin-right: 20px;
`

const inviteWrapStyle = css`
  display: flex;
  font-size: 1.5rem;
  text-align: center;
  line-height: 64px;
  vertical-align: baseline;
`

const startButtonStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  & button {
    font-size: 2rem;
    background-color: ${colorToRgb.blue};
    border: solid 3px ${colorToRgb.black};
    height: 80px;
    line-height: 80px;
    vertical-align: middle;
    padding: 0 4rem;
  }
`

export default GameSetting
