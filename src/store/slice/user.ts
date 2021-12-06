import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  avatar: number
  name: string
  userId: string
}

const initialState: User = {
  avatar: 0,
  name: '',
  userId: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.avatar = action.payload.avatar
      state.name = action.payload.name
      state.userId = action.payload.userId
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
