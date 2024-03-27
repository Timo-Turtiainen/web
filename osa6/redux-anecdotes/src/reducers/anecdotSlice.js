import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'



const anecdotSlice = createSlice({
    name: 'ancdotes',
    initialState : [],
    reducers: {
      voteAnecdote(state, action) {
        const id = action.payload.id
        const anecdotToChange = state.find(n => n.id === id)
        const changeAnecdot = { ...anecdotToChange, votes: anecdotToChange.votes +1 }
        return state.map(anecdot => anecdot.id !== id ? anecdot : changeAnecdot )
      },
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      },
    }
  })

  export const initializeAnecdotes = () => {
    return async dispatch => {
      const ancdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(ancdotes))
    }
  }

  export const createAnecdote = content => {
    return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
    }
  }

  export const createVote = content => {
    return async dispatch => {
      const vote = await anecdoteService.updateVote(content)
      dispatch(voteAnecdote(vote))
    }
  }

  export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdotSlice.actions
  export default anecdotSlice.reducer