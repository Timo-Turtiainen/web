import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'ancdotes',
    initialState : '',
    reducers: {
        filterAnecdote(state, action) {
            return action.payload
        },
    }
})
export const { filterAnecdote } = filterSlice.actions

export default filterSlice.reducer