import { useEffect, useState, useRef } from 'react'
import Story from './Story'
import whisk from '../images/whisk.png'
import knife from '../images/knife.png'
import oven from '../images/oven.png'
import TryAgain from './TryAgainMessage'

// const story = [
//     "After unlocking the cage in the basement, relief floods over you. Before you can turn to thank your skeletal companion, you find his cage eerily empty, with just a soft chuckle echoing in the background as a reminder of his presence. The dim light allows you to spot a set of worn-out cellar doors across the room. Hopeful, you make your way over and push them open. A gust of cool air greets you. Stepping out, you find yourself not in the safety of the outdoors as you hoped, but instead, in an eerie, moonlit graveyard. Fog blankets the ground, and twisted trees stretch their skeletal branches toward the sky. This is no ordinary graveyard, and as you will soon discover, its residents aren't exactly resting in peace.",
//     <br />,
//     <br />,
//     "Suddenly, from behind one of the tombstones, a figure emerges, draped in a bluish cloak that shimmers in the moonlight. She introduces herself as the \"Guardian of Lost Souls\", a spirit trapped in the graveyard for centuries. She explains, \"This graveyard is enchanted. The souls of those buried here remain restless, trapped in a limbo between realms. The only way to pacify them and ensure your safe passage is to solve their riddles.\" She continues, \"Solving these riddles won't just ensure your safe passage but will also bring some peace to these tormented souls.\"",
//     <br />,
//     <br />,
//     "The first tombstone starts to glow, indicating where you should begin. The Guardian of Lost Souls whispers, \"Remember, time is of the essence. With each riddle you solve, dawn approaches. You must solve them all before the first light touches the horizon, or you risk joining the souls here for eternity.\"",
//     <br />,
//     <br />,
//     "Your heart races as you take a deep breath. With determination, you step forward, ready to face the riddles of the graveyard and unlock the final path to freedom."
// ]



const ChallengeFour = ({ onPass }) => {
    const [storyData, setStoryData] = useState(null);
    const [riddles, setRiddles] = useState([]);
    const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0); // starts from the first riddle
    const [userInput, setUserInput] = useState('');
    const [tryAgainMessage, setTryAgainMessage] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(1638);

    const whiskIconRef = useRef(null);
    const knifeIconRef = useRef(null);

    useEffect(() => {
        async function fetchStory() {
            try {
                const response = await fetch("https://turkeyver-backend-production.up.railway.app/api/stories/4");
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
                const riddles = [];

                for (let i = 8; i <= 9; i++) {
                    const response = await fetch(`https://turkeyver-backend-production.up.railway.app/api/riddles/${i}`);
                    const data = await response.json();
                    riddles.push(data);
                }

                setRiddles(riddles);
            } catch (err) {
                console.error("An error occurred while fetching riddles:", err);
            }
        }

        fetchRiddles();
    }, []);


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
        document.body.style.background = 'linear-gradient(rgb(92, 132, 101)25%, rgb(50, 200, 125)';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(255, 255, 255, 0.8)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(50, 200, 125)";
        })


        return () => {
            // Remove styles when the component unmounts
            document.body.style.backgroundColor = '';
        };
    }, []);

    const iconAnimate = (elementRef, duration, maxHeight) => {
        const element = elementRef.current;

        const keyframes = [
            { transform: `translateX(25vw) translateY(calc(${maxHeight}px - 389px)) rotate(0deg)` },
            { transform: 'translateX(-70vw) translateY(-30vh) rotate(180deg)' },
            { transform: `translateX(-20vw) translateY(calc(${maxHeight}px  - 389px)) rotate(90deg)` },
            { transform: 'translateX(40vw) translateY(-30vh) rotate(270deg)' },
            { transform: `translateX(25vw) translateY(calc(${maxHeight}px  - 389px)) rotate(0deg)` }
        ];

        const timing = {
            duration: duration, // Total animation duration in milliseconds
            iterations: Infinity, // Repeat the animation forever
            fill: 'forwards' // Ensure the animation stays at the last keyframe when finished
        };
        setTimeout(() => {
            element.animate(keyframes, timing);
        }, 0)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const html = document.documentElement;
            const height = Math.max(html.clientHeight, html.scrollHeight, html.offsetHeight);
            setScrollHeight(height);
            console.log("height: ", scrollHeight);
            if (knifeIconRef) {
                iconAnimate(knifeIconRef, 43000, scrollHeight)
            }
        }, 1000)
        return () => clearTimeout(timer);
    }, [scrollHeight])

    return (
        <div className="main--witch">
            {storyData && <Story title={storyData.title} story={storyData.story} color="white" width="78%" />}
            {riddles.length > 0 && (
                <>
                    {/* <div className="headstones">
                        <Headstone isGlowing={true} />
                        <Headstone isGlowing={riddles[0].isSolved ? true : false} />
                        <Headstone isGlowing={riddles[1].isSolved ? true : false} />
                        <Headstone isGlowing={riddles[2].isSolved ? true : false} />
                    </div> */}
                    <div ref={whiskIconRef} class="floating-icon">
                        <img src={whisk} alt="Floating Icon" />
                    </div>
                    <div ref={knifeIconRef} class="floating-icon-2">
                        <img src={knife} alt="Floating Icon" />
                    </div>
                    <div className='ch4-riddles-container'>
                        <img src={oven} alt="oven Icon" style={{ width: '45%', maxWidth: '512px' }} />
                        <div className="ch4-riddle">
                            <div className="recipe-title">
                                <h3>Recipe:</h3>
                                <p style={{ fontFamily: 'Linefont' }}>whatintheworld doesthiseven saybruh?</p>
                            </div>
                            <div className="recipe-main">
                                <div className="recipe-ingredients">
                                    <h5>Ingredients:</h5>
                                    <ul style={{ fontFamily: 'Linefont' }}>
                                        <li>whatintheheck isthisagain</li>
                                        <li>thisdoesntmeannothin</li>
                                        <li>itsjustabunchof nothing</li>
                                        <li>nothingitellyou</li>
                                        <li>justneeds tolooklikesomeone</li>
                                        <li>actuallyscribbled inhere</li>
                                        <li>scribblescribble scribble</li>
                                    </ul>
                                </div>
                                <div className="recipe-instructions">
                                    <h4>Instructions:</h4>
                                    <p>{riddles[currentRiddleIndex].question}</p>
                                    <form onSubmit={handleSubmit}>
                                        <input type='text' value={userInput} onChange={handleInputChange} maxLength={35} />
                                    </form>
                                    <TryAgain
                                        message='Please try again. Remember to check your spelling.'
                                        isDisplayed={tryAgainMessage}
                                        marginTop='1rem'
                                        color='black'
                                    />
                                </div>

                            </div>


                        </div>
                    </div>

                    {/* <div className="headstones">
                        <Headstone isGlowing={riddles[3].isSolved ? true : false} />
                        <Headstone isGlowing={riddles[4].isSolved ? true : false} />
                        <Headstone isGlowing={riddles[5].isSolved ? true : false} />
                        <Headstone isGlowing={riddles[6].isSolved ? true : false} />
                    </div> */}
                </>
            )}
        </div>

    )
}

export default ChallengeFour
