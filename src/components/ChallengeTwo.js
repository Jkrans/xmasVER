import { useState, useEffect } from 'react'
import maze from '../images/maze.png'
import Story from "./Story"
import Riddle from "./Riddle"
// import TryAgain from './TryAgainMessage';

// Get random values
const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;
const spiders = getRandomNumber(8);
const witchNumber = getRandomNumber(9) + 1; // so max is 10 and min is 2.

// riddles objects: riddles, answers, and the units the answers should be in.
const riddles = [
    {
        riddle: "A haunted 250-foot train travels 250-feet per minute. It goes through a 500-foot tunnel. How long does it take for a train to travel through the tunnel?",
        answer: 3,
        units: "minute/s"
    },
    {
        riddle: `There are 9 spiders, and you take ${spiders}. How many do you have?`,
        answer: spiders,
        units: "spiders"
    },
    {
        riddle: `It takes ${witchNumber} witches ${witchNumber} minutes to brew ${witchNumber} potions. How long would it take 100 witches to brew 100 potions?`,
        answer: witchNumber,
        units: "minute/s"
    },
    {
        riddle: "In a haunted game of luck you flip a coin 5 times, and it lands tails up each time. What are the chances it will land heads up on your next flip?",
        answer: 50,
        units: "%"
    },
]

//ChallengeTwo component
const ChallengeTwo = ({ onPass }) => {
    const [storyData, setStoryData] = useState({})
    const [userAnswers, setUserAnswers] = useState([null, null, null, null]);
    // const [showTryAgainMessage, setShowTryAgainMessage] = useState(false);

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

    // const checkAnswers = () => {
    //     let timer;
    //     for (let i = 0; i < riddles.length; i++) {
    //         if (parseInt(userAnswers[i]) !== riddles[i].answer) {
    //             setShowTryAgainMessage(true)
    //             timer = setTimeout(() => {
    //                 setShowTryAgainMessage(false);
    //             }, 10000);
    //             return;
    //         } else setShowTryAgainMessage(false)
    //     }
    //     onPass(true)
    //     return () => clearTimeout(timer); // clear timeout on component unmount
    // }
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
                <img className="ch2-maze" src={maze} alt="simple yellow maze" />
                <div className='riddles'>
                    {riddles.map((riddle, index) => (
                        <Riddle
                            key={index}
                            riddle={riddle.riddle}
                            units={riddle.units}
                            onAnswerChange={(value) => {
                                const newAnswers = [...userAnswers];
                                newAnswers[index] = value;
                                setUserAnswers(newAnswers);
                            }}
                        />
                    ))}
                    {/* <button className='library-btn' onClick={checkAnswers}>Submit</button> 
                    <TryAgain
                        message='Please Try Again'
                        isDisplayed={showTryAgainMessage}
                        marginTop='1rem'
                        color='black'
                    />*/}
                </div>
            </div>
        </div>
    )
}

export default ChallengeTwo
