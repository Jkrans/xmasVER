import { useEffect, useState, useRef } from 'react'
import Cloak from '../images/cloak.png'
import Gate from '../images/gate.png'
import Pumpkin from '../images/pumpkin2.gif'
import Story from './Story'

const story = [
    "With a sigh of relief, you solve the final riddle, and a serene silence falls upon the graveyard. The once ominous tombstones now stand silently. The Guardian of Lost Souls steps forward, her blue cloak fluttering gently in the moonlit night.",
    <br />,
    <br />,
    "\"You have done what many before you could not. You have given peace to the restless souls and proven your wit and determination,\" she says, her voice filled with gratitude.",
    <br />,
    <br />,
    "As she speaks, the fog starts to lift, revealing a pathway illuminated by the soft glow of the moon. It leads to an ornate gate you hadn't noticed before. Engraved on the archway above are the words: \"To those who understand the past, the future is an open door.\"",
    <br />,
    <br />,
    "The Guardian gently places her hand on your shoulder, \"Remember the lessons you've learned here, for every challenge you face in life can be conquered with understanding, wit, and determination.\" With a soft smile, she fades away, her form merging with the swirling mists, leaving you with a sense of accomplishment and newfound wisdom.",
    <br />,
    <br />,
    "Taking a deep breath, filled with newfound courage and hope, you walk through the gate. As you step beyond its threshold, the early morning sun greets you, casting a golden hue on the world. You're free, with the dawn of a new day ahead and the challenges of this haunted place behind you. But the lessons and memories will stay with you, a reminder of the night you faced the impossible and emerged victorious.",
    <br />,
    <br />,
    "As you continue your journey, the world around you feels brighter, and the weight on your shoulders lighter. You've not only escaped, but also conquered your own fears, proving to yourself that with determination, courage, and wit, you can overcome any challenge that comes your way."
];

const Escaped = ({ formattedTime }) => {

    const [img, setImg] = useState(Cloak)
    const hasTriggered = useRef(false);

    // Set styles when the component mounts
    useEffect(() => {
        document.body.style.background = 'linear-gradient(rgb(138, 164, 255), rgb(255 255 255))';
        document.querySelector('.header--h1').style.color = 'rgb(10, 37, 112)'
        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(138, 164, 255)";
        });
      
        // Remove styles when the component unmounts
        return () => {
          document.body.style.backgroundColor = '';
        };
      }, []);

    // fade out image and then fade in new images when user reaches certain scroll point.    
    const handleScroll = () => {
        if(hasTriggered.current) return;
        
        const successImg = document.querySelector('#success-img');

        if(window.scrollY > 400) {
            hasTriggered.current = true;

            const fadeToGate = setTimeout(() => {
                successImg.classList.add('fade-out');
                
                const showGate = setTimeout(() => {
                    setImg(Gate);
                    successImg.classList.replace('fade-out', 'fade-in');
                }, 2000);
            }, 2000);
            window.removeEventListener('scroll', handleScroll);
        }
    }
    // add scroll event to window
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
             window.removeEventListener('scroll', handleScroll);
        };
    });

  return (
    <div className="main--witch">
        <Story title='Escaped' story={story} width='75%'/>
        <div className='centerItems success'>
            <img id='success-img' className='' src={img}/>
            <div className='success-text centerItems'>
                <h1 style={{fontFamily: 'Young Serif'}}>SPOOKTACULAR WORK!</h1>
                <p>With a display of wit and cunning, you made your escape with <span style={{color: '#002473'}}>{formattedTime}</span> to spare. That was seriously impressive!</p>
                <img src={Pumpkin} width='250px'/>
            </div>
        </div>
    </div>
  )
}

export default Escaped
