import { useState, useEffect } from 'react'
import Ghost from '../images/ghost.png'
import Story from "./Story"
import Riddle from "./Riddle"
import TryAgain from './TryAgainMessage';


// Library story
const story = [
    "After narrowly escaping the witch's lair, you find yourself walking down a dimly lit, ominous hallway. Each door you try is securely locked, as if warning you not to disturb what lies behind them. However, one grand door stands invitingly open. You step into a majestic library. It's a peculiar mix of dusty and tidy, as if time has forgotten it, but someone or something still maintains it. No sooner have you taken a few steps than the door slams shut behind you, locking you in. Enormous windows reach up to the ceiling, teasing a view of the outside world that you can't touch; they won't budge. Towering shelves filled with ancient texts and mysteries surround you.",
    <br/>,
    <br/>,
    "Just as you start to absorb your surroundings, a soft thud breaks the silence. A small, antique lamp on a reading table tips over on it's own. Your heart skips a beat as a translucent figure appears before you — a ghost! But fear not, for this is no ordinary ghost. He displays a playful, mischievous spirit rather than a sinister one. \"Ah, you look quite lost, my friend,\" he says, floating around you in a whimsical manner. \"Tell you what, I'll help you escape this place, but you have to do something for me first.\"",
    <br/>,
    <br/>,
    "The ghost grins. \"See, I'm in a friendly competition with my ghostly brothers, and we're stuck on some riddles. They think they're so clever,\" he rolls his eyes, \"but with your help, I can best them all and win the ultimate bragging rights! Solve the riddles for me, and I promise, I'll show you the secret way out of here.\" You consider his offer. It seems you have a new challenge ahead. The library might be a prison for now, but it's also filled with the promise of freedom — if you can solve the ghost's riddles.",
    
]

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

//Library component
const Library = ({ onPass }) => {
    const [userAnswers, setUserAnswers] = useState([null, null, null, null]);
    const [showTryAgainMessage, setShowTryAgainMessage] = useState(false);

    const checkAnswers = () => {
        let timer;
        for (let i = 0; i < riddles.length; i++) {
            if (parseInt(userAnswers[i]) !== riddles[i].answer) {
                setShowTryAgainMessage(true)
                timer = setTimeout(() => {
                    setShowTryAgainMessage(false);
                  }, 10000);
                return;
            } else setShowTryAgainMessage(false)
        }
        onPass(true)
        return () => clearTimeout(timer); // clear timeout on component unmount
    }
    useEffect(() => {
        // Set styles when the component mounts
        document.body.style.background = 'linear-gradient(rgb(117, 0, 180), rgb(0, 164, 33)';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(0, 164, 33)';

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
        <Story title="The Library" story={story} color="rgb(255,255,255,0.8)" width="70%"/>

        <div className='riddles-container'>
            <img className="library-ghost" src ={Ghost}/>
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
                <button className='library-btn' onClick={checkAnswers}>Submit</button>
                <TryAgain
                    message = 'Please Try Again' 
                    isDisplayed={showTryAgainMessage} 
                    marginTop='1rem'
                    color='black'
                />
            </div>
        </div>
    </div>
  )
}

export default Library
