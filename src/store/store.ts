import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slice/user'
import themeReducer from './slice/theme'
import drawReducer from './slice/draw'
import answerReducer from './slice/answer'
import roomReducer from './slice/room'
import statusReducer from './slice/status'

const reducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  draw: drawReducer,
  answer: answerReducer,
  room: roomReducer,
  status: statusReducer,
})

const store = configureStore({
  reducer,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
