import { useEffect, useState, useRef } from 'react'
import Story from './Story'
import Headstone from './Headstone'
import TryAgain from './TryAgainMessage'

const riddles = [
    {
        question: "I'm tall when I'm young and I'm short when I'm old. What am I?",
        answer: ['candle'],
        isSolved: false,
    },
    {
        question: "A zombie, a mummy, and a ghost bought a house. It has all of the usual rooms except for one. What room won't you find?",
        answer: ['living room', 'livingroom'],
        isSolved: false,
    },
    {
        question: "What do you call a witch at the beach?",
        answer: ['sandwich','sandwitch', 'sand witch', 'sand-witch'],
        isSolved: false,
    },
    {
        question: "What is a ghost's favorite dessert?",
        answer: ['i-scream', 'ice cream', 'i scream', 'ice-cream'],
        isSolved: false,
    },
    {
        question: "How do you fix a damaged jack-o-lantern?",
        answer: ['pumpkin patch', 'pumpkinpatch'],
        isSolved: false,
    },
    {
        question: "What is a mummy's favorite type of music?",
        answer: ['wrap', 'rap'],
        isSolved: false,
    },
    {
        question: "What do you get when you cross a snowman with a vampire?",
        answer: ['frostbite', 'frost bite'],
        isSolved: false,
    },
    {
        question: "The more you take away, the bigger I get. What am I?",
        answer: ['grave'],
        isSolved: false,
    },
    
]

// What do you get when you cross a snowman with a vampire?
// Answer: Frostbite.

// 
//Answer: A grave.

const story = [
    "After unlocking the cage in the basement, relief floods over you. Before you can turn to thank your skeletal companion, you find his cage eerily empty, with just a soft chuckle echoing in the background as a reminder of his presence. The dim light allows you to spot a set of worn-out cellar doors across the room. Hopeful, you make your way over and push them open. A gust of cool air greets you. Stepping out, you find yourself not in the safety of the outdoors as you hoped, but instead, in an eerie, moonlit graveyard. Fog blankets the ground, and twisted trees stretch their skeletal branches toward the sky. This is no ordinary graveyard, and as you will soon discover, its residents aren't exactly resting in peace.",
    <br />,
    <br />,
    "Suddenly, from behind one of the tombstones, a figure emerges, draped in a bluish cloak that shimmers in the moonlight. She introduces herself as the \"Guardian of Lost Souls\", a spirit trapped in the graveyard for centuries. She explains, \"This graveyard is enchanted. The souls of those buried here remain restless, trapped in a limbo between realms. The only way to pacify them and ensure your safe passage is to solve their riddles.\" She continues, \"Solving these riddles won't just ensure your safe passage but will also bring some peace to these tormented souls.\"",
    <br />,
    <br />,
    "The first tombstone starts to glow, indicating where you should begin. The Guardian of Lost Souls whispers, \"Remember, time is of the essence. With each riddle you solve, dawn approaches. You must solve them all before the first light touches the horizon, or you risk joining the souls here for eternity.\"",
    <br />,
    <br />,
    "Your heart races as you take a deep breath. With determination, you step forward, ready to face the riddles of the graveyard and unlock the final path to freedom."
]



const Graveyard = ({ onPass }) => {
    const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0); // starts from the first riddle
    const [userInput, setUserInput] = useState('');
    const [tryAgainMessage, setTryAgainMessage] = useState(false);

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
        document.body.style.background = 'linear-gradient(black, rgb(19, 63, 35))';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(19, 63, 35)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(19, 63, 35)";
        })
    
  
        return () => {
            // Remove styles when the component unmounts
            document.body.style.backgroundColor = '';
        };
    });

  return (
    <div className="main--witch">
        <Story title="The Graveyard" story={story} width="78%" color="rgb(255, 100, 25)"/> 
        <div className="headstones" >
            <Headstone isGlowing={true}/>
            <Headstone isGlowing={riddles[0].isSolved ? true : false}/>
            <Headstone isGlowing={riddles[1].isSolved ? true : false}/>
            <Headstone isGlowing={riddles[2].isSolved ? true : false}/>
        </div>
        <div className="centerItems graveyard-riddle">
            <p>{riddles[currentRiddleIndex].question}</p>
            <form onSubmit={handleSubmit}>
                <input type='text' value={userInput} onChange={handleInputChange} maxLength={35}/>
            </form>
            <TryAgain 
                message = 'Please try again. Remember to check your spelling.' 
                isDisplayed = {tryAgainMessage}
                marginTop='1rem'
                color='black'
            />
        </div>
        <div className="headstones" >
            <Headstone isGlowing={riddles[3].isSolved ? true : false}/>
            <Headstone isGlowing={riddles[4].isSolved ? true : false}/>
            <Headstone isGlowing={riddles[5].isSolved ? true : false}/>
            <Headstone isGlowing={riddles[6].isSolved ? true : false}/>        
        </div>
      
    </div>
  )
}

export default Graveyard
