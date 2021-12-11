import { css } from '@emotion/react'
import React from 'react'
import { ColorType, colorToRgb } from '/@/utils/color'

type Props = {
  text: string
  color: ColorType
  disabled?: boolean
  selected?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  height?: string
  width?: string
  hasShadow?: boolean
}

const FlatButton: React.VFC<Props> = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled ?? false}
      css={css`
        position: relative;
        user-select: none;
        font-size: 32px;
        background-color: ${colorToRgb[props.color]};
        color: #000;
        border: 3px solid #000;
        padding: 16px 64px;
        ${props.height ? `height: ${props.height};` : ''}
        ${props.width ? `width: ${props.width};` : ''}
        transition: all 0.1s ease-in-out;
        ${props.hasShadow ? 'box-shadow: 8px 8px 0px rgba(0, 0, 0, 1);' : ''}
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
        &:disabled::after {
          background-color: rgba(0, 0, 0, 0.15);
        }
        &:disabled {
          color: #777777;
          border-color: #777777;
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
