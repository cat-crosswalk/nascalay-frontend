import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Room } from '/@/utils/apis/generated'

const initialState: Room = {
  roomId: '',
  capacity: 0,
  userId: '',
  hostId: '',
  members: [],
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room>) => {
      return action.payload
    },
  },
})

export const { setRoom } = roomSlice.actions
export default roomSlice.reducer
