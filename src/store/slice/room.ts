import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Room, WsRoomNewMemberEventBody } from '/@/utils/apis/generated'

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
    setRoomNewMember(state, action: PayloadAction<WsRoomNewMemberEventBody>) {
      return { ...state, ...action.payload }
    },
  },
})

export const { setRoom, setRoomNewMember } = roomSlice.actions
export default roomSlice.reducer
