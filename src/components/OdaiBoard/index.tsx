import { css } from '@emotion/react'
import React from 'react'

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
            border-bottom: 5px solid #000;
          }
        `}
      >
        <div
          css={css`
            display: inline-block;
            font-size: 2rem;
            margin: auto 4px -1.5rem 4px;
          `}
        >
          “
        </div>
      </div>
      <div
        css={css`
          background-color: #fff;
          border-left: 5px solid #000;
          border-right: 5px solid #000;
          height: ${props.height};
          width: 100%;
          display: grid;
          place-items: center;
          text-align: center;
        `}
      >
        {props.text}
      </div>
      <div
        css={css`
          display: flex;
          &:before,
          &:after {
            content: '';
            border-top: 5px solid #000;
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
            font-size: 2rem;
            margin: -1.5rem 4px auto 4px;
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
