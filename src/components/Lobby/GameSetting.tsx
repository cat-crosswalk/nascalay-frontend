import React, { useState } from 'react'
import { css } from '@emotion/react'
import CustomSlider from './Slider'
import { card, gameCardColor } from '/@/styles'

const GameSetting = () => {
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
    <div css={[containerStyle, card]}>
      <div>
        <h2 css={titleStyle}>ゲーム設定</h2>
        <div css={timeSettingStyle}>
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
        <input type="text" placeholder="招待コードを入力" />
        <button>Copy</button>
      </div>
      <button>スタート</button>
    </div>
  )
}

const timeSettingStyle = css``

const titleStyle = css`
  font-size: 2rem;
  line-height: 4rem;
`
const subTitleStyle = css`
  font-size: 1.5rem;
`

const containerStyle = css`
  background-color: ${gameCardColor};
  padding: 36px;
`

export default GameSetting
