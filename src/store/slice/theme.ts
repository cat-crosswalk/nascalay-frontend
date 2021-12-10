import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WsGameStartEventBody } from '/@/utils/apis/generated'

const initialState: WsGameStartEventBody = {
  odaiHint: '',
  timeLimit: 40,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<WsGameStartEventBody>) => {
      return action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
