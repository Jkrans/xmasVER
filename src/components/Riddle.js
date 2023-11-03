import { useRef, useState, useEffect } from 'react'

const Riddle = (props) => {
  const [unitsBe, setUnitsBe] = useState(null)

  const inputRef = useRef(null);

  useEffect(() => {
    if (props.setInputRef) {
      props.setInputRef(inputRef.current);
    }
    if (props.unitsBefore) {
      setUnitsBe(props.unitsBefore);
    }
  }, [props.unitsBefore, props.setInputRef]);

  return (
    <>
      <p>{props.riddle}</p>
      <div>
        {unitsBe && <p className='ch2-before-input'>{unitsBe}</p>}
        <form onSubmit={props.checkAnswer} >
          <input
            id='ch2input'
            ref={inputRef}
            value={props.userAnswer}
            type="text"
            maxLength="10"
            onChange={(event) => props.onAnswerChange(event.target.value)}
          />
        </form>
        <p className='answer-p'>{props.units}</p>
      </div>
    </>
  )
}

export default Riddle
