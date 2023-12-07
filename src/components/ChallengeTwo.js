import { useEffect, useState } from 'react'
import Story from './Story'
import ImageAndQuestion from './ImageAndQuestion'
import gumballs from '../images/gumballs-extended.png'
import trees from '../images/treeratio-expanded.png'
import wrapping2 from '../images/wrapingpresents2.png'
import wrapping1 from '../images/wrappingpresents-expanded.png'
import penguin from '../images/penguin-expanded.png'
import TryAgain from './TryAgainMessage'


const ChallengeTwo = ({ onPass }) => {
    const [riddles, setRiddles] = useState([]);
    const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0); // starts from the first riddle
    const [inputValues, setInputValues] = useState([]);
    // const [userInput, setUserInput] = useState('');
    const [tryAgainMessage, setTryAgainMessage] = useState(false);

    const imageArray = [trees, wrapping2, gumballs, wrapping1, penguin];


    useEffect(() => {
        async function fetchRiddles() {
            try {

                const response = await fetch(`https://turkeyver-backend-production.up.railway.app/api/riddles/xver2`);
                const data = await response.json();
                const riddlesWithInput = data
                    .map(riddle => ({ ...riddle, userInput: '' }))
                    .sort((a, b) => a.id - b.id);
                setRiddles(riddlesWithInput);


            } catch (err) {
                console.error("An error occurred while fetching riddles:", err);
            }
        }

        fetchRiddles();
    }, []);

    const updateBorderColor = (input, index) => {
        let isCorrect = riddles[index].answer.some(answer =>
            parseInt(input.value) === parseInt(answer)
        );

        if (isCorrect) {
            input.style.borderBottom = '2px solid rgb(0, 255, 0)'; // Correct answer, green
        } else if (input.value !== '' && !isCorrect) {
            input.style.borderBottom = '2px solid rgb(255, 0, 0)'; // Incorrect answer, red
        } else if (document.activeElement === input) {
            input.style.borderBottom = '2px solid rgb(150, 216, 255)'; // Focused input, orange
        } else {
            input.style.borderBottom = '2px solid rgb(0, 0, 0)'; // Unfocused empty input, black
        }
    };



    const handleInputFocus = (index, event) => {
        updateBorderColor(event.target, index);
    };

    const handleInputBlur = (index, event) => {
        updateBorderColor(event.target, index);
    };

    const handleInputChange = (index, event) => {
        const newValue = event.target.value;
        setRiddles(riddles => riddles.map((riddle, riddleIndex) => {
            if (riddleIndex === index) {
                return { ...riddle, userInput: newValue };
            }
            return riddle;
        }));

        updateBorderColor(event.target, index);
    };

    const checkAllRiddles = () => {
        const allSolved = riddles.every(riddle => {
            const correct = riddle.answer.some(variant =>
                (riddle.userInput || '').toLowerCase().includes(variant.toLowerCase())
            );
            return correct;
        });

        if (allSolved) {
            onPass(true);
        } else {
            // Handle the case where not all riddles are solved
            setTryAgainMessage(true);
            setTimeout(() => {
                setTryAgainMessage(false);
            }, 10000);
        }
    };


    useEffect(() => {
        // Set styles when the component mounts
        document.body.style.background = 'linear-gradient(rgb(15, 87, 213) 25%, rgb(163,0,255)';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(255, 255, 255, 0.8)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(163,0,255)";
        });
        console.log(riddles)


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
                    {riddles.map((riddle, index) => (
                        <ImageAndQuestion
                            key={riddle.id}
                            img={imageArray[riddle.img]}
                            left={index % 2 === 0}
                            degrees={index % 2 === 0 ? '3' : '-3'}
                            riddle={riddle.question}
                            currentRiddleIndex={currentRiddleIndex}
                            units={riddle.units}
                            userInput={riddle.userInput || ''}
                            handleInputChange={(e) => handleInputChange(index, e)}
                            handleInputFocus={(e) => handleInputFocus(index, e)}
                            handleInputBlur={(e) => handleInputBlur(index, e)}
                            tryAgainMessage={tryAgainMessage}
                        />
                    ))}

                </>
            )}
            <button className='ch2-submit-btn' onClick={checkAllRiddles}>Submit Answers</button>
            <TryAgain
                message='Please try again'
                isDisplayed={tryAgainMessage}
                marginTop='1rem'
                color='black'
            />
        </div>

    )
}

export default ChallengeTwo

