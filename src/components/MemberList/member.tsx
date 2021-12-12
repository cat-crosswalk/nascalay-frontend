import React from 'react'
import { css } from '@emotion/react'
import AvatarIcon from '../AvatarIcon'
import { Avatar } from '/@/utils/apis'

interface MemberData {
  avatar: Avatar
  name: string
  isHost: boolean
}

const Member = (props: MemberData) => {
  return (
    <div css={container}>
      <AvatarIcon
        avatar={props.avatar}
        size={72}
        borderColor={props.isHost ? '#F6DF93' : undefined}
      />
      <p>{props.name}</p>
    </div>
  )
}

const container = css`
  display: flex;
  font-size: 1.5rem;
  & img {
    margin-right: 28px;
  }
  & p {
    height: 72px;
    line-height: 72px;
    vertical-align: middle;
  }
`

export default Member
