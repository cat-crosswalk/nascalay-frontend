import { createSlice } from '@reduxjs/toolkit'

interface Status {
  isJoinRoom: boolean
}

const initialState: Status = {
  isJoinRoom: false,
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    joinRoom: (state) => {
      state.isJoinRoom = true
    },
    leaveRoom: (state) => {
      state.isJoinRoom = false
    }
  }
})

export const { joinRoom, leaveRoom } = statusSlice.actions
export default statusSlice.reducer
