import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '/@/utils/apis/generated'

const initialState: User = {
  avatar: 0,
  username: '',
  userId: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload
    },
    setAvatar: (state, action: PayloadAction<number>) => {
      state.avatar = action.payload
      return state
    },
  },
})

export const { setUser, setAvatar } = userSlice.actions
export default userSlice.reducer
