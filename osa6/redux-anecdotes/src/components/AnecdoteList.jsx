import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdotSlice'
import { setMessage,clearMessage } from '../reducers/notificationSlice'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state =>state.anecdotes)
  const query = useSelector(state => state.filter)
  
  const mostVotes = anecdotes.toSorted((a,b) => b.votes - a.votes)
  const filteredValue = mostVotes.filter(anecdote => anecdote.content.toLowerCase().includes(query.toLowerCase()))

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(setMessage(id))
    setTimeout(5000)
    dispatch(clearMessage())
  }

  return (
  <>
      {filteredValue.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
        </div>
          <div>
            has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
          </div>
      </div>
      )}
  </>

  )
}

export default AnecdoteList
