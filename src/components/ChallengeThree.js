import React, { useEffect, useState } from 'react'
import Story from './Story'
// import PigpenLetters from './PigpenLetters'
import pigpen from '../images/pigpen-cipher-key.png'
import truck from '../images/pickup-truck.png'
import TryAgain from './TryAgainMessage';

const ChallengeThree = ({ onPass }) => {
    const [storyData, setStoryData] = useState(null);
    // const [showHint, setShowHint] = useState(false);
    // const [showHintButton, setShowHintButton] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [showTryAgainMessage, setShowTryAgainMessage] = useState(false);


    useEffect(() => {
        async function fetchStory() {
            try {
                const response = await fetch("https://turkeyver-backend-production.up.railway.app/api/stories/3");
                const data = await response.json();
                setStoryData(data);
            } catch (err) {
                console.error("An error occurred while fetching story:", err);
            }
        }

        fetchStory();
    }, []);

    // useEffect(() => {
    //     if (showHint) {
    //         const hint = document.querySelector('.hint');
    //         hint.classList.add('fade-in');
    //     }
    // })

    // const hintButtonClicked = () => {
    //     setShowHint(true)
    // }

    // useEffect(() => {
    //     const minutes = 8;
    //     const hintTimeout = setTimeout(() => {
    //         setShowHintButton(true);
    //     }, minutes * 60 * 1000);

    //     return () => {
    //         clearTimeout(hintTimeout);
    //     };
    // }, []);

    const handleScroll = () => {
        if (window.scrollY > 400) {
            document.querySelector('.pigpen-container').classList.add('center-screen');
            window.removeEventListener('scroll', handleScroll);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            // Clean-up: remove the event listener when the component is unmounted
            window.removeEventListener('scroll', handleScroll);
        };
    });

    useEffect(() => {
        // Set styles when the component mounts
        document.body.style.background = 'linear-gradient(rgb(102, 123, 138) 25%, rgb(181, 92, 7)';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(255, 255, 255, 0.8)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(181, 92, 7)";
        })


        return () => {
            // Remove styles when the component unmounts
            document.body.style.backgroundColor = '';
        };
    }, []);

    const checkAnswer = () => {
        let timer;
        if (userAnswer.toLowerCase() !== "skeletonkey" && userAnswer.toLowerCase() !== "skeleton key") {
            setShowTryAgainMessage(true);
            timer = setTimeout(() => {
                setShowTryAgainMessage(false);
            }, 10000);
            return;
        } else setShowTryAgainMessage(false);

        onPass(true)
        return () => clearTimeout(timer); // clear timeout on component unmount
    }

    return (
        <div className="main--witch">
            {storyData && <Story title={storyData.title} story={storyData.story} color="white" width="78%" />}
            <div className="main-pp-wrapper ">
                {/* <p>Figure out which letters are missing in the key to the right before you can solve the cipher below. This may require a pencil and paper.</p> */}

                <div className='pigpen-container slide-in'>
                    <img src={truck} alt="pickup-truck with caged turkey in the back." />
                    <div className='pigpen-cipher flex-center '>
                        <div className='pigpen-img flex-center '>
                            <img src={pigpen} alt="pigpen cipher key" width='80%' />
                        </div>
                        <h5>Latch Instructions:</h5>
                        <ol>
                            <li><span className='pigpen-font'>pull up</span></li>
                            <li><span className='pigpen-font'>turn right</span></li>
                            <li><span className='pigpen-font'>push down</span></li>
                            <li><span className='pigpen-font'>pull out</span></li>
                        </ol>
                    </div>
                </div>

            </div>
            <div className='pigpen-cipher-container'>
                <p>Can you find the secret code embedded inside the message above? That is the key to getting out of here.</p>
                <div className='pigpen-submit-wrapper'>
                    <div>
                        <input type="text" placeholder='Secret Code...' onChange={(e) => setUserAnswer(e.target.value)} />
                        <button className='basement-btn' onClick={checkAnswer}>Submit Code</button>
                        <TryAgain message='Please Try Again' isDisplayed={showTryAgainMessage} marginTop='1rem' color='black' />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChallengeThree