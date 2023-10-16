import React from 'react'

const PigpenLetters = (props) => {

    const {top, left, bottom, right} = props

  return (
    <p style={{
        top: top, 
        right: right,
        bottom: bottom,
        left: left,
    }}>
        {props.letter}</p>
  )
}

export default PigpenLetters
