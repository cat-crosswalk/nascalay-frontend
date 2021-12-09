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
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
