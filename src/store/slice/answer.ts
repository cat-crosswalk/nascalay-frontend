import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WsAnswerStartEventBody } from '/@/utils/apis/generated'

const initialState: WsAnswerStartEventBody = {
  timeLimit: 0,
  img: '',
}

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<WsAnswerStartEventBody>) => {
      return action.payload
    },
  },
})

export const { setAnswer } = answerSlice.actions
export default answerSlice.reducer
