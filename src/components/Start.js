import { useEffect } from 'react'
import { motion } from "framer-motion";

const Start = ({ onPass }) => {

  useEffect(() => {
    // Set styles when the component mounts
    document.body.style.background = 'white';

    const footerLinks = document.querySelectorAll('.footer a, .footer p');
    footerLinks.forEach(link => {
      link.style.color = "white";
    })


    return () => {
      // Remove styles when the component unmounts
      document.body.style.backgroundColor = '';
    };
  });

  const enter = () => { onPass(true) }
  return (
    <div className="start-page">
      <motion.h1 whileHover={{ scale: 1.05 }}  >The North Pole Escape</motion.h1>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.6 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} onClick={enter}>Enter</motion.button>
    </div>
  )
}

export default Start
