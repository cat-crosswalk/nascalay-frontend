import React from 'react'
import { css } from '@emotion/react'
import { colorToRgb } from '/@/utils/color'
import {Avatar}from '/@/utils/apis'

type Props = {
  avatar: Avatar
  size: number
}

const AvatarIcon = (props: Props) => {
  const src = `/@/assets/avatar${props.avatar.type}.png`
  const imageStyle = css`
    background-color: ${props.avatar.color};
    width: ${props.size}px;
    height: ${props.size}px;
    border: 3px solid ${colorToRgb.black};
  `
  return <img src={src} css={imageStyle} alt="avatar" />
}

export default AvatarIcon
