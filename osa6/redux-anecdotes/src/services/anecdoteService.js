import axios from 'axios'
import { nanoid } from '@reduxjs/toolkit'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content , id: nanoid(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (content) => {
  const object = { ...content, votes: content.votes + 1 }
  const response = await axios.put(`${baseUrl}/${content.id}`, object)
  return response.data
}

export default { getAll, createNew, updateVote }

