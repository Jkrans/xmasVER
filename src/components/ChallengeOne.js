import { useEffect } from 'react'
import ImageEquationRow from "./ImageEquationRow"
import Story from "./Story"


const ChallengeOne = ({ onPass }) => {

  useEffect(() => {

    // Set styles when the component mounts
    document.body.style.background = 'linear-gradient(rgb(220, 161, 12), rgb(79 39 25))';
    document.getElementsByClassName('header--h1')[0].style.color = 'rgb(255, 255, 255, 0.8)';

    const footerLinks = document.querySelectorAll('.footer a, .footer p');
    footerLinks.forEach(link => {
      link.style.color = "rgb(79 39 25)";
    })

    return () => {
      // Remove styles when the component unmounts
      document.body.style.backgroundColor = '';
    };
  });


  return (
    <div className="main--witch">
      <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/1" color="rgb(255,255,255,0.8)" width="70%" />
      <ImageEquationRow onPass={onPass} />
    </div>
  )
}

export default ChallengeOne
