import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return `You voted ${action.payload.content}`
        },
        clearNotification() {
            return ''
        }
    }
})
export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer