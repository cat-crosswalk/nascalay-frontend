import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {DrawStartEvent} from '/@/utils/apis/generated'

const initialState: DrawStartEvent = {
  timeLimit: 40,
  img: '',
  odai: '',
  drawPhaseNum: 0,
  allDrawPhaseNum: 0
}

export const drawSlice = createSlice({
  name: 'draw',
  initialState,
  reducers: {
    setDraw: (state, action: PayloadAction<DrawStartEvent>) => {
      state = action.payload
    }
  }
})

export const { setDraw } = drawSlice.actions
export default drawSlice.reducer
