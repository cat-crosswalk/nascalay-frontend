import { css } from '@emotion/react'
import React from 'react'
import { ColorType, colorToRgb } from '/@/utils/color'

type Props = {
  text: string
  color: ColorType
  selected?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const FlatButton: React.VFC<Props> = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      css={css`
        position: relative;
        font-size: 32px;
        background-color: ${colorToRgb[props.color]};
        color: #000;
        border: 3px solid #000;
        padding: 16px 64px;
        transition: all 0.1s ease-in-out;
        &::after {
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-color: rgba(255, 255, 255, 0);
          transition: all 0.2s ease-out;
        }
        &:hover::after {
          background-color: rgba(255, 255, 255, 0.15);
        }
        &:active::after {
          background-color: rgba(0, 0, 0, 0.15);
        }
        :before {
          position: absolute;
          content: '';
          transition: all 0.2s ease-out;
          ${props.selected
            ? `
            top: 6px;
            left: 6px;
            bottom: 6px;
            right: 6px;
            border: 3px solid rgba(0, 0, 0, 1);
          `
            : `
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border: 3px solid rgba(0, 0, 0, 0);
          `}
        }
      `}
    >
      {props.text}
    </button>
  )
}

export default FlatButton
