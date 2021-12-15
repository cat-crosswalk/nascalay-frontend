import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Status {
  showNext: string
  showNow: string
  boardType: string
}

const initialState: Status = {
  showNext: '',
  showNow: '',
  boardType: '4x4',
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setShowNext: (state, action: PayloadAction<string>) => {
      state.showNext = action.payload
      return state
    },
    setShowNow: (state, action: PayloadAction<string>) => {
      state.showNow = action.payload
      return state
    },
    setBoardType: (state, action: PayloadAction<string>) => {
      state.boardType = action.payload
      return state
    },
  },
})

export const { setShowNext, setShowNow, setBoardType } = statusSlice.actions
export default statusSlice.reducer
