import React from 'react'
import { css } from '@emotion/react'
import { styled } from '@mui/material/styles'
import Slider from '@mui/material/Slider'

const GameSetting = () => {
  const sliderStyle = css`
    width: 50%;
    margin: 60px;
  `
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
  const sliderThumbBorderWidth = '2px'
  const CustomSlider = styled(Slider)({
    height: '16px',
    borderRadius: 0,
    border: '3px solid #000',
    padding: '0px',
    '& .MuiSlider-thumb': {
      marginTop: '-20px',
      width: 0,
      height: 0,
      borderRadius: 0,
      borderStyle: 'solid',
      borderWidth: '21.7px 12.5px 0 12.5px',
      borderColor: '#ff0000 transparent transparent transparent',
      backgroundColor: 'transparent',
      filter: `drop-shadow(0px ${sliderThumbBorderWidth} 0px #000)
               drop-shadow(0px -${sliderThumbBorderWidth} 0px #000)
               drop-shadow(${sliderThumbBorderWidth} 0px 0px #000)
               drop-shadow(-${sliderThumbBorderWidth} 0px 0px #000)`,
    },
    '& .MuiSlider-track': {
      backgroundColor: '#4356FF',
    },
    '& .MuiSlider-rail': {
      backgroundColor: '#4356FF',
      opacity: 1,
    },
    '&:hover .MuiSlider-thumb': {
      boxShadow: '0 0 0 0 rgba(255,0,0,0.5)',
    },
    '& .MuiSlider-mark': {
      display: 'none',
    },
  })
  return (
    <div>
      <div>
        <h2>ゲーム設定</h2>
        <div css={sliderStyle}>
          <p>時間設定</p>
          <CustomSlider defaultValue={1} max={2} min={0} marks={marks} />
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
