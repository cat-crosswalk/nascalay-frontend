import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Status {
  showNext: string
  showNow: string
  bgColor: string
}

const initialState: Status = {
  showNext: '',
  showNow: '',
  bgColor: '#DCCCA2',
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
    setBgColor: (state, action: PayloadAction<string>) => {
      state.bgColor = action.payload
      return state
    },
  },
})

export const { setShowNext, setShowNow, setBgColor } = statusSlice.actions
export default statusSlice.reducer
