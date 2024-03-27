import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdotSlice'
import { setNotification } from '../reducers/notificationSlice'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state =>state.anecdotes)
  const query = useSelector(state => state.filter)
  
  const mostVotes = anecdotes.toSorted((a,b) => b.votes - a.votes)
  const filteredValue = mostVotes.filter(anecdote => anecdote.content.toLowerCase().includes(query.toLowerCase()))

  const vote = (anecdote) => {
    dispatch(createVote(anecdote))
    // dispatch(setNotification(anecdote))
    // setTimeout(() => {dispatch(clearNotification())}, 5000)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }
  // dispatch(setNotification(`you voted '${anecdote.content}'`, 10))

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
