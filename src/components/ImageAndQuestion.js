
import TryAgain from './TryAgainMessage'

const ImageAndQuestion = (props) => {
    // Constructor, state, and methods would be defined here if needed
    const { riddle, handleSubmit, userInput, handleInputChange, tryAgainMessage, img, degrees, left } = props;


    return (
        <div className='riddles-container'>
            <img className='riddles-img' src={img} alt="Gumballs" style={{ display: left ? 'block' : 'none', transform: `rotate(${degrees}deg)` }} />
            <div className='ratio-problems'>
                <p>{riddle}</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                    <input
                        type='text'
                        value={userInput}
                        onChange={handleInputChange}
                        maxLength={35}
                        aria-label="Answer input"
                    />
                    <p className="surfaceAreaProblemInputUnits">inches squared</p>
                </form>
                <TryAgain
                    message='Please try again'
                    isDisplayed={tryAgainMessage}
                    marginTop='1rem'
                    color='black'
                />
            </div>
            <img className='riddles-img' src={img} alt="Gumballs" style={{ display: left ? 'none' : 'block', transform: `rotate(${degrees}deg)` }} />
        </div>
    );
}

export default ImageAndQuestion;
