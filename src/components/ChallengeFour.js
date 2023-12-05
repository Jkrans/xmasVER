import { useEffect, useState, useRef } from 'react'
import Story from './Story'
import squarepyrmid from '../images/squarepyrmid.png'
import recprism from '../images/rectangularprism.png'
import recpyramid from '../images/rectangularpyrmid.png'
import triprism from '../images/triangularprism.png'
import cube from '../images/cube.png'
import oven from '../images/oven.png'
import TryAgain from './TryAgainMessage'


const ChallengeFour = ({ onPass }) => {
    const [riddles, setRiddles] = useState([]);
    const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0); // starts from the first riddle
    const [userInput, setUserInput] = useState('');
    const [tryAgainMessage, setTryAgainMessage] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(1638);

    // const whiskIconRef = useRef(null);
    // const knifeIconRef = useRef(null);

    useEffect(() => {
        async function fetchRiddles() {
            try {

                const response = await fetch(`https://turkeyver-backend-production.up.railway.app/api/riddles/xver4`);
                const data = await response.json();
                console.log("data: ", data)

                setRiddles(data);
            } catch (err) {
                console.error("An error occurred while fetching riddles:", err);
            }
        }

        fetchRiddles();
    }, []);

    const imageArray = [cube, recprism, squarepyrmid, recpyramid, triprism];


    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {

        let gTimer;
        e.preventDefault();

        let correct = riddles[currentRiddleIndex].answer.some(variant =>
            userInput.toLowerCase().includes(variant.toLowerCase())
        );

        if (correct) {
            riddles[currentRiddleIndex].isSolved = true;
            if ((currentRiddleIndex === riddles.length - 1)) {
                //End the game or display a message, etc.
                onPass(true)
                clearTimeout(gTimer);
            } else {
                setCurrentRiddleIndex((prevIndex) => prevIndex + 1);
                setUserInput('');
                console.log('set to false')
                setTryAgainMessage(false)
            }

        } else {
            // if it's already true, set it to false, then after that, set it to true
            if (tryAgainMessage) {
                setTryAgainMessage(false);
                // Using a timeout to delay the setting of the message to true 
                // to ensure the previous state change has been processed
                setTimeout(() => {
                    setTryAgainMessage(true);
                }, 0);
            } else {
                setTryAgainMessage(true);
            }
        }
    };


    useEffect(() => {
        // Set styles when the component mounts
        document.body.style.background = 'linear-gradient(rgb(0, 100, 0)25%, rgb(0, 100, 150)';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(150, 216, 255, .8)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(50, 200, 125)";
        })


        return () => {
            // Remove styles when the component unmounts
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="main--witch">
            <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/6" color="rgb(255,255,255,0.8)" width="78%" />
            {riddles.length > 0 && (
                <>
                    <div class="floating-icon">
                        <img src={squarepyrmid} alt="Floating Icon" style={{ width: '300px', maxWidth: '512px' }} />
                    </div>
                    <div class="floating-icon-recprism">
                        <img src={recprism} alt="Floating Icon" style={{ width: '350px', maxWidth: '512px' }} />
                    </div>
                    <div class="floating-icon-recpyramid">
                        <img src={recpyramid} alt="Floating Icon" style={{ width: '300px', maxWidth: '512px' }} />
                    </div>
                    <div class="floating-icon-triprism">
                        <img src={triprism} alt="Floating Icon" style={{ width: '300px', maxWidth: '512px' }} />
                    </div>
                    <div class="floating-icon-cube">
                        <img src={cube} alt="Floating Icon" style={{ width: '300px', maxWidth: '512px' }} />
                    </div>
                    <div className='ch4-riddles-container'>
                        <div>
                            <div className='surfaceAreaProblem'>
                                <p>{riddles[currentRiddleIndex].question}</p>
                                <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                                    <input type='text' value={userInput} onChange={handleInputChange} maxLength={35} />
                                    <p className="surfaceAreaProblemInputUnits" >inches squared</p>
                                </form>
                                <TryAgain
                                    message='Please try again'
                                    isDisplayed={tryAgainMessage}
                                    marginTop='1rem'
                                    color='black'
                                />
                            </div>
                            <div className='shapeAndInput'>
                                <img src={imageArray[riddles[currentRiddleIndex].img]} alt="Floating Icon" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>

    )
}

export default ChallengeFour
