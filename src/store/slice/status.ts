import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Status {
  showNext: string
}

const initialState: Status = {
  showNext: '',
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setShowNext: (state, action: PayloadAction<string>) => {
      state.showNext = action.payload
      return state
    },
  },
})

export const { setShowNext } = statusSlice.actions
export default statusSlice.reducer
