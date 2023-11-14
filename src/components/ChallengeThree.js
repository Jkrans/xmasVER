import React, { useEffect, useState, useRef } from 'react'
import Story from './Story'
// import PigpenLetters from './PigpenLetters'
import pigpen from '../images/pigpen-cipher-key.png'
import truck from '../images/pickup-truck.png'
import latchleft from '../images/latch-left.png'
import latchright from '../images/latch-right.png'
import latchbolt from '../images/latch-bolt.png'
import latchtop from '../images/latch-parts.png'
import TryAgain from './TryAgainMessage';

const ChallengeThree = ({ onPass }) => {
    const [storyData, setStoryData] = useState(null);
    const [moveLatch, setMoveLatch] = useState(false);
    // const [showHintButton, setShowHintButton] = useState(false);
    const [userAnswer1, setUserAnswer1] = useState("");
    const [userAnswer2, setUserAnswer2] = useState("");
    const [userAnswer3, setUserAnswer3] = useState("");
    const [userAnswer4, setUserAnswer4] = useState("");
    const [showTryAgainMessage, setShowTryAgainMessage] = useState(false);
    const [cipherExpanded, setCipherExpanded] = useState(false);

    const cipherRef = useRef(null);
    const latchRef = useRef(null);

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

    useEffect(() => {
        const cipher = cipherRef.current;
        const handleTransitionEnd = () => {
            if (cipherExpanded) {
                cipher.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            cipher.removeEventListener('transitionend', handleTransitionEnd);
        };

        // Add the event listener
        cipher.addEventListener('transitionend', handleTransitionEnd);

        // Clean up function
        return () => {
            cipher.removeEventListener('transitionend', handleTransitionEnd);
        };
    }, [cipherExpanded]);

    const handleCipherClick = () => {
        setCipherExpanded(!cipherExpanded);
        cipherRef.current.classList.toggle('pigpen-slide-up');
    };

    // helper function 
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        const animateLatch = async () => {
            const latch = latchRef.current;
            if (moveLatch) {
                latch.style.transform = 'rotateX(180deg)';
                latch.style.top = '-94px';

                await delay(1000);
                latch.style.left = '165px';

                await delay(1000);
                latch.style.transform = 'rotateX(0deg)';
                latch.style.top = '87px';
            }
        };

        animateLatch();
    }, [moveLatch]);

    const checkAnswer = async () => {
        let timer;
        if (userAnswer1.toLowerCase().trim() !== "lift up" ||
            userAnswer2.toLowerCase().trim() !== "slide right" ||
            userAnswer3.toLowerCase().trim() !== "drop down" ||
            userAnswer4.toLowerCase().trim() !== "pull open") {
            setShowTryAgainMessage(true);
            timer = setTimeout(() => {
                setShowTryAgainMessage(false);
            }, 10000);
            return;
        } else setShowTryAgainMessage(false);

        setMoveLatch(true);
        await delay(2000);
        onPass(true);
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
                        <div ref={cipherRef} onClick={handleCipherClick} className='pigpen-img flex-center '>
                            <p>Cipher Key</p>
                            <img src={pigpen} alt="pigpen cipher key" width='68%' height='90%' />
                        </div>
                        <h5>Latch Instructions:</h5>
                        <ol className='unselectable'>
                            <li><span className='pigpen-font'>lift up</span></li>
                            <li><span className='pigpen-font'>slide right</span></li>
                            <li><span className='pigpen-font'>drop down</span></li>
                            <li><span className='pigpen-font'>pull open</span></li>
                        </ol>
                    </div>
                </div>

            </div>
            <div className='pigpen-cipher-container'>
                <div className='pigpen-submit-wrapper'>
                    <div style={{ width: '55%' }}>
                        <p>Enter the instructions below:</p>
                        <input type="text" placeholder='Cipher 1...' onChange={(e) => setUserAnswer1(e.target.value)} />
                        <input type="text" placeholder='Cipher 2...' onChange={(e) => setUserAnswer2(e.target.value)} />
                        <input type="text" placeholder='Cipher 3...' onChange={(e) => setUserAnswer3(e.target.value)} />
                        <input type="text" placeholder='Cipher 4...' onChange={(e) => setUserAnswer4(e.target.value)} />
                        <button className='ch3-submit' onClick={checkAnswer}>Submit Instructions</button>
                        <TryAgain message='Please try again. Check spelling.' isDisplayed={showTryAgainMessage} marginTop='1rem' color='black' />

                    </div>
                    <div style={{ width: '45%', position: 'relative' }}>
                        <img className="latch latchleft" src={latchleft} alt='' />
                        <img className="latch latchright" src={latchright} alt='' />
                        <img ref={latchRef} className="latch latchbolt" src={latchbolt} alt='' />
                        <img className="latch latchtop" src={latchtop} alt='' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChallengeThree