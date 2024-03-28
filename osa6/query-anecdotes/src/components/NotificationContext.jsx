import { createContext, useContext, useReducer } from 'react'


const notificationReducer = (state, action) => {
    switch(action.type) {
      case 'VOTE':
        return action.payload
      case 'NEW':
        return action.payload
      default:
        return state
    }
  }

  const NotificationContext = createContext()

  export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value= { [notification, notificationDispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
  }

  export const useNotificationContext = () => {
    return useContext(NotificationContext)
  }

  export default NotificationContext