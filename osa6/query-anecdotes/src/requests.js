import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => 
  axios.post(baseUrl, newAnecdote).then(response => response.data)

export const addVote = async (content) => {
  const object = { ...content.anecdote, votes: content.anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${content.anecdote.id}`, object)
  return response.data
}