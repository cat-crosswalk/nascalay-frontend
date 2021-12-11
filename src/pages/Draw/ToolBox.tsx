import { css } from '@emotion/react'
import React from 'react'
import ToolButton from './ToolButton'
import { Props as MainCanvasProps } from './MainCanvas'

export type Props = {
  onChange?: (tool: MainCanvasProps['penType']) => void
  penType: MainCanvasProps['penType']
  penColor: MainCanvasProps['color']
  undo?: () => void
  redo?: () => void
  clear?: () => void
}

const ToolBox = ({ onChange, penType, penColor, undo, redo, clear }: Props) => {
  return (
    <div>
      <div
        css={css`
          display: grid;
          grid-template-columns: 64px 64px 64px;
          grid-row-gap: 20px;
          grid-column-gap: 20px;
        `}
      >
        <input
          css={css`
            display: none;
          `}
          type="radio"
          name="toolType"
          id="pen"
          checked={penType === 'pen'}
          onChange={() => onChange?.('pen')}
        />
        <label htmlFor="pen">
          <ToolButton
            type="pen"
            color={penColor}
            isSelected={penType === 'pen'}
          />
        </label>
        <input
          css={css`
            display: none;
          `}
          type="radio"
          name="toolType"
          id="eraser"
          checked={penType === 'eraser'}
          onChange={() => onChange?.('eraser')}
        />
        <label htmlFor="eraser">
          <ToolButton
            type="eraser"
            color={penColor}
            isSelected={penType === 'eraser'}
          />
        </label>
        <input
          css={css`
            display: none;
          `}
          type="radio"
          name="toolType"
          id="bucket"
          checked={penType === 'bucket'}
          onChange={() => onChange?.('bucket')}
        />
        <label htmlFor="bucket">
          <ToolButton
            type="bucket"
            color={penColor}
            isSelected={penType === 'bucket'}
          />
        </label>

        <ToolButton type="undo" onClick={undo} />
        <ToolButton type="redo" onClick={redo} />
        <ToolButton type="clear" onClick={clear} />
      </div>
    </div>
  )
}

export default ToolBox
