import { css } from '@emotion/react'
import React, { useCallback, useEffect } from 'react'
import Vivus from 'vivus'

export const palletColor: { hex: `#${string}`; whiteLike?: boolean }[] = [
  {
    hex: '#F22222',
  },
  {
    hex: '#870A0A',
  },
  {
    hex: '#151EEF',
  },
  {
    hex: '#141881',
  },
  {
    hex: '#F39E1D',
  },
  {
    hex: '#965E0A',
  },
  {
    hex: '#ED28D9',
  },
  {
    hex: '#871AF3',
  },
  {
    hex: '#F0E712',
  },
  {
    hex: '#8F8A0B',
  },
  {
    hex: '#FEB1B1',
  },
  {
    hex: '#1D1D1D',
  },
  {
    hex: '#53E520',
  },
  {
    hex: '#216608',
  },
  {
    hex: '#FFE5BE',
    whiteLike: true,
  },
  {
    hex: '#838383',
  },
  {
    hex: '#10CFE9',
  },
  {
    hex: '#124F98',
  },
  {
    hex: '#FEFCC8',
    whiteLike: true,
  },
  {
    hex: '#FFFFFF',
    whiteLike: true,
  },
]

type Props = {
  value?: number
  onChange?: (color: typeof palletColor[number]['hex']) => void
}

const ColorPallet = (props: Props) => {
  const [vivus, setVivus] = React.useState<Vivus | null>(null)
  const [selectedColorIndex, setSelectedColorIndex] = React.useState<number>(
    props.value ?? 11
  )
  const animDuration = 50
  const changeSelectedColor = useCallback(
    (index: number) => {
      setSelectedColorIndex(index)
      if (props.onChange) {
        props.onChange(palletColor[index].hex)
      }
      vivus?.reset()
      vivus?.play()
    },
    [props, vivus]
  )

  useEffect(() => {
    if (props.onChange) {
      props.onChange(palletColor[selectedColorIndex].hex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setVivus(
      new Vivus('selected-line', {
        duration: animDuration,
        type: 'sync',
        animTimingFunction: Vivus.EASE_OUT,
      })
    )
  }, [])

  return (
    <div>
      <div
        css={css`
          display: inline-block;
          position: relative;
          width: calc(56px * 4 + 6px);
          height: calc(44px * 5 + 6px);
          border: 3px solid #000;
          cursor: url('../src/assets/cursors/onColorPalette.png') 0 40 ,auto;
        `}
      >
        {palletColor.map(({ hex }, index) => {
          const i = index % 4
          const j = Math.floor(index / 4)

          return (
            <React.Fragment key={hex}>
              <input
                type="radio"
                id={hex}
                name="color"
                value={hex}
                checked={index === selectedColorIndex}
                onChange={() => changeSelectedColor(index)}
                css={css`
                  display: none;
                `}
              />
              <label
                htmlFor={hex}
                css={css`
                  cursor: url('../src/assets/cursors/onColorPalette.png') 0 40, auto;
                  display: inline-block;
                  position: absolute;
                  width: 56px;
                  height: 44px;
                  top: ${44 * j}px;
                  left: ${56 * i}px;
                  background-color: ${hex};
                `}
                key={hex}
              ></label>
            </React.Fragment>
          )
        })}
        <div
          css={css`
            display: inline-block;
            position: absolute;
            top: ${44 * Math.floor(selectedColorIndex / 4)}px;
            left: ${56 * (selectedColorIndex % 4)}px;
            z-index: 4;
          `}
        >
          <svg
            id="selected-line"
            width="56"
            height="44"
            viewBox="0 0 56 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke={
                palletColor[selectedColorIndex].whiteLike ? '#000' : '#fff'
              }
              d="M16 19.5157C17.8324 17.7372 19.9414 16.1792 22.2217 15.0201C23.0267 14.6108 24.4002 13.8809 25.3726 14.0166C26.2612 14.1406 25.101 15.4949 24.9211 15.7627C23.6127 17.71 22.3355 19.7318 21.1981 21.7836C20.6488 22.7746 20.3011 23.8115 20.0541 24.9145C19.8189 25.9652 20.0406 25.5815 20.5157 25.0952C21.3015 24.2908 22.3463 23.7605 23.2854 23.1684C25.2146 21.9522 27.0636 20.6171 28.9953 19.4053C31.5217 17.8204 38.9922 12.9353 36.672 14.8093C34.6924 16.4082 33.126 18.2346 31.5341 20.2182C29.4924 22.7623 27.07 25.5473 25.8342 28.6074C25.6274 29.1196 25.7182 29.5708 26.2657 29.1292C28.0655 27.6778 29.6778 25.992 31.5843 24.6737C32.8039 23.8303 34.1231 23.1223 35.4076 22.3857C35.6567 22.2429 38.0524 20.5155 38.4983 20.6798C38.5551 20.7007 36.982 22.9886 36.9128 23.0882C36.2852 23.9918 35.6909 24.9186 35.0865 25.8377C34.3945 26.89 33.7266 27.9546 33.0694 29.0289C32.8215 29.4342 31.8381 30.3112 32.3068 30.233C32.602 30.1838 32.8639 29.8347 33.0795 29.6611C33.9253 28.9797 34.9086 28.3393 35.9194 27.935C36.9483 27.5235 36.6335 28.5113 36.3709 29.0891C35.9334 30.0516 36.9733 31.488 37.3142 32.3404"
              strokeWidth={
                palletColor[selectedColorIndex].whiteLike ? '5' : '3'
              }
              strokeLinecap="round"
            />
            <path
              stroke="#fff"
              d="M16 19.5157C17.8324 17.7372 19.9414 16.1792 22.2217 15.0201C23.0267 14.6108 24.4002 13.8809 25.3726 14.0166C26.2612 14.1406 25.101 15.4949 24.9211 15.7627C23.6127 17.71 22.3355 19.7318 21.1981 21.7836C20.6488 22.7746 20.3011 23.8115 20.0541 24.9145C19.8189 25.9652 20.0406 25.5815 20.5157 25.0952C21.3015 24.2908 22.3463 23.7605 23.2854 23.1684C25.2146 21.9522 27.0636 20.6171 28.9953 19.4053C31.5217 17.8204 38.9922 12.9353 36.672 14.8093C34.6924 16.4082 33.126 18.2346 31.5341 20.2182C29.4924 22.7623 27.07 25.5473 25.8342 28.6074C25.6274 29.1196 25.7182 29.5708 26.2657 29.1292C28.0655 27.6778 29.6778 25.992 31.5843 24.6737C32.8039 23.8303 34.1231 23.1223 35.4076 22.3857C35.6567 22.2429 38.0524 20.5155 38.4983 20.6798C38.5551 20.7007 36.982 22.9886 36.9128 23.0882C36.2852 23.9918 35.6909 24.9186 35.0865 25.8377C34.3945 26.89 33.7266 27.9546 33.0694 29.0289C32.8215 29.4342 31.8381 30.3112 32.3068 30.233C32.602 30.1838 32.8639 29.8347 33.0795 29.6611C33.9253 28.9797 34.9086 28.3393 35.9194 27.935C36.9483 27.5235 36.6335 28.5113 36.3709 29.0891C35.9334 30.0516 36.9733 31.488 37.3142 32.3404"
              strokeWidth={
                palletColor[selectedColorIndex].whiteLike ? '3' : '3'
              }
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ColorPallet
