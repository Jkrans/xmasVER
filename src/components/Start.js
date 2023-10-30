import { useEffect } from 'react'
import turkey from '../images/turkey.png'

const Start = ({ onPass }) => {

  useEffect(() => {
    // Set styles when the component mounts
    document.body.style.background = 'linear-gradient(rgb(220, 161, 12), rgb(79 39 25))';

    const footerLinks = document.querySelectorAll('.footer a, .footer p');
    footerLinks.forEach(link => {
      link.style.color = "rgb(79 39 25)";
    })


    return () => {
      // Remove styles when the component unmounts
      document.body.style.backgroundColor = '';
    };
  });

  const enter = () => { onPass(true) }
  return (
    <div className="start-page">
      {/* <img src={slime}/> */}
      <div>
        <h1>The Great Turkey Escape</h1>
        <button onClick={enter}>Enter</button>
      </div>
      <img src={turkey} alt="" />
    </div>
  )
}

export default Start
