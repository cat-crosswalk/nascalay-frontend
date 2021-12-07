import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameStartEvent } from '/@/utils/apis/generated'

const initialState: GameStartEvent = {
  odaiHint: '',
  timeLimit: 40,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<GameStartEvent>) => {
      state.odaiHint = action.payload.odaiHint
      state.timeLimit = action.payload.timeLimit
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
