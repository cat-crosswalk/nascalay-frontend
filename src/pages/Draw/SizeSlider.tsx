import { css } from '@emotion/react'
import React, { useCallback } from 'react'

type Props = {
  value: number
  onChange?: (value: number) => void
}

const SizeSlider = (props: Props) => {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(Number(event.target.value))
      }
    },
    [props]
  )

  return (
    <div
      css={css`
        position: relative;
        width: 232px;
        height: 40px;
      `}
    >
      <input
        type="range"
        min="5"
        max="100"
        step="5"
        value={props.value}
        onChange={onChange}
        css={css`
          -webkit-appearance: none;
          width: 232px;
          height: 40px;
          top: 0;
          left: 0;
          opacity: 0;
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 36px;
          }
        `}
      />

      <svg
        width="232"
        height="16"
        viewBox="0 0 232 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        css={css`
          position: absolute;
          bottom: 0;
          left: 0;
          pointer-events: none;
        `}
      >
        <path
          d="M1.5 9.44917V14.5H230.5V1.55262L1.5 9.44917Z"
          fill="#4356FF"
          stroke="black"
          strokeWidth="3"
        />
      </svg>

      <svg
        width="36"
        height="30"
        viewBox="0 0 36 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        css={css`
          position: absolute;
          bottom: 5px;
          left: ${((props.value - 5) / 95) * (232 - 36)}px;
          pointer-events: none;
          transition: left 0.1s ease-out;
        `}
      >
        <path
          d="M32.7224 1.49999L18 27L3.27756 1.5L32.7224 1.49999Z"
          fill="white"
          stroke="black"
          strokeWidth="3"
        />
      </svg>
    </div>
  )
}

export default SizeSlider
