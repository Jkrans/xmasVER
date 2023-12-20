import { useEffect, useRef } from 'react'
import { motion } from "framer-motion";
import jack from '../images/jackfrost2.png'

const Start = ({ onPass }) => {
  const pageBody = useRef(null);

  useEffect(() => {
    // Set styles when the component mounts
    document.body.style.background = 'black';

    const footerLinks = document.querySelectorAll('.footer a, .footer p');
    footerLinks.forEach(link => {
      link.style.color = "rgb(75,75,75)";
    })


    return () => {
      // Remove styles when the component unmounts
      document.body.style.backgroundColor = '';
    };
  });

  const enter = () => {
    const page = pageBody.current;
    page.style.backgroundImage = `url(${jack})`;
    setTimeout(() => {
      onPass(true)
    }, 2000)
  }

  return (
    <div ref={pageBody} className="start-page">
      <motion.h1 whileHover={{ scale: 1.05 }}  >The North Pole Escape</motion.h1>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.6 }} onClick={enter}>Enter</motion.button>
    </div>
  )
}

export default Start
