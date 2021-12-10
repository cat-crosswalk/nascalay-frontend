import React from 'react'
import { styled } from '@mui/material/styles'
import Slider from '@mui/material/Slider'

const CustomSlider = styled(Slider)({
  marginTop: '20px',
  marginBottom: '0px',
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
    },
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
  '& 	.MuiSlider-trackFalse': {
    boxShadow: 'none',
  },
})

export default CustomSlider
