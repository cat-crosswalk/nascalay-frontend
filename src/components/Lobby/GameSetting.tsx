import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { css } from '@emotion/react'

const GameSetting = () => {
  const marks = {  
    0: <p>みじかい</p>,
    1: <p>ふつう</p>,  
    2: <p>ながい</p>,
  }
  const style = css`
    max-width:50%;
    margin-bottom:30px;
    padding: 30px;
  `
  return (
    <div>
      <div>
        <h2>ゲーム設定</h2>
        <div css={style}>
          <p>時間設定</p>
          <Slider min={0} max={2} marks={marks} step={1} defaultValue={1}/>
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
