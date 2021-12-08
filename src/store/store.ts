import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from './slice/counter'
import userReducer from './slice/user'
import themeReducer from './slice/theme'
import drawReducer from './slice/draw'
import answerReducer from './slice/answer'

const reducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
  theme: themeReducer,
  draw: drawReducer,
  answer: answerReducer,
})

const store = configureStore({
  reducer,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
