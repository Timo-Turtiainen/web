import { useDispatch } from "react-redux"
import { filterAnecdote } from "../reducers/filterSlice"

const Filter = () => {
  const dispatch = useDispatch()
  
    const handleChange = (e) => {
      // input-kentän arvo muuttujassa event.target.value
      dispatch(filterAnecdote(e.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={(e)=>handleChange(e)} />
      </div>
    )
  }
  
  export default Filter