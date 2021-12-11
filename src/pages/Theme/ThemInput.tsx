import React, { useCallback, useState } from 'react'
import { css } from '@emotion/react'
import { card } from '/@/utils/card'

import { colorToRgb } from '/@/utils/color'
import { useAppSelector } from '/@/store/hooks'

const ThemeInput = () => {
  const odai = useAppSelector((state) => state.theme)
  const [theme, setTheme] = useState('')
  const [isReadonly, setisReadonly] = useState(false)
  const inputHandler = useCallback((e) => {
    setTheme(e.target.value)
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
        
      </div>
    </div>
  )
}

const containerStyle = css`
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
  margin-top: 5rem;
  background-color: ${colorToRgb.white};
  width: 100%;
  height: 64px;
  border: 3px solid ${colorToRgb.black};
  font-size: 1.5rem;
  line-height: 64px;
  vertical-align: middle;
  padding-left: 1.5rem;
  color: rgba(0, 0, 0, 0.2);
`

const doneButtonStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`

export default ThemeInput
