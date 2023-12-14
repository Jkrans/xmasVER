import { useEffect, useState, useRef } from 'react'
import { motion } from "framer-motion";

import Story from './Story'

import train from '../images/train.png'
import traincar from '../images/traincar.png'
import caboose from '../images/traincaboose.png'

import sprained from '../images/santasprained.png'
import compass from '../images/compass-santa.png'
import rich from '../images/rich.png'
import laundry from '../images/laundry-santa.png'
import sheets from '../images/gingerbread-sheets.png'
import breakfast from '../images/breakfast-snowboy.png'
import bugged from '../images/bugged.png'

import TryAgain from './TryAgainMessage'




const ChallengeOne = ({ onPass }) => {
  const [riddles, setRiddles] = useState([]);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [tryAgainMessage, setTryAgainMessage] = useState(false);
  const [translateX, setTranslateX] = useState(-149);

  const trainRef = useRef(null);
  const trainriddlesRef = useRef(null);
  const inputRef = useRef(null);
  const hasScrolledRef = useRef(false);




  useEffect(() => {
    async function fetchRiddles() {
      try {

        const response = await fetch(`https://turkeyver-backend-production.up.railway.app/api/riddles/xver1`);
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
    const riddleInput = inputRef.current;
    let isCorrect = riddles[index].answer.some(answer =>
      riddleInput.value.includes(answer)
    );

    if (isCorrect) {
      riddleInput.style.borderBottom = '2px solid rgb(0, 255, 0)'; // Correct answer, green
      setTimeout(() => {
        riddleInput.style.borderBottom = '2px solid rgb(150, 216, 255)';
      }, 1000)
    }
    else if (input.value !== '' && !isCorrect) {
      riddleInput.style.borderBottom = '2px solid rgb(255, 0, 0)'; // Incorrect answer, red
      setTimeout(() => {
        riddleInput.style.borderBottom = '2px solid rgb(150, 216, 255)';
      }, 1000)
    }
    else if (document.activeElement === input) {
      riddleInput.style.borderBottom = '2px solid rgb(150, 216, 255)'; // Focused input, orange
    } else {
      riddleInput.style.borderBottom = '2px solid rgb(0, 0, 0)'; // Unfocused empty input, black
    }
  };


  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    // updateBorderColor(e.target, currentRiddleIndex);
  };

  const handleSubmit = (e) => {
    updateBorderColor(e.target, currentRiddleIndex);

    let gTimer;
    e.preventDefault();

    let correct = riddles[currentRiddleIndex].answer.some(variant =>
      userInput.toLowerCase().includes(variant.toLowerCase())
    );

    if (correct) {
      riddles[currentRiddleIndex].isSolved = true;

      setTranslateX(prevTranslateX => prevTranslateX - 148.5);

      if ((currentRiddleIndex === riddles.length - 1)) {
        //End the game or display a message, etc.
        setTimeout(() => {
          onPass(true)
          clearTimeout(gTimer);

        }, 4000);
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

  const handleScroll = () => {
    console.log("has scrolled: ", hasScrolledRef);
    if (!hasScrolledRef.current && window.scrollY > 600) {
      hasScrolledRef.current = true; // Set the flag to true
      console.log("has scrolled: ", hasScrolledRef);

      trainRef.current.style.transform = `translateX(-149vw)`;
      console.log("scroll event");
      trainriddlesRef.current.style.opacity = 1;

      // As the state is updated, this function won't be executed again
    }
  };

  useEffect(() => {
    if (!hasScrolledRef.current) {
      window.addEventListener('scroll', handleScroll);
      console.log("scroll event added");
    }

    return () => {
      if (hasScrolledRef.current) {
        window.removeEventListener('scroll', handleScroll);
        console.log("scroll event removed from useEffect");
      }
    };
  }, []);

  useEffect(() => {
    // Apply the translation whenever it changes
    if (trainRef.current) {
      trainRef.current.style.transform = `translateX(${translateX}vw)`;
    }
  }, [translateX]);


  useEffect(() => {
    // Set styles when the component mounts
    document.body.style.background = 'linear-gradient(rgb(15, 87, 213) 25%, rgb(163,0,255)';
    document.getElementsByClassName('header--h1')[0].style.color = 'rgb(255, 255, 255, 0.8)';

    const footerLinks = document.querySelectorAll('.footer a, .footer p');
    footerLinks.forEach(link => {
      link.style.color = "rgb(163,0,255)";
    });


    return () => {
      // Remove styles when the component unmounts
      document.body.style.backgroundColor = '';
    };
  },);

  return (
    <div className="main--witch">
      <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/8" color="rgb(255,255,255,0.8)" width="78%" />
      {riddles.length > 0 && (
        <>





          <div ref={trainriddlesRef} className='train-riddles'>
            <p>{riddles[currentRiddleIndex].question}</p>
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type='text'
                value={userInput}
                onChange={handleInputChange}
                // handleInputFocus={(e) => handleInputFocus(currentRiddleIndex, e)}
                // handleInputBlur={(e) => handleInputBlur(currentRiddleIndex, e)}
                maxLength={35}
              />
            </form>

          </div>
          <div ref={trainRef} className='train-container' style={{ display: "flex" }}>
            <div className='train-img' style={{ backgroundImage: `url(${train})`, backgroundSize: 'cover', scale: '1.05', marginBottom: '25px' }} ></div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} ></div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} >
              <motion.img whileHover={{ scale: 1.5 }} className='traincar-img' src={sprained} alt="Santa with a sprained foot" />
            </div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} ></div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} >
              <motion.img whileHover={{ scale: 1.5 }} className='traincar-img' src={compass} alt="Santa checking his compass" />
            </div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} ></div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} >
              <motion.img whileHover={{ scale: 1.5 }} className='traincar-img' src={rich} alt="A rich looking snowman, standing with his money and mansions in the background" />
            </div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} ></div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} >
              <motion.img whileHover={{ scale: 1.5 }} className='traincar-img' src={laundry} alt="Santa holding two different types of laundry detergent" />
            </div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} ></div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} >
              <motion.img whileHover={{ scale: 1.5 }} className='traincar-img' src={sheets} alt="Gingerbread man standing next to his bed" />
            </div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} ></div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} >
              <motion.img whileHover={{ scale: 1.5 }} className='traincar-img' src={breakfast} alt="Snowman-child sitting at breakfast table full of dozens of breakfast foods" />
            </div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} ></div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} >
              <motion.img whileHover={{ scale: 1.5 }} className='traincar-img' src={breakfast} alt="Gumballs" />
            </div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} ></div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} >
              <motion.img whileHover={{ scale: 1.5 }} className='traincar-img' src={bugged} alt="angry looking bug surrounded by Christmas decorations, presents, etc." />
            </div>
            <div className='train-img' style={{ backgroundImage: `url(${traincar})`, backgroundSize: 'cover' }} ></div>
            <img className='train-img' src={caboose} alt="Gumballs" />
          </div>


        </>
      )
      }


    </div >

  )
}

export default ChallengeOne


