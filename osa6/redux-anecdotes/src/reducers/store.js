import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './anecdotSlice'
import filterReducer from './filterSlice'
import notificationReducer from './notificationSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store