import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdotReducer, { filterReducer } from './reducers/anecdoteReducer'

// combineReducer
const reducer = combineReducers({
  anecdotes: anecdotReducer,
  filter: filterReducer
})
// create store
const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)