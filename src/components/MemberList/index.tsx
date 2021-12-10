import React from 'react'
import { css } from '@emotion/react'

import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'
import { useAppSelector } from '/@/store/hooks'

import Member from './member'

const MemberList = () => {
  const memberList = useAppSelector((state) => state.room.members)
  return (
    <div css={[containerStyle, card]}>
      <h2 css={titleStyle}>参加者</h2>
      <div css={listStyle}>
        {memberList.map((member) => (
          <Member
            key={member.userId}
            name={member.username}
            avatar={member.avatar}
          />
        ))}
      </div>
    </div>
  )
}

const containerStyle = css`
  width: 100%;
  background-color: ${colorToRgb.white};
  padding: 36px 48px;
  padding-top: 12px;
`

const titleStyle = css`
  font-size: 2rem;
  line-height: 6rem;
`

const listStyle = css`
  background-color: ${colorToRgb.red};
  padding: 40px;
  border: 3px solid ${colorToRgb.black};
  height: calc(100% - 7rem);
  overflow-y: scroll;
  scrollbar-color: #4356ff ${colorToRgb.red};
  &::-webkit-scrollbar-track {
    background-color: ${colorToRgb.red};
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4356ff;
  }
  & div {
    padding-bottom: 0.75rem;
  }
`

export default MemberList
