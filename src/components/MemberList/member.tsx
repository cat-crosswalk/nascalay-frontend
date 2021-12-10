import React from 'react'
import { css } from '@emotion/react'
import { colorToRgb } from '/@/utils/color'

interface MemberData {
  avatar: number
  name: string
}

const Member = (props: MemberData) => {
  const avatarSrc = '/@/assets/userIcon.png'
  return (
    <div css={container}>
      <img src={avatarSrc} />
      <p>{props.name}</p>
    </div>
  )
}

const container = css`
  display: flex;
  font-size: 1.5rem;
  & img {
    width: 72px;
    height: 72px;
    margin-right: 28px;
    border: 3px solid ${colorToRgb.black};
  }
  & p {
    height: 72px;
    line-height: 72px;
    vertical-align: middle;
  }
`

export default Member
