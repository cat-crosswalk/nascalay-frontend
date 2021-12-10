import { css } from '@emotion/react'

import { colorToRgb } from './color'

export const card = css`
  border: ${colorToRgb.black} solid 3px;
  box-shadow: 10px 10px ${colorToRgb.black};
`
