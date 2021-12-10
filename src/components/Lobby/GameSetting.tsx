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
    height: '12px',
    borderRadius: 0,
    border: '3px solid #000',
    padding: '0px',
    '& .MuiSlider-thumb': {
      marginTop: '-12px',
      width: 0,
      height: 0,
      borderRadius: 0,
      borderStyle: 'solid',
      
      borderWidth: '27.7px 16px 0 16px',
      borderColor: '#000 transparent transparent transparent',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
      '&::before': {
        marginTop: '-30px',
        content: '""',
        display: 'block',
        borderColor: '#fff transparent transparent transparent',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '19.1px 11px 0 11px',
        boxShadow: 'none',
      }
    },
    '& .MuiSlider-track': {
      display: 'none',
    },
    '& .MuiSlider-rail': {
      backgroundColor: '#4356FF',
      opacity: 1,
    },
    '& .MuiSlider-mark': {
      display: 'none',
    },
    '& .Mui-active': {
      boxShadow: 'none',
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
