import { css } from '@emotion/react'
import {
  mdiFormatColorFill,
  mdiEraser,
  mdiPencil,
  mdiUndo,
  mdiRedo,
  mdiDelete,
} from '@mdi/js'
import Icon from '@mdi/react'
import React, { useMemo } from 'react'
import { Props as MainCanvasProps } from './MainCanvas'

export type Props = {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  type: MainCanvasProps['penType'] | 'undo' | 'redo' | 'clear'
  isSelected?: boolean
  color?: `#${string}` | `rgb(${number}, ${number}, ${number})`
}

const ToolButton = (props: Props) => {
  const icon = useMemo(() => {
    switch (props.type) {
      case 'pen':
        return mdiPencil
      case 'eraser':
        return mdiEraser
      case 'bucket':
        return mdiFormatColorFill
      case 'undo':
        return mdiUndo
      case 'redo':
        return mdiRedo
      case 'clear':
        return mdiDelete
    }
  }, [props.type])

  return (
    <div
      onClick={props.onClick}
      css={css`
        display: inline-block;
        position: relative;
        height: 64px;
        width: 64px;
        border: 3px solid #000000;
        color: #000000;
        user-select: none;
        transition: all 0.1s ease-out;
        ${props.isSelected && ['pen', 'bucket'].includes(props.type)
          ? `background-color: ${props.color};`
          : ''}
        &:hover {
          cursor: url('../src/assets/cursors/onHover.png'), auto;
        }
        &:active {
          color: #646260;
        }
        &::after {
          content: '';
          position: absolute;
          z-index: 3;
          transition: all 0.1s ease-out;
          ${props.isSelected
            ? `
            top: 3px;
            left: 3px;
            right: 3px;
            bottom: 3px;
          `
            : `
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
          `}
          background-color: #ffffff;
          border: 3px solid #000000;
        }
        &:active::after {
          background-color: #e2e2e2;
        }
      `}
    >
      <Icon
        path={icon}
        size="40px"
        css={css`
          display: inline-block;
          position: absolute;
          z-index: 10;
          ${props.type === 'bucket'
            ? 'margin: 14px auto auto;'
            : 'margin: auto;'}
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        `}
      />
    </div>
  )
}

export default ToolButton
