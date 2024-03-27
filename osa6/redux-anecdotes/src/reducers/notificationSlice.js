import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notification(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    }
})

export const { notification, clearNotification } = notificationSlice.actions


export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(notification(content))
        setTimeout(() => { dispatch(clearNotification()) }, time *1000)
    }

}

export default notificationSlice.reducer