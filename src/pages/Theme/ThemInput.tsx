import React, { useCallback, useState } from 'react'
import { css } from '@emotion/react'
import { card } from '/@/utils/card'

import { colorToRgb } from '/@/utils/color'
import { useAppSelector } from '/@/store/hooks'

import DoneButton from '/@/components/DoneButton'

const ThemeInput = () => {
  const odai = useAppSelector((state) => state.theme)
  const [theme, setTheme] = useState('')
  const [isReadonly, setIsReadonly] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const inputHandler = useCallback((e) => {
    setTheme(e.target.value)
  }, [])

  const odaiReady = useCallback((e) => {
    setIsDone(e)
    setIsReadonly(e)
    // wsSend
  }, [])
  return (
    <div css={[containerStyle, card]}>
      <h2 css={titleStyle}>お題を入力してください</h2>
      <input
        type="text"
        css={inputStyle}
        placeholder={odai.odaiExample}
        value={theme}
        onChange={inputHandler}
        readOnly={isReadonly}
      />
      <div css={doneButtonStyle}>
        <DoneButton
          text="完了"
          doneText="編集"
          color="blue"
          doneColor="yellow"
          isDone={isDone}
          onClick={odaiReady}
        />
      </div>
    </div>
  )
}

const containerStyle = css`
  position: relative;
  width: 100%;
  background-color: ${colorToRgb.red};
  padding: 36px 48px;
  padding-top: 12px;
`

const titleStyle = css`
  font-size: 2rem;
  line-height: 6rem;
`

const inputStyle = css`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  background-color: ${colorToRgb.white};
  width: calc(100% - 96px);
  height: 64px;
  border: 3px solid ${colorToRgb.black};
  font-size: 1.5rem;
  line-height: 64px;
  vertical-align: middle;
  padding-left: 1.5rem;
  color: ${colorToRgb.black};
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
`

const doneButtonStyle = css`
  position: absolute;
  transform: translate(-50%, 0);
  bottom: 36px;
  left: 50%;
`

export default ThemeInput
