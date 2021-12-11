import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WsDrawStartEventBody } from '/@/utils/apis/generated'

const initialState: WsDrawStartEventBody = {
  timeLimit: 40,
  canvas: {
    boardName: '',
    areaId: 0,
  },
  img: '',
  odai: '',
  drawPhaseNum: 0,
  allDrawPhaseNum: 0,
  drawnArea: [],
}

export const drawSlice = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    setDraw: (state, action: PayloadAction<WsDrawStartEventBody>) => {
      return action.payload
    },
  },
})

export const { setDraw } = drawSlice.actions
export default drawSlice.reducer
