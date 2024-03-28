import { useNotificationContext } from './NotificationContext'

const Notification = () => {

  const [notification, dispatch] = useNotificationContext()

  if(!notification) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  setTimeout(() => dispatch({type: 'VOTE', payload: ''}), 2000)
  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification
