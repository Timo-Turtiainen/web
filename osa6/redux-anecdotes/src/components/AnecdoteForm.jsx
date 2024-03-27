import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdotSlice'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const [anecdote, setAnecdote] = useState('')
    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(createAnecdote(newAnecdote))
        setAnecdote('')
      }
  return (
    <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input value={anecdote} onChange={({target}) => setAnecdote(target.value)}/></div>
      <button type='submit'>create</button>
    </form>
    </>
  )
}

export default AnecdoteForm
