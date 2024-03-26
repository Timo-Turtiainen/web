import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setMessage(state, action) {
            return `You voted ${action.payload.content}`
        },
        clearMessage(state, action) {
            return ''
        }
    }
})
export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer