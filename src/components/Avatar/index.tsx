import React from 'react'
import { css } from '@emotion/react'
import { colorToRgb } from '/@/utils/color'

type Props = {
  color: string
  avaterId: number
  size: number
}

const Avatar = (props: Props) => {
  const src = `/@/assets/avatar${props.avaterId}.png`
  const imageStyle = css`
    background-color: ${props.color};
    width: ${props.size}px;
    height: ${props.size}px;
    border: 3px solid ${colorToRgb.black};
  `
  return <img src={src} css={imageStyle} alt="avatar" />
}

export default Avatar
