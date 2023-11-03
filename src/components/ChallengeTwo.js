import { useState, useEffect } from 'react'
import maze from '../images/maze.png'
import turkey from '../images/turkey-walk2.png'
import scarecrow from '../images/scarecrow.gif'
import Story from "./Story"
import Riddle from "./Riddle"
import TryAgain from './TryAgainMessage';

// Get random values
// const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

// riddles objects: riddles, answers, and the units the answers should be in.
// const riddles = [
//     {
//         riddle: "When this field was 10 years old, I was half its age. How old will I be when this field is 50 years old?",
//         answer: ["45"],
//         units: "years old"
//     },
//     {
//         riddle: `A pumpkin and a corncob cost $11.00 in total. The pumpkin costs $10.00 more than the corncob. How much does the corncob cost?`,
//         answer: ["0.5", "0.50", ".5"],
//         units: [""],
//         unitsBefore: "$"
//     },
//     {
//         riddle: `Which of these cornstalks reaches higher into the sky: one that measures 10 feet tall, or another that stands at 4 yards tall?`,
//         answer: ["4"],
//         units: "minute/s"
//     },
//     {
//         riddle: "In a haunted game of luck you flip a coin 5 times, and it lands tails up each time. What are the chances it will land heads up on your next flip?",
//         answer: ["50"],
//         units: "%"
//     },
// ]

//ChallengeTwo component
const ChallengeTwo = ({ onPass }) => {
    const [storyData, setStoryData] = useState([])
    const [riddles, setRiddles] = useState({})
    const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showTryAgainMessage, setShowTryAgainMessage] = useState(false);

    useEffect(() => {
        async function fetchStory() {
            try {
                const response = await fetch("https://turkeyver-backend-production.up.railway.app/api/stories/2");
                const data = await response.json();
                setStoryData(data);
            } catch (err) {
                console.error("An error occurred while fetching story:", err);
            }
        }

        fetchStory();
    }, []);

    useEffect(() => {
        async function fetchRiddles() {
            try {
                const response = await fetch("https://turkeyver-backend-production.up.railway.app/api/ch2riddles");
                const data = await response.json();
                setRiddles(data);
            } catch (err) {
                console.error("An error occurred while fetching riddles:", err);
            }
        }

        fetchRiddles();
    }, []);

    let inputReference = null;

    const setInputRef = (ref) => {
        inputReference = ref;
    };

    const checkAnswer = (e) => {
        e.preventDefault();

        let correct = riddles[currentRiddleIndex].answer.includes(userAnswer.toLowerCase());


        if (correct) {
            if (currentRiddleIndex < riddles.length - 1) {
                setCurrentRiddleIndex(currentRiddleIndex + 1); // Move to next riddle
                setUserAnswer(''); // Reset answer input
            } else {
                onPass(true); // All riddles solved
            }
            setShowTryAgainMessage(false);
        } else {
            setShowTryAgainMessage(true);
            setTimeout(() => {
                setShowTryAgainMessage(false);
            }, 10000);
        }

        if (inputReference) {
            console.log("input ref", inputReference);
            console.log("Is input disabled?", inputReference.disabled);
            console.log("Is input visible?", inputReference.offsetWidth > 0 && inputReference.offsetHeight > 0);

            setTimeout(() => {
                if (inputReference) {
                    inputReference.focus();
                }
            }, 10);

            inputReference.onblur = (e) => {
                console.log("Focus shifted to:", e.relatedTarget);
            };

            inputReference.addEventListener("blur", () => {
                console.log("Input was blurred");
            });

        }
        // hacky-ish way to do this because useRef wasn't working.
        e.stopPropagation();
        setTimeout(() => {
            document.getElementById("ch2input").focus();
        }, 0);
    };

    useEffect(() => {
        // Set styles when the component mounts
        document.body.style.background = 'linear-gradient(rgb(15, 87, 213), rgb(0, 164, 33)';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(255, 255, 255, 0.8)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(0, 164, 33)";
        });


        return () => {
            // Remove styles when the component unmounts
            document.body.style.backgroundColor = '';
        };
    }, []);


    return (
        <div className="main--witch">
            <Story title={storyData.title} story={storyData.story} color="rgb(255,255,255,0.8)" width="70%" />

            <div className='riddles-container'>
                <div style={{ position: 'relative' }}>
                    <img className="ch2-maze" src={maze} alt="simple yellow maze" />
                    <img className="ch2-turkey" src={turkey} alt="turkey graphic" />
                </div>
                <div className='riddles'>
                    {riddles.length > 0 && (
                        <Riddle
                            key={currentRiddleIndex}
                            riddle={riddles[currentRiddleIndex].question}
                            units={riddles[currentRiddleIndex].units}
                            unitsBefore={riddles[currentRiddleIndex].unitsbefore}
                            onAnswerChange={(value) => setUserAnswer(value)}
                            value={userAnswer}
                            setInputRef={setInputRef}
                            checkAnswer={checkAnswer}
                        />
                    )}
                    <TryAgain
                        message='Please Try Again'
                        isDisplayed={showTryAgainMessage}
                        marginTop='1rem'
                        color='black'
                    />
                    <img src={scarecrow} alt='scarecrow graphic' style={{ alignSelf: 'center' }} />
                </div>
            </div>
        </div>
    )
}

export default ChallengeTwo
