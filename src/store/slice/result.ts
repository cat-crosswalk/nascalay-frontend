import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '/@/utils/apis/generated'

export interface Result {
  img: string | null
  answerer: User | null
  sender: User | null
  answer: string | null
  odai: string | null
}

const initialState: Result = {
  img: null,
  answerer: null,
  sender: null,
  answer: null,
  odai: null,
}

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setResultImage(state, action: PayloadAction<string | null>) {
      return { ...state, img: action.payload }
    },
    setResultAnswerer(state, action: PayloadAction<User | null>) {
      return { ...state, answerer: action.payload }
    },
    setResultSender(state, action: PayloadAction<User | null>) {
      return { ...state, sender: action.payload }
    },
    setResultAnswer(state, action: PayloadAction<string | null>) {
      return { ...state, answer: action.payload }
    },
    setResultOdai(state, action: PayloadAction<string | null>) {
      return { ...state, odai: action.payload }
    },
  },
})

export const {
  setResultImage,
  setResultAnswerer,
  setResultSender,
  setResultAnswer,
  setResultOdai,
} = resultSlice.actions
export default resultSlice.reducer
