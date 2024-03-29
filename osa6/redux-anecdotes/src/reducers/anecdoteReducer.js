const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.payload.id
      const anecdotToChange = state.find(n => n.id === id)
      const changeAnecdot = { ...anecdotToChange, votes: anecdotToChange.votes +1 }
      return state.map(anecdot => anecdot.id !== id ? anecdot : changeAnecdot )
    case 'NEW_ANECDOTE': 
      return state.concat(action.payload)
  }
  return state
}

export const voteAnecdote = (id) => {
  return  {
    type: 'VOTE',
    payload: { id }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: { 
      content: anecdote,
      id: getId(),
      votes: 0
     }
  }
}

export const filterReducer = (state = "", action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return action.payload
      
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

export default anecdotReducer