import React from 'react'
import { css } from '@emotion/react'
import AvatarIcon from '/@/components/AvatarIcon'
import { User } from '/@/utils/apis'

import { card } from '/@/utils/card'

const ShowAnswerCard = () => {
  const user :User = {
    userId: 'aaaaa',
    username: 'aaaaa',
    avatar: {
      type: 0,
      color: '#fff',
    }
  }
  return (
    <div css={[AnswerContainer, card]}>
      <div>ここに回答</div>
      <div>
        <AvatarIcon avatar={user.avatar} size={72} />
        <p>user.username</p>
      </div>
    </div>
  )
}

const AnswerContainer = css`
  display: flex;
}`

export default ShowAnswerCard
