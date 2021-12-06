import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from '/@/store/slice/counter'
import userReducer from '/@/store/slice/user'

const reducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
})

const store = configureStore({
  reducer,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
