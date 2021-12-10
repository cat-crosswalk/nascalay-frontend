import React, { useState } from 'react'
import { css } from '@emotion/react'
import CustomSlider from './Slider'
import { card } from '/@/styles/card'

const GameSetting = () => {
  const sliderStyle = css`
    margin: 60px;
  `
  const [time, setTime] = useState(1)
  const handleChange = (event: Event, newValue: number | number[]) => {
    setTime(newValue as number)
  }
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
    <div css={card}>
      <div>
        <h2>ゲーム設定</h2>
        <div css={sliderStyle}>
          <p>時間設定</p>
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
        <h2>招待</h2>
        <input type="text" placeholder="招待コードを入力" />
        <button>Copy</button>
      </div>
      <button>スタート</button>
    </div>
  )
}

export default GameSetting
