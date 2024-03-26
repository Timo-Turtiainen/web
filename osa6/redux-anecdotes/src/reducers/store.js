import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import notificationReducer from './notificationSlice'
import anecdoteReducer from '../reducers/anecdotSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store