import { css } from '@emotion/react'

import { borderColor,shadowColor } from '/@/styles/color'

export const card = css`
  border: ${borderColor} solid 3px;
  box-shadow: 10px 10px ${shadowColor};
`