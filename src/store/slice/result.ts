import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '/@/utils/apis/generated'

type Nullable<T> = { [key in keyof T]: T[key] | null }
export type Result = Nullable<{
  img: string
  answerer: User
  sender: User
  answer: string
  odai: string
}>

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
    setResultImage(state, action: PayloadAction<Result['img']>) {
      return { ...state, img: action.payload }
    },
    setResultAnswerer(state, action: PayloadAction<Result['answerer']>) {
      return { ...state, answerer: action.payload }
    },
    setResultSender(state, action: PayloadAction<Result['sender']>) {
      return { ...state, sender: action.payload }
    },
    setResultAnswer(state, action: PayloadAction<Result['answer']>) {
      return { ...state, answer: action.payload }
    },
    setResultOdai(state, action: PayloadAction<Result['odai']>) {
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
