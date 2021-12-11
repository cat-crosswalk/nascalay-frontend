import { css, keyframes } from '@emotion/react'
import React from 'react'
import { colorToRgb } from '/@/utils/color'

type Props = {
  value: number
  maxValue: number
  width: string
  height: string
}

const TimerLine = (props: Props) => {
  const d = 1
  const a = 0.3
  const wiggleKeyframes = keyframes`
    0% {transform: translate(0px, 0px) rotateZ(0deg)}
    25% {transform: translate(${d}px, ${d}px) rotateZ(${a}deg)}
    50% {transform: translate(0px, ${d}px) rotateZ(0deg)}
    75% {transform: translate(${d}px, 0px) rotateZ(-${a}deg)}
    100% {transform: translate(0px, 0px) rotateZ(0deg)}
  `

  return (
    <div
      css={css`
        border: 3px solid #000;
        background-color: ${colorToRgb.white};
        width: ${props.width};
        height: ${props.height};
        animation: ${wiggleKeyframes} 0.1s linear infinite;
        animation-play-state: ${props.value < props.maxValue * 0.1 &&
        props.value > 0
          ? 'running'
          : 'paused'};
      `}
    >
      <div
        css={[
          css`
            transition: width 10ms linear;
            width: calc(
              (${props.width} - 6px) * ${props.value / props.maxValue}
            );
            height: 100%;
            background-color: ${props.value < props.maxValue * 0.4
              ? '#DD6464'
              : '#4356FF'};
          `,
        ]}
      />
    </div>
  )
}

export default TimerLine
