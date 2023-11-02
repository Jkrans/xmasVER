import { useRef, useState, useEffect } from 'react'

const Riddle = (props) => {
  const [unitsBe, setUnitsBe] = useState(null)

  const inputRef = useRef(null);

  useEffect(() => {
    if (props.unitsBefore) {
      setUnitsBe(props.unitsBefore);
    }
  }, [props.unitsBefore]);

  return (
    <>
      <p>{props.riddle}</p>
      <div>
        {unitsBe && <p className='answer-p'>{unitsBe}</p>}
        <form onSubmit={props.checkAnswer} >
          <input
            ref={inputRef}
            type="text"
            maxLength="4"
            onChange={(event) => props.onAnswerChange(event.target.value)}
          /></form>
        <p className='answer-p'>{props.units}</p>
      </div>
    </>
  )
}

export default Riddle
