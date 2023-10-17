import React, { useEffect, useState } from 'react'
import Story from './Story'
import PigpenLetters from './PigpenLetters'
import Pigpen from '../images/Pig-Pen-Blank.png'
import BoneHand from '../images/hand-bones.png'
import TryAgain from './TryAgainMessage';

const story = [
    "Feeling triumphant after solving the ghost's riddles, you eagerly follow it to a wall lined with dusty old books. \"The way out is just behind these books,\" the ghost whispers with a mischievous glint. Expecting a hidden door to swing open, you approach the shelf. But suddenly, the floor beneath you gives way! You slide down a chute, and before you can even yell for help, you land with a thud. As the trapdoor snaps shut above you, you find yourself in a dim, damp basement, confined within a rusty cage. The air smells of mold and the walls seem to seep with moisture.",
    <br/>,
    <br/>,
    "Straining your eyes in the low light, you notice strange markings on the wall across from you—a cipher or code of some sort. Just as you start to wonder how you might solve it, a raspy voice drifts over from the cage next to yours. \"Attempting to decipher those mysterious symbols, are you? Best of luck. I've spent over a century here and still haven't cracked the code.\"",
    <br/>,
    <br/>,
    "Startled, you turn toward the voice and are met by darkness. But then a skeletal hand emerges from the shadows, holding a weathered piece of paper. You hesitate for a moment before grabbing it. \"What did you expect? I told you, I've been here for over 100 years!\" The skeleton cackles, its laugh echoing through the stone walls. Unfolding the paper, you see it's a key to the cipher—though many of the letters are missing or smudged beyond recognition. Could this be the way out? You grip the paper tightly, take a deep breath, and turn your attention back to the markings on the wall. This is going to take some brainpower, but it's a challenge you're ready for. After all, you've got nowhere to go but up—or out, if you can crack the code."
]

const Basement = ({ onPass }) => {
    const [showHint, setShowHint] = useState(false);
    const [showHintButton, setShowHintButton] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [showTryAgainMessage, setShowTryAgainMessage] = useState(false);

    useEffect(() => {
        if(showHint) {
            const hint = document.querySelector('.hint');
            hint.classList.add('fade-in');
        }
    })
    
    const hintButtonClicked = () => {
        setShowHint(true)
    }

    useEffect(() => {
        const minutes = 8;
        const hintTimeout = setTimeout(() => {
          setShowHintButton(true);
        }, minutes * 60 * 1000);

        return () => {
            clearTimeout(hintTimeout);
          };
        }, []);

    const handleScroll = () => {
        if(window.scrollY > 400) {
            document.getElementsByClassName('pigpen-wrapper')[0].classList.replace('slide-in','slide-out');
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
        document.body.style.background = 'linear-gradient(rgb(0, 0, 0), rgb(78, 92, 99)';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(78, 92, 99)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(78, 92, 99)";
        })
    
  
        return () => {
        // Remove styles when the component unmounts
        document.body.style.backgroundColor = '';
            };
    });

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
            <Story title="The Basement" story={story} color="white" width="78%"/>
            <div className="main-pp-wrapper">
                <p>Figure out which letters are missing in the key to the right before you can solve the cipher below. This may require a pencil and paper.</p> 
                <div className="pigpen-wrapper slide-in">
                    <div className='pigpen-container'>
                        <div className="pigpen">
                            <img src = {Pigpen}/>
                            <PigpenLetters letter="A" top="34px" left="61px" />
                            <PigpenLetters letter="B" top="34px" left="146px" />
                            <PigpenLetters letter="D" top="127px" left="61px" />
                            <PigpenLetters letter="I" top="215px" left="250px" />
                            <PigpenLetters letter="J" top="34px" right="230px" />
                            <PigpenLetters letter="N" top="127px" right="142px" />
                            <PigpenLetters letter="P" top="215px" right="230px" />
                            <PigpenLetters letter="R" top="215px" right="50px" />
                            <PigpenLetters letter="S" bottom="190px" left="145px" />
                            <PigpenLetters letter="T" bottom="110px" left="70px" />
                            <PigpenLetters letter="Y" bottom="110px" right="70px" />
                            <PigpenLetters letter="Z" bottom="50px" right="145px" />
                        </div>
                        <img src={BoneHand}/>
                    </div>
                </div>
            </div>
            <div className='pigpen-cipher-container'>
                <h2 className='pigpen-cipher'>
                    Shadows sulk, vampire howl, strange secret, voodoo raven, dark desolate alley
                </h2>
                <p>Can you find the secret code embedded inside the message above? That is the key to getting out of here.</p> 
                <div className='pigpen-submit-wrapper'>
                    <div>
                        <input type="text" placeholder='Secret Code...' onChange={(e) => setUserAnswer(e.target.value)}/>
                        <button className='basement-btn' onClick={checkAnswer}>Submit Code</button>
                        <TryAgain message='Please Try Again' isDisplayed={showTryAgainMessage} marginTop='1rem' color='black'/>

                    </div>
    
                    <div className={`pigpen-hint ${showHintButton ? 'show-hint' : ''}`}>
                        <button onClick={hintButtonClicked}>Hint</button>
                        <p className='hint'>The secret isn't in what the words say, but how they en(d).</p> 
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Basement