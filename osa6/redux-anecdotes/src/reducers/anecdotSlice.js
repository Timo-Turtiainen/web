import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotSlice = createSlice({
    name: 'ancdotes',
    initialState : [],
    reducers: {
      createAnecdote(state, action) {
        const content = action.payload
        state.push({
          content,
          id: getId(),
          votes: 0
        })
      },
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
      }
    }
  })
  
  export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdotSlice.actions
  export default anecdotSlice.reducer