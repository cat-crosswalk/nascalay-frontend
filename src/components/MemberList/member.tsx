import React from 'react'
import { css } from '@emotion/react'

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
`

export default Member
