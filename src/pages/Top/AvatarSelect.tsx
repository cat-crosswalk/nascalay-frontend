import React from 'react'
import { css } from '@emotion/react'

import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'

import ColorPallet from '/@/components/ColorPallet'
import Avatar from '/@/components/Avatar'

const AvatarSelect = () => {
  return (
    <div css={[containerStyle, card]}>
      <Avatar size={148} avaterId={0} color="#EE8B17" />
      <ColorPallet />
    </div>
  )
}

const containerStyle = css`
  width: 100%;
  background-color: ${colorToRgb.blue};
  padding: 36px 48px;
  padding-top: 12px;
`

export default AvatarSelect
