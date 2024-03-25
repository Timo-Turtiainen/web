import { filterChange } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch()
    const handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      
      dispatch(filterChange(event.target.value))
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