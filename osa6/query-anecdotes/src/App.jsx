import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { addVote, getAnecdotes } from './requests'
import { useNotificationContext } from './components/NotificationContext'

const App = () => {
  
  const [notification, dispatch] = useNotificationContext()

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: addVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ anecdote })
    dispatch({ type: 'VOTE', payload: `${anecdote.content} voted` })

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
