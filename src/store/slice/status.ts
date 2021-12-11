import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Status {
  showNext: string
  showNow: string
}

const initialState: Status = {
  showNext: '',
  showNow: '',
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
      state.showNext = action.payload
      return state
    }
  },
})

export const { setShowNext, setShowNow } = statusSlice.actions
export default statusSlice.reducer
