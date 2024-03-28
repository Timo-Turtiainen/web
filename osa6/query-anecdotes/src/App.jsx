import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { addVote, getAnecdotes } from './requests'
import { useContext } from 'react'
import AnecdoteContext from './components/AnecdoteContext'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(AnecdoteContext)

  const voteMutation = useMutation({
    mutationFn: addVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ anecdote })
    notificationDispatch({type: 'VOTE', payload: anecdote})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })


  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data
  
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
