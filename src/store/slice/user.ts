import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '/@/utils/apis/generated'

const initialState: User = {
  avatar: {
    type: 0,
    color: '#ffffff',
  },
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
    setAvatarType: (state, action: PayloadAction<number>) => {
      state.avatar.type = action.payload
      return state
    },
    setAvatarColor: (state, action: PayloadAction<string>) => {
      state.avatar.color = action.payload
      return state
    },
  },
})

export const { setUser, setAvatarType, setAvatarColor } = userSlice.actions
export default userSlice.reducer
