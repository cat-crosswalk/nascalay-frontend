import React, { useCallback, useState } from 'react'
import { css } from '@emotion/react'

import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'
import ColorPallet, { palletColor } from '/@/components/ColorPallet'
import Avatar from '/@/components/Avatar'
import { getRandomInt } from '/@/utils/random'

const AvatarSelect = () => {
  const colorId = getRandomInt(palletColor.length)
  const [color, setColor] = useState<string>(palletColor[colorId].hex)
  const colorChange = useCallback((hex: string) => {
    setColor(hex)
  }, [])
  return (
    <div css={[containerStyle, card]}>
      <Avatar size={148} avaterId={0} color={color} />
      <ColorPallet value={colorId} onChange={colorChange} />
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
