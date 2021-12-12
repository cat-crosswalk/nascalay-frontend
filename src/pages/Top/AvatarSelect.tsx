import React, { useCallback, useState } from 'react'
import { css } from '@emotion/react'
import { useAppDispatch } from '/@/store/hooks'
import { card } from '/@/utils/card'
import { colorToRgb } from '/@/utils/color'
import ColorPallet, { palletColor } from '/@/components/ColorPallet'
import AvatarIcon from '/@/components/AvatarIcon'
import { getRandomInt } from '/@/utils/random'
import { setAvatarColor, setAvatarType } from '/@/store/slice/user'

import sai1 from '/@/assets/sai/sai-1.png'
import sai2 from '/@/assets/sai/sai-2.png'
import sai3 from '/@/assets/sai/sai-3.png'
import sai4 from '/@/assets/sai/sai-4.png'
import sai5 from '/@/assets/sai/sai-5.png'
import sai6 from '/@/assets/sai/sai-6.png'

const AvatarSelect = () => {
  const maxAvatarId = 72
  const colorId = getRandomInt(palletColor.length)
  const [color, setColor] = useState<string>(palletColor[colorId].hex)
  const [anim, setAnim] = useState([45, -45])
  const [avatarId, setAvatarId] = useState(getRandomInt(maxAvatarId))
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
    setAnim([anim[0] + 720, anim[1] + 360])
    setAvatarId(id)
    dispatch(setAvatarType(id))
  }, [dispatch, anim])

  return (
    <div css={[containerStyle, card]}>
      <div css={avaterStyle}>
        <AvatarIcon size={148} avatar={{ color: color, type: avatarId }} />
        <button css={diceStyle} onClick={randomAvatar}>
          <div
            css={css`
              ${cube}
              transform: rotateX(${anim[0]}deg) rotateY(${anim[1]}deg);
            `}
          >
            <div>
              <img src={sai5} />
            </div>
            <div>
              <img src={sai2} />
            </div>
            <div>
              <img src={sai3} />
            </div>
            <div>
              <img src={sai4} />
            </div>
            <div>
              <img src={sai6} />
            </div>
            <div>
              <img src={sai1} />
            </div>
          </div>
        </button>
      </div>
      <ColorPallet value={colorId} onChange={colorChange} />
    </div>
  )
}

const cube = css`
  margin-left: 8px;
  width: 25px;
  height: 25px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateY(-40deg);
  transition: transform 0.8s ease-out;
  & div {
    color: white;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  & div img {
    width: 25px;
    height: 25px;
  }
  & div:nth-of-type(1) {
    transform: translateZ(12.5px);
  }
  & div:nth-of-type(2) {
    transform: rotateY(180deg) translateZ(12px);
  }
  & div:nth-of-type(3) {
    transform: rotateY(90deg) translateZ(12px);
  }
  & div:nth-of-type(4) {
    transform: rotateY(-90deg) translateZ(12px);
  }
  & div:nth-of-type(5) {
    transform: rotateX(90deg) translateZ(12px);
  }
  & div:nth-of-type(6) {
    transform: rotateX(-90deg) translateZ(12px);
  }
`

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
  background-color: #ddd;
  border: 3px solid ${colorToRgb.black};
  line-height: 0;
`

export default AvatarSelect
