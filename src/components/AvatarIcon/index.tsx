import React from 'react'
import { css } from '@emotion/react'
import { colorToRgb } from '/@/utils/color'
import { Avatar } from '/@/utils/apis'

type Props = {
  avatar?: Avatar
  size: number
  borderColor?: `#${string}` | `rgb(${number}, ${number}, ${number})`
}

const AvatarIcon = (props: Props) => {
  const imageStyle = css`
    background-color: ${props.avatar?.color ?? '#fff'};
    width: ${props.size}px;
    height: ${props.size}px;
    border: 3px solid ${props.borderColor ?? colorToRgb.black};
  `
  if (!props.avatar) {
    return <div css={imageStyle} />
  }
  return (
    <img
      src={`avatar/avatar${props.avatar.type}.svg`}
      css={imageStyle}
      alt="avatar"
    />
  )
}

export default AvatarIcon
