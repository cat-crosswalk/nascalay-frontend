import { css, keyframes } from '@emotion/react'
import React, { useCallback, useEffect, useRef } from 'react'
import { colorToRgb } from '/@/utils/color'

type Props = {
  maxValueMs: number
  width: string
  height: string
  onFinish?: () => void
}

const LineTimer = (props: Props) => {
  const divRef = useRef<HTMLDivElement>(null)
  const d = 1
  const a = 0.3
  const wiggleKeyframes = keyframes`
    0% {transform: translate(0px, 0px) rotateZ(0deg)}
    25% {transform: translate(${d}px, ${d}px) rotateZ(${a}deg)}
    50% {transform: translate(0px, ${d}px) rotateZ(0deg)}
    75% {transform: translate(${d}px, 0px) rotateZ(-${a}deg)}
    100% {transform: translate(0px, 0px) rotateZ(0deg)}
  `
  const decrementKeyframes = useCallback(
    (width: string) => keyframes`
    0% {
      width: ${width};
      background-color: #4356FF;
    }
    60% {
      width: calc(${width} * 0.4);
      background-color: #4356FF;
    }
    61% {
      width: calc(${width} * 0.39);
      background-color: #DD6464;
    }
    100% {
      width: 0;
      background-color: #DD6464;
    }
  `,
    []
  )
  useEffect(() => {
    const timer = setTimeout(() => {
      if (divRef.current) {
        divRef.current.style.animationPlayState = 'running'
      }
    }, props.maxValueMs * 0.9)
    return () => clearTimeout(timer)
  }, [props])
  const onAnimEnd = useCallback(() => {
    if (props.onFinish) {
      props.onFinish()
    }
    if (divRef.current) {
      divRef.current.style.animationPlayState = 'paused'
    }
  }, [props])

  return (
    <div
      ref={divRef}
      css={css`
        border: 3px solid #000;
        background-color: ${colorToRgb.white};
        width: ${props.width};
        height: ${props.height};
        animation: ${wiggleKeyframes} 0.1s linear infinite;
        animation-play-state: paused;
      `}
    >
      <div
        css={css`
          animation: ${decrementKeyframes(`calc(${props.width} - 6px)`)}
            ${props.maxValueMs}ms linear both running;
          height: 100%;
        `}
        onAnimationEnd={onAnimEnd}
      />
    </div>
  )
}

export default LineTimer
