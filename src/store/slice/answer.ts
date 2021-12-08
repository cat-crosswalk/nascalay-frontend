import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnswerStartEvent } from '/@/utils/apis/generated'

const initialState: AnswerStartEvent = {
  timeLimit: 0,
  img: '',
}

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<AnswerStartEvent>) => {
      state = action.payload
    },
  },
})

export const { setAnswer } = answerSlice.actions
export default answerSlice.reducer
