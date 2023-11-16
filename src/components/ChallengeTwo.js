import { useState, useEffect } from 'react'
import maze from '../images/maze.png'
import turkey from '../images/turkey-walk2.png'
import turkeyWalk from '../images/turkey-walk2.gif'
import scarecrow from '../images/scarecrow.gif'
import Story from "./Story"
import Riddle from "./Riddle"
import TryAgain from './TryAgainMessage';

// Get random values
// const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

//ChallengeTwo component
const ChallengeTwo = ({ onPass }) => {
    // const [storyData, setStoryData] = useState([])
    const [riddles, setRiddles] = useState({})
    const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showTryAgainMessage, setShowTryAgainMessage] = useState(false);
    const [moveTurkey, setMoveTurkey] = useState(0);

    // useEffect(() => {
    //     let retryCount = 0;
    //     const maxRetries = 3; // Set the maximum number of retries
    //     const retryDelay = 2000; // Delay between retries in milliseconds

    //     async function fetchStory() {
    //         try {
    //             const response = await fetch("https://turkeyver-backend-production.up.railway.app/api/stories/2");
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             console.log('try: ', retryCount)
    //             const data = await response.json();
    //             setStoryData(data);
    //         } catch (err) {
    //             console.error("An error occurred while fetching story:", err);
    //             if (retryCount < maxRetries) {
    //                 setTimeout(fetchStory, retryDelay);
    //                 retryCount++;
    //             }
    //         }
    //     }

    //     fetchStory();
    // }, []);

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

    // let inputReference = null;

    // const setInputRef = (ref) => {
    //     inputReference = ref;
    // };

    const moveImage = (move) => {
        const img = document.getElementById('ch2-turkey-id');

        switch (move) {
            case 0:
                img.src = turkeyWalk;
                img.style.top = '26rem';
                setTimeout(() => {
                    img.style.left = '25.1rem';
                    setTimeout(() => {
                        img.style.top = '16.5rem';
                        setTimeout(() => {
                            img.style.transform = "rotateY(0deg)";
                            setTimeout(() => {
                                img.style.left = "15.8rem";
                                setTimeout(() => {
                                    img.src = turkey;
                                }, 2000);
                            }, 2000);
                        }, 1000);
                    }, 2000);
                }, 2000);
                break;
            case 1:
                img.src = turkeyWalk;
                img.style.left = '9.4rem';
                setTimeout(() => {
                    img.src = turkey;
                }, 2000);
                break;
            case 2:
                img.src = turkeyWalk;
                img.style.top = '4rem';
                setTimeout(() => {
                    img.src = turkey;
                }, 2000);
                break;
            case 3:
                img.src = turkeyWalk;
                img.style.transform = "rotateY(180deg)";
                setTimeout(() => {
                    img.style.left = '25rem';
                    setTimeout(() => {
                        img.style.top = '7.5rem';
                        setTimeout(() => {
                            img.src = turkey;
                        }, 2000);
                    }, 2000);
                }, 2000);
                break;
            case 4:
                img.src = turkeyWalk;
                img.style.left = '100rem';
                img.style.opacity = '0';
                break;
            default: console.log("default")
        }
    }

    const checkAnswer = (e) => {
        console.log(moveTurkey);
        e.preventDefault();

        let correct = riddles[currentRiddleIndex].answer.includes(userAnswer.toLowerCase());


        if (correct) {
            if (currentRiddleIndex < riddles.length - 1) {
                setCurrentRiddleIndex(currentRiddleIndex + 1); // Move to next riddle
                setUserAnswer(''); // Reset answer input
                setMoveTurkey(prev => moveTurkey + 1);
                moveImage(moveTurkey);
            } else {
                moveImage(moveTurkey);
                setTimeout(() => {
                    onPass(true); // All riddles solved                    
                }, 1500);
            }
            setShowTryAgainMessage(false);
        } else {
            setShowTryAgainMessage(true);
            setTimeout(() => {
                setShowTryAgainMessage(false);
            }, 10000);
        }

        // if (inputReference) {
        //     console.log("input ref", inputReference);
        //     console.log("Is input disabled?", inputReference.disabled);
        //     console.log("Is input visible?", inputReference.offsetWidth > 0 && inputReference.offsetHeight > 0);

        //     setTimeout(() => {
        //         if (inputReference) {
        //             inputReference.focus();
        //         }
        //     }, 10);

        //     inputReference.onblur = (e) => {
        //         console.log("Focus shifted to:", e.relatedTarget);
        //     };

        //     inputReference.addEventListener("blur", () => {
        //         console.log("Input was blurred");
        //     });

        // }
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
            <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/2" color="rgb(255,255,255,0.8)" width="70%" />

            <div className='riddles-container'>
                <div style={{ position: 'relative' }}>
                    <img className="ch2-maze" src={maze} alt="simple yellow maze" />
                    <img id='ch2-turkey-id' className="ch2-turkey" src={turkey} alt="turkey graphic" />
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
                            // setInputRef={setInputRef}
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
