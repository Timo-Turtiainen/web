import React from 'react'

function Part(props) {
  return (
    <div>
      <p>{props.parts.name} : {props.parts.exercises}</p>
    </div>
  )
}

export default Part
