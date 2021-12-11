import { css } from '@emotion/react'

import { colorToRgb } from './color'

export const card = css`
  border: ${colorToRgb.black} solid 3px;
  box-shadow: 7px 7px ${colorToRgb.black};
`
