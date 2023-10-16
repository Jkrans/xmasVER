import React from 'react'

const Riddle = (props) => {
  return (
    <>
        <p>{props.riddle}</p>
        <div>
            <input 
                type="text" 
                maxLength="3"
                onChange={(event) => props.onAnswerChange(event.target.value)}
            /> 
            <p className='answer-p'>{props.units}</p>
        </div>
    </>
  )
}

export default Riddle
