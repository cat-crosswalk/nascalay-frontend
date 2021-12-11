import React, { useCallback, useState } from 'react'
import { css } from '@emotion/react'
import { useAppDispatch } from '/@/store/hooks'
import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'
import ColorPallet, { palletColor } from '/@/components/ColorPallet'
import Avatar from '/@/components/Avatar'
import { getRandomInt } from '/@/utils/random'
import { setAvatarColor, setAvatarType } from '/@/store/slice/user'

import { Icon } from '@mdi/react'
import { mdiDice3Outline } from '@mdi/js'

const AvatarSelect = () => {
  const maxAvatarId = 0 // TODO:アバター数に応じて変更する
  const colorId = getRandomInt(palletColor.length)
  const [color, setColor] = useState<string>(palletColor[colorId].hex)
  const [avatarId, setAvatarId] = useState(0)
  const dispatch = useAppDispatch()

  const colorChange = useCallback(
    (hex: string) => {
      setColor(hex)
      dispatch(setAvatarColor(hex))
    },
    [dispatch]
  )
  const randomAvatar = useCallback(() => {
    const id = getRandomInt(maxAvatarId)
    setAvatarId(id)
    dispatch(setAvatarType(id))
  }, [dispatch])

  // TODO: ダイズを出目に対応して変更する
  return (
    <div css={[containerStyle, card]}>
      <div css={avaterStyle}>
        <Avatar size={148} avaterId={avatarId} color={color} />
        <button css={diceStyle} onClick={randomAvatar}>
          <Icon path={mdiDice3Outline} size={1.8} />
        </button>
      </div>
      <ColorPallet value={colorId} onChange={colorChange} />
    </div>
  )
}

const containerStyle = css`
  width: 100%;
  background-color: ${colorToRgb.blue};
  padding: 36px 48px;
`

const avaterStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 26px;
`

const diceStyle = css`
  position: absolute;
  bottom: -5px;
  right: 20px;
  height: 60px;
  width: 60px;
  background-color: ${colorToRgb.white};
  border: 3px solid ${colorToRgb.black};
  line-height: 0;
`

export default AvatarSelect
