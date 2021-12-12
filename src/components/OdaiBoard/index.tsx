import { css } from '@emotion/react'
import React from 'react'
import { colorToRgb } from '/@/utils/color'

type Props = {
  width: string
  height: string
  text: string
}

const OdaiBoard = (props: Props) => {
  return (
    <div
      css={css`
        display: inline-block;
        width: ${props.width};
      `}
    >
      <div
        css={css`
          display: flex;
          &:before {
            width: 10%;
          }
          &:after {
            width: 90%;
          }
          &:before,
          &:after {
            content: '';
            border-bottom: 3px solid ${colorToRgb.black};
          }
        `}
      >
        <div
          css={css`
            display: inline-block;
            font-size: 3.5rem;
            margin: auto 4px -2.5rem 4px;
          `}
        >
          “
        </div>
      </div>
      <div
        css={css`
          background-color: ${colorToRgb.white};
          border-left: 3px solid ${colorToRgb.black};
          border-right: 3px solid ${colorToRgb.black};
          height: ${props.height};
          width: 100%;
          display: grid;
          place-items: center;
          text-align: center;
        `}
      >
        <div css={css`
          word-wrap: break-word;
          width: 250px;
        `}>{props.text}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          &:before,
          &:after {
            content: '';
            border-top: 3px solid ${colorToRgb.black};
          }
          &:before {
            width: 90%;
          }
          &:after {
            width: 10%;
          }
        `}
      >
        <div
          css={css`
            display: inline-block;
            font-size: 3.5rem;
            margin: -2.5rem 4px auto 4px;
            transform: rotateZ(180deg);
          `}
        >
          “
        </div>
      </div>
    </div>
  )
}

export default OdaiBoard
