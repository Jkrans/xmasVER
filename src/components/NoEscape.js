import { useEffect } from "react";
import { motion } from "framer-motion"
import Story from "./Story"
import sad from "../images/sadxmas.png"

const NoEscape = ({ onPass }) => {

  useEffect(() => {
    // Set styles when the component mounts
    document.body.style.background = 'linear-gradient(rgb(94, 135, 146) 45%, white) ';

    const footerLinks = document.querySelectorAll('.footer a, .footer p');
    footerLinks.forEach(link => {
      link.style.color = "rgb(26, 31, 50)";
    });


    return () => {
      // Remove styles when the component unmounts
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleTryAgain = () => {
    onPass(true);
  }

  return (
    <div className="main--witch">
      <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/9" color="rgb(255,255,255,0.8)" width="78%" />
      <div className="no-escape-container">
        <img src={sad}></img>
        <motion.button onClick={handleTryAgain}
          whileTap={{ scale: 0.97, boxShadow: 'inset 5px 2px 5px rgb(0, 0, 0, .5)' }}>Try Again</motion.button>
      </div>
    </div>
  )
}

export default NoEscape
