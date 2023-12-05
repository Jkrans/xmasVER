import { useEffect, useState } from 'react'
import Story from './Story'
import ImageAndQuestion from './ImageAndQuestion'
import gumballs from '../images/gumballs-extended.png'
import trees from '../images/treeratio-expanded.png'
import wrapping2 from '../images/wrapingpresents2.png'
import wrapping1 from '../images/wrappingpresents-expanded.png'
// import TryAgain from './TryAgainMessage'


const ChallengeTwo = ({ onPass }) => {
    const [riddles, setRiddles] = useState([]);
    const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0); // starts from the first riddle
    const [userInput, setUserInput] = useState('');
    const [tryAgainMessage, setTryAgainMessage] = useState(false);
    useEffect(() => {
        async function fetchRiddles() {
            try {

                const response = await fetch(`https://turkeyver-backend-production.up.railway.app/api/riddles/xver2`);
                const data = await response.json();
                console.log("data: ", data)

                setRiddles(data);
                console.log("riddles: ", riddles)
                console.log("riddles 1: ", riddles[0].question)
            } catch (err) {
                console.error("An error occurred while fetching riddles:", err);
            }
        }

        fetchRiddles();
    }, [riddles]);


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
        document.body.style.background = 'linear-gradient(rgb(15, 87, 213) 25%, rgb(255,215,0)';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(255, 255, 255, 0.8)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(255,215,0)";
        });


        return () => {
            // Remove styles when the component unmounts
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="main--witch">
            <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/7" color="rgb(255,255,255,0.8)" width="78%" />
            {riddles.length > 0 && (
                <>
                    <ImageAndQuestion
                        img={trees}
                        left={false}
                        degrees='3'
                        riddle={riddles[0].question}
                        currentRiddleIndex={currentRiddleIndex}
                        handleSubmit={handleSubmit}
                        userInput={userInput}
                        handleInputChange={handleInputChange}
                        tryAgainMessage={tryAgainMessage}
                    />
                    <ImageAndQuestion
                        img={wrapping2}
                        left={true}
                        degrees='-4'
                        riddle={riddles[1].question}
                        currentRiddleIndex={currentRiddleIndex}
                        handleSubmit={handleSubmit}
                        userInput={userInput}
                        handleInputChange={handleInputChange}
                        tryAgainMessage={tryAgainMessage}
                    />
                    <ImageAndQuestion
                        img={gumballs}
                        left={false}
                        degrees='3'
                        riddle={riddles[2].question}
                        currentRiddleIndex={currentRiddleIndex}
                        handleSubmit={handleSubmit}
                        userInput={userInput}
                        handleInputChange={handleInputChange}
                        tryAgainMessage={tryAgainMessage}
                    />
                    <ImageAndQuestion
                        img={wrapping1}
                        left={true}
                        degrees='-3'
                        riddle={riddles[3].question}
                        currentRiddleIndex={currentRiddleIndex}
                        handleSubmit={handleSubmit}
                        userInput={userInput}
                        handleInputChange={handleInputChange}
                        tryAgainMessage={tryAgainMessage}

                    />

                </>
            )}
        </div>

    )
}

export default ChallengeTwo

