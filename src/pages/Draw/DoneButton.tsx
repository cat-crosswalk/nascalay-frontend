import { css } from '@emotion/react'
import React, { useCallback } from 'react'
import FlatButton from '/@/components/FlatButton'

type Props = {
  isDone?: boolean
  onClick?: (e: boolean) => void
}

const DoneButton = (props: Props) => {
  const onClickDone = useCallback(() => {
    props.onClick && props.onClick(true)
  }, [props])
  const onClickUndone = useCallback(() => {
    props.onClick && props.onClick(false)
  }, [props])

  const rotateUp = css`
    transform: rotate3d(1, 0, 0, -90deg);
  `
  const rotateDown = css`
    transform: rotate3d(1, 0, 0, 90deg);
  `
  const baseStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.15s ease-out;
    transform-origin: center center -40px;
  `

  return (
    <div
      css={css`
        position: relative;
        width: 232px;
        height: 80px;
        /* filter: drop-shadow(8px 8px 0px rgba(0, 0, 0, 1)); */
        box-shadow: 8px 8px 0px rgba(0, 0, 0, 1);
        margin: 16px;
      `}
    >
      <div css={(props.isDone ? [rotateUp] : []).concat([baseStyle])}>
        <FlatButton
          text="完成！"
          color="red"
          height="80px"
          width="232px"
          onClick={onClickDone}
        />
      </div>
      <div css={(!props.isDone ? [rotateDown] : []).concat([baseStyle])}>
        <FlatButton
          text="編集"
          color="yellow"
          height="80px"
          width="232px"
          onClick={onClickUndone}
        />
      </div>
    </div>
  )
}

export default DoneButton
