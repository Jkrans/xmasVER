const ImageAndQuestion = (props) => {
    // Constructor, state, and methods would be defined here if needed
    const { riddle, handleInputChange, handleInputFocus, handleInputBlur, tryAgainMessage, img, degrees, left, units } = props;


    return (
        <div className='riddles-container'>
            <img className='riddles-img' src={img} alt="Gumballs" style={{ display: left ? 'block' : 'none', transform: `rotate(${degrees}deg)` }} />
            <div className='ratio-problems'>
                <p>{riddle}</p>
                <form style={{ display: 'flex' }}>
                    <input
                        type='text'
                        value={riddle.userInput}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        maxLength={3}
                        aria-label="Answer input"
                    />
                    <p className="surfaceAreaProblemInputUnits">{units}</p>
                </form>

            </div>
            <img className='riddles-img' src={img} alt="Gumballs" style={{ display: left ? 'none' : 'block', transform: `rotate(${degrees}deg)` }} />
        </div>
    );
}

export default ImageAndQuestion;
