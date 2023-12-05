import { useEffect } from 'react'
// import elf from '../images/elf-running.png'

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
      <h1>The North Pole Escape</h1>
      <button onClick={enter}>Enter</button>
    </div>
  )
}

export default Start
