import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slice/user'
import themeReducer from './slice/theme'
import drawReducer from './slice/draw'
import answerReducer from './slice/answer'
import roomReducer from './slice/room'
import statusReducer from './slice/status'
import resultReducer from './slice/result'

const reducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  draw: drawReducer,
  answer: answerReducer,
  room: roomReducer,
  status: statusReducer,
  result: resultReducer,
})

const store = configureStore({
  reducer,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
